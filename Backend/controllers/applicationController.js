import Application from "../models/applicationSchema.js";
import Job from "../models/jobSchema.js";
import Company from "../models/companySchema.js";
import { sendHiredEmail } from "../utils/mailer.js";

export const applyJob = async (req, res) => {
  try {
    const user = req.user;
    const userId = user._id;
    const jobId = req.params.jobId;
    if (!req.user.profile.resume) {
      return res.status(400).json({
        success: false,
        message: "Please upload your resume in your profile first",
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const existingApplication = await Application.findOne({
      user: userId,
      job: jobId,
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied to this job",
      });
    }

    const newApplication = await Application.create({
      user: userId,
      job: jobId,
      resume: req.user.profile.resume,
    });

    return res.status(201).json({
      success: true,
      message: "Applied to job successfully",
      data: newApplication,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserApplication = async (req, res) => {
  try {
    const userId = req.user._id;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalApplications = await Application.countDocuments({
      user: userId,
    });

    const totalPages = Math.ceil(totalApplications / limit);

    if (page > totalPages && totalApplications > 0) {
      return res.status(200).json({
        success: true,
        total: totalApplications,
        page,
        totalPages,
        data: [],
      });
    }

    const applications = await Application.find({ user: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate({
        path: "job",
        select: "title salary workMode jobType company",
        populate: {
          path: "company",
          select: "name companyLogo",
        },
      })
      .lean();

    return res.status(200).json({
      success: true,
      total: totalApplications,
      page,
      totalPages: Math.ceil(totalApplications / limit),
      data: applications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllApplicants = async (req, res) => {
  try {
    const recruiterId = req.user._id;
    const jobId = req.params.jobId;

    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Number(req.query.limit) || 10, 20);
    const skip = (page - 1) * limit;

    const job = await Job.findOne({
      _id: jobId,
      postedBy: recruiterId,
    }).lean();

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found or not authorized",
      });
    }

    const totalApplicants = await Application.countDocuments({
      job: jobId,
    });

    const totalPages = Math.ceil(totalApplicants / limit);

    if (page > totalPages && totalApplicants > 0) {
      return res.status(200).json({
        success: true,
        job,
        totalApplicants,
        page,
        totalPages,
        applicants: [],
      });
    }

    const applicants = await Application.find({
      job: jobId,
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate({
        path: "user",
        select: "firstName lastName phoneNumber profile.skills profile.socialLinks.linkedin profile.socialLinks.github profile.resume",
      })
      .lean();

    return res.status(200).json({
      success: true,
      totalApplicants,
      page,
      totalPages,
      applicants,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const recruiterId = req.user._id;
    const applicationId = req.params.applicationId;
    const { status } = req.body;

    const ALLOWED_STATUS = ["Applied", "Shortlisted", "Rejected", "Hired"];
    if (!ALLOWED_STATUS.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const application = await Application.findById(applicationId)
      .populate("user", "firstName lastName email")
      .populate({
        path: "job",
        select: "title postedBy company",
        populate: {
          path: "company",
          select: "name",
        },
      });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    if (application.job.postedBy.toString() !== recruiterId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this application",
      });
    }

    application.status = status;
    await application.save();

    if (status === "Hired") {
      await sendHiredEmail(
        application.user.email,
       `${application.user.firstName} ${application.user.lastName}`,
        application.job.title,
        application.job.company.name,
      );
    }
    return res.status(200).json({
      success: true,
      message: "Application status updated",
      application,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
