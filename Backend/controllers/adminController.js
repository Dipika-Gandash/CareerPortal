import Company from "../models/companySchema.js";
import { deleteJobWithApplications } from "../services/jobService.js";
import Job from "../models/jobSchema.js";

export const getAllCompanies = async (req, res) => {
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

export const deleteCompany = async (req, res) => {
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
