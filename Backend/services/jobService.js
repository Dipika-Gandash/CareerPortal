import Job from "../models/jobSchema.js";
import Application from "../models/applicationSchema.js";

export const deleteJobWithApplications = async (jobId, recruiterId) => {
  const job = await Job.findOne({
    _id: jobId,
    postedBy: recruiterId,
  });

  if (!job) {
    throw new Error("Job not found or unauthorized");
  }

  await Application.deleteMany({ job: jobId });

  await job.deleteOne();
};
