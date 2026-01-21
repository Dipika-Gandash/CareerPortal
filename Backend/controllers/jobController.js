import Job from "../models/jobSchema.js";
import Company from "../models/companySchema.js";

export const createJob = async (req, res) => {
  try {
    const recruiterId = req.user._id;
    const companyId = req.params.companyId;
    const {
      title,
      description,
      requirements,
      experienceLevel,
      salary,
      location,
      workMode,
      jobType,
      positions,
    } = req.body;

    const company = await Company.findOne({
      _id: companyId,
      createdBy: recruiterId,
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    const existingJob = await Job.findOne({
      company: companyId,
      title: title.trim(),
    });

    if (existingJob) {
      return res.status(409).json({
        success: false,
        message: "Job with this title already exists for this company",
      });
    }

    if (
      !title ||
      !description ||
      !experienceLevel ||
      !jobType ||
      !Array.isArray(requirements) ||
      requirements.length === 0 ||
      !salary ||
      salary.min === null ||
      salary.max === null ||
      salary.min > salary.max
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    const normalizedRequirements = [
      ...new Set(
        requirements
          .map((req) => req.trim().toLowerCase())
          .filter((req) => req.length > 0),
      ),
    ];
    if (normalizedRequirements.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one valid requirement must be provided",
      });
    }

    if (normalizedRequirements.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one valid requirement must be provided",
      });
    }

    const newJob = await Job.create({
      title,
      description,
      requirements: normalizedRequirements,
      experienceLevel,
      salary,
      location,
      workMode,
      jobType,
      positions,
      company: companyId,
      postedBy: recruiterId,
    });

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      job: newJob,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const {
      keyword,
      location,
      jobType,
      workMode,
      experienceLevel,
      page = 1,
      limit = 10,
    } = req.query;

    const skip = (page - 1) * limit;

    const filter = { status: "Open" };

    if (keyword) {
      filter.title = { $regex: keyword, $options: "i" };
    }

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    if (jobType) {
      filter.jobType = jobType;
    }

    if (workMode) {
      filter.workMode = workMode;
    }

    if (experienceLevel) {
      filter.experienceLevel = experienceLevel;
    }

    const jobs = await Job.find(filter)
      .populate("company", "name location")
      .populate("postedBy", "firstName lastName")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalJobs = await Job.countDocuments(filter);

    return res.status(200).json({
      success: true,
      totalJobs,
      currentPage: Number(page),
      totalPages: Math.ceil(totalJobs / limit),
      jobs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.jobId;

    const job = await Job.findById(jobId)
      .populate("company", "name location")
      .populate("postedBy", "firstName lastName");

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching the job",
    });
  }
};

export const getRecruiterJobs = async (req, res) => {
  try {
    const recruiterId = req.user._id;

    const jobs = await Job.find({ postedBy: recruiterId })
      .populate("company", "name location")
      .populate("postedBy", "firstName lastName")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      totalJobs: jobs.length,
      jobs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching recruiter's jobs",
    });
  }
};

export const updateJobStatus = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { status }= req.body;
    const recruiterId = req.user._id;

    const ALLOWED_STATUS = ["Open", "Closed"];

    if (!ALLOWED_STATUS.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be either open or closed",
      });
    }

    const job = await Job.findOne({
      _id: jobId,
      postedBy: recruiterId,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found or unauthorized",
      });
    }

   job.status = status;
    await job.save();

    return res.status(200).json({
      success: true,
      message: "Job status updated successfully",
      job,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating job status",
    });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const {jobId} = req.params;
    const recruiterId = req.user._id;
    
    const result = await Job.deleteOne({
      _id: jobId,
      postedBy: recruiterId
    })

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Job not found or unauthorized",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully"
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while deleting the job"
    })
  }
}