export const checkRecruiterStatus = async (req, res, next) => {
  if (req.user.role === "recruiter" && req.user.isBlocked) {
    return res.status(403).json({
      success: false,
      message: "Your account is blocked. You cannot perform this action.",
    });
  }
  next();
};
