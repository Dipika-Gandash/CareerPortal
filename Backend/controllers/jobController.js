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
      limit = 10
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
