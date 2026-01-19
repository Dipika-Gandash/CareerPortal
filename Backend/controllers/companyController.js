import Company from "../models/companySchema.js";
import mongoose from "mongoose";

export const createCompany = async (req, res) => {
  try {
    const { name, description, website, location, logo } = req.body;

    if (!name || !description || !website || !location) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const escapeRegex = (text) => {
      return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    };

    const normalizedName = name.trim();
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

    if (!Array.isArray(location)) {
      return res.status(400).json({
        success: false,
        message: "Location must be an array of strings",
      });
    }

    const normalizedLocations = [
      ...new Set(
        location
          .map((loc) => loc.trim().toLowerCase())
          .filter((loc) => loc.length >= 2 && loc.length <= 100),
      ),
    ];

    if (normalizedLocations.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one valid location is required",
      });
    }

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
        logo: company.logo
      }
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
       const companies = await  Company.find({createdBy: userId}).select("-__v -createdBy");
       if(companies.length === 0) {
        return res.status(200).json({
          success: false,
          message: "No companies created yet"
        })
       }

       return res.status(200).json({
        success: true,
        message: "Companies created by you",
        companies
       })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      })
    }
}

export const getCompanyById = async (req, res) => {
  try {
    const userId = req.user._id;
    const companyId = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(companyId)){
      return res.status(400).json({
        success: false,
        message: "Invalid company Id"
      })
    }

    const company = await Company.findOne({
      _id: companyId,
      createdBy: userId
    })

    if(!company) {
      return res.status(404).json({
        success: false,
        message: "No company found"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Company fetched successfully",
      company
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}