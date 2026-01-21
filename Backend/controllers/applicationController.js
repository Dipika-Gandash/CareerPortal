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
      job: jobId
    });

  return res.status(201).json({
      success: true,
      message: "Applied to job successfully",
      data: newApplication
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
