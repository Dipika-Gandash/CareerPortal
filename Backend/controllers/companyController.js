import Company from "../models/companySchema.js";
import mongoose from "mongoose";
import { escapeRegex } from "../utils/escapeRegex.js";
import {
  normalizeCompanyName,
  normalizeLocations,
} from "../utils/company.utils.js";
import Job from "../models/jobSchema.js";
import { deleteJobWithApplications } from "../services/jobService.js";

export const createCompany = async (req, res) => {
  try {
    const { name, description, website, location, logo } = req.body;

    if (!name || !description || !website || !location) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const normalizedName = normalizeCompanyName(name);
    if (!normalizedName) {
      return res.status(400).json({
        success: false,
        message: "Company name is required",
      });
    }

    const safeName = escapeRegex(normalizedName);

    const existingCompany = await Company.findOne({
      name: { $regex: `^${safeName}$`, $options: "i" },
    });
    if (existingCompany) {
      return res.status(409).json({
        success: false,
        message: "Company with this name already exists",
      });
    }

    let normalizedLocations = normalizeLocations(location);

    const company = await Company.create({
      name: normalizedName,
      description,
      website,
      location: normalizedLocations,
      logo,
      createdBy: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Company created successfully",
      company: {
        id: company._id,
        name: company.name,
        description: company.description,
        website: company.website,
        location: company.location,
        logo: company.logo,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyCompanies = async (req, res) => {
  try {
    const userId = req.user._id;
    const companies = await Company.find({ createdBy: userId }).select(
      "-__v -createdBy",
    );
    if (companies.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No companies created yet",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Companies created by you",
      companies,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const userId = req.user._id;
    const companyId = req.params.companyId;

    const company = await Company.findOne({
      _id: companyId,
      createdBy: userId,
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "No company found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Company fetched successfully",
      company,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const userId = req.user._id;
    const companyId = req.params.companyId;

    const company = await Company.findOne({
      _id: companyId,
      createdBy: userId,
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "No company found",
      });
    }

    const { name, description, website, location, logo } = req.body;

    if (name) {
      const normalizedName = normalizeCompanyName(name);
      if (!normalizedName) {
        return res.status(400).json({
          success: false,
          message: "Invalid company name",
        });
      }

      const safeName = escapeRegex(normalizedName);

      const existingCompany = await Company.findOne({
        name: { $regex: `^${safeName}$`, $options: "i" },
      });
      if (existingCompany) {
        return res.status(409).json({
          success: false,
          message: "Company with this name already exists",
        });
      }
    }

    if (description) company.description = description;
    if (website) company.website = website;
    if (location) {
      try {
        const incomingLocations = location;
        const mergedLocations = [...company.location, ...incomingLocations];
        company.location = normalizeLocations(mergedLocations);
      } catch (err) {
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }
    }

    if (logo) company.logo = logo;
    await company.save();
    return res.status(200).json({
      success: true,
      message: "Company updated successfully",
      company,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const recruiterId = req.user._id;
    const companyId = req.params.companyId;

    const company = await Company.findOne({
      _id: companyId,
      createdBy: recruiterId,
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "No company found",
      });
    }

    const jobs = await Job.find({
      company: companyId,
      postedBy: recruiterId,
    }).select("_id");

    for (const job of jobs) {
      await deleteJobWithApplications(job._id, recruiterId);
    }

    await company.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Company deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
