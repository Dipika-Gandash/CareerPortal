import Company from "../models/companySchema.js";

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
      totalPages: Math.ceil(totalCompanies/limit),
      companies,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
