import Application from "../models/applicationSchema.js";
import Job from "../models/jobSchema.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.user._id;
    const jobId = req.params.jobId;
    // const { resume } = req.body;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // prevent duplicate applications
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

    const applications = await Application.find({ user: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate({
        path: "job",
        select: "title salary workMode jobType company",
        populate: {
          path: "company",
          select: "name logo",
        },
      }).lean();

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
