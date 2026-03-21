import Company from "../models/companySchema.js";
import Job from "../models/jobSchema.js";
import User from "../models/userSchema.js";
import Application from "../models/applicationSchema.js";
import { sendRecruiterStatusEmail } from "../utils/mailer.js"

export const getAdminDashboard = async (req, res) => {
  try {
    const [
      totalUsers,
      totalRecruiters,
      totalJobs,
      totalCompanies,
      totalApplications,
      recentJobs,
      recentRecruiters,
    ] = await Promise.all([
      User.countDocuments({ role: "jobseeker" }),
      User.countDocuments({ role: "recruiter" }),
      Job.countDocuments(),
      Company.countDocuments(),
      Application.countDocuments(),
      Job.find().sort({ createdAt: -1 }).limit(4)
        .populate("company", "name companyLogo"),
      User.find({ role: "recruiter" }).sort({ createdAt: -1 }).limit(4)
        .select("firstName lastName email profile.profilePhoto createdAt"),
    ]);

    return res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalRecruiters,
        totalJobs,
        totalCompanies,
        totalApplications,
      },
      recentJobs,
      recentRecruiters,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getAllCompaniesAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const companies = await Company.find()
      .populate("createdBy", "firstName lastName")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalCompanies = await Company.countDocuments();

    return res.status(200).json({
      success: true,
      message: "Companies fetched successfully",
      totalCompanies,
      currentPage: page,
      totalPages: Math.ceil(totalCompanies / limit),
      companies,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteCompanyAdmin = async (req, res) => {
  try {
    const { companyId } = req.params;
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    const jobs = await Job.find({
      company: companyId,
    }).select("_id");

    const jobIds = jobs.map((job) => job._id);

    await Application.deleteMany({
      job: { $in: jobIds },
    });

    await Job.deleteMany({
      company: companyId,
    });

    await company.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Company and related jobs & applications deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllJobsAdmin = async (req, res) => {
  try {
    const {
      keyword,
      companyName,
      location,
      status,
      sortBy = "newest",
      page = 1,
      limit = 10,
    } = req.query;

    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * limitNumber;

    const filter = {};

    if (keyword) filter.title = { $regex: keyword, $options: "i" };
    if (location) filter.location = { $regex: location, $options: "i" };
    if (status) filter.status = status;

    if (companyName) {
      const companies = await Company.find({
        name: { $regex: companyName, $options: "i" },
      }).select("_id");

      if (companies.length === 0) {
        return res.status(200).json({
          success: true,
          totalJobs: 0,
          currentPage: pageNumber,
          totalPages: 0,
          jobs: [],
        });
      }

      filter.company = { $in: companies.map((c) => c._id) };
    }

    const sortOptions = {
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
    };
    const sort = sortOptions[sortBy] || { createdAt: -1 };

    const jobs = await Job.find(filter)
      .populate("company", "name location companyLogo")
      .populate("postedBy", "firstName lastName")
      .sort(sort)
      .skip(skip)
      .limit(limitNumber);

    const jobsWithStats = await Promise.all(
      jobs.map(async (job) => {
        const applicationsCount = await Application.countDocuments({
          job: job._id,
        });
        return { ...job.toObject(), applicationsCount };
      }),
    );

    const totalJobs = await Job.countDocuments(filter);
    return res.status(200).json({
      success: true,
      totalJobs,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalJobs / limitNumber),
      jobs: jobsWithStats,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteJobAdmin = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId).select("_id");
    if (!job) {
      return res.status(404).json({
        status: false,
        message: "Job not found",
      });
    }

    await Application.deleteMany({
      job: jobId,
    });

    await job.deleteOne();
    return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getRecruiters = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const recruiters = await User.find({ role: "recruiter" })
      .select("firstName lastName email profile.bio profile.profilePhoto isBlocked createdAt")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalRecruiters = await User.countDocuments({ role: "recruiter" });

    const recruitersWithStats = await Promise.all(
      recruiters.map(async (recruiter) => {
        const totalCompanies = await Company.countDocuments({
          userId: recruiter._id,
        });
        const totalJobs = await Job.countDocuments({ postedBy: recruiter._id });
        return {
          ...recruiter.toObject(),
          totalCompanies,
          totalJobs,
        };
      }),
    );

    return res.status(200).json({
      success: true,
      totalRecruiters,
      currentPage: page,
      totalPages: Math.ceil(totalRecruiters / limit),
      recruiters: recruitersWithStats,
    });
  } catch (error) {
    console.error("Get recruiters error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateRecruiterStatus = async (req, res) => {
  try {
    const { recruiterId } = req.params;

    const recruiter = await User.findById(recruiterId);
    if (!recruiter || recruiter.role !== "recruiter") {
      return res.status(404).json({
        success: false,
        message: "Recruiter not found",
      });
    }

    recruiter.isBlocked = !recruiter.isBlocked;
    await recruiter.save();
    await sendRecruiterStatusEmail(
      recruiter.email,
      `${recruiter.firstName} ${recruiter.lastName}`,
      recruiter.isBlocked
    )

    return res.status(200).json({
      success: true,
      message: recruiter.isBlocked
        ? "Recruiter has been blocked"
        : "Recruiter has been unblocked",
      recruiter: {
        _id: recruiter._id,
        firstName: recruiter.firstName,
        lastName: recruiter.lastName,
        email: recruiter.email,
        isBlocked: recruiter.isBlocked,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
