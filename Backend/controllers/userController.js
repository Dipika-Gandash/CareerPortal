import User from "../models/userSchema.js";

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, password, role } =
      req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !password ||
      !role
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { phoneNumber }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email or phone number already exists",
      });
    }

    await User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      role,
    });
    return res.status(201).json({
      success: true,
      message: "Account created successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = user.getJWT();
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

export const getUserProfile = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        profile: user.profile,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const NOT_ALLOWED_FIELDS = [
      "email",
      "password",
      "role",
      "experience",
      "education",
    ];
    const updates = req.body;
    const updateFields = Object.keys(updates);

    const isInvalidUpdate = updateFields.some((field) =>
      NOT_ALLOWED_FIELDS.includes(field)
    );

    if (isInvalidUpdate) {
      return res.status(400).json({
        success: false,
        message: "You cannot update email, password or role from this route",
      });
    }

    const user = req.user;

    const ALLOWED_TOP_LEVEL_FIELDS = ["firstName", "lastName", "phoneNumber"];

    ALLOWED_TOP_LEVEL_FIELDS.forEach((field) => {
      if (updates[field] !== undefined) {
        user[field] = updates[field];
      }
    });

    if (updates.profile) {
      if (updates.profile.skills !== undefined) {
        let incomingSkills = updates.profile.skills;

        if (!Array.isArray(incomingSkills)) {
          incomingSkills = [incomingSkills];
        }
        if (!Array.isArray(updates.profile.skills)) {
          updates.profile.skills = [updates.profile.skills];
        }

        incomingSkills = incomingSkills
          .map((skill) => skill.trim())
          .filter(Boolean);

        const existingSkills = user.profile.skills || [];
        user.profile.skills = [
          ...new Set([...existingSkills, ...incomingSkills]),
        ];
      }

      const ALLOWED_PROFILE_FIELDS = [
        "bio",
        "gender",
        "resume",
        "resumeOriginalName",
        "profilePhoto",
      ];

      ALLOWED_PROFILE_FIELDS.forEach((profileField) => {
        if (updates.profile[profileField] !== undefined) {
          user.profile[profileField] = updates.profile[profileField];
        }
      });

      if (updates.profile.socialLinks) {
        const ALLOWED_SOCIAL_LINKS = [
          "linkedin",
          "github",
          "leetcode",
          "portfolio",
        ];
        ALLOWED_SOCIAL_LINKS.forEach((link) => {
          if (updates.profile.socialLinks[link] !== undefined) {
            user.profile.socialLinks[link] = updates.profile.socialLinks[link];
          }
        });
      }
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        profile: user.profile,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addNewExperience = async (req, res) => {
  try {
    const {
      jobTitle,
      company,
      employmentType,
      startDate,
      endDate,
      description,
    } = req.body;
    if (!jobTitle || !company || !employmentType || !startDate) {
      return res.status(400).json({
        success: false,
        message:
          "Title, Company, Employment Type and Start Date are required fields",
      });
    }
    const user = req.user;
    const newExperience = {
      jobTitle,
      company,
      employmentType,
      startDate,
      description,
    };

    if (endDate) {
      newExperience.endDate = endDate;
      newExperience.isCurrent = false;
    } else {
      newExperience.isCurrent = true;
    }

    user.profile.experience.push(newExperience);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Experience added successfully",
      experience: user.profile.experience,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addNewEducation = async (req, res) => {
  try {
    const { degree, institute, startYear, endYear } = req.body;
    if (!degree || !institute || !startYear || !endYear) {
      return res.status(400).json({
        success: false,
        message:
          "Degree, Institute, Start Year and End Year are required fields",
      });
    }

    const user = req.user;
    const newEducation = {
      degree,
      institute,
      startYear,
      endYear,
    };

    user.profile.education.push(newEducation);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Education added successfully",
      education: user.profile.education,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUserExperience = async (req, res) => {
  try {
    const updates = req.body;
    const expId = req.params.expId;
    const user = req.user;

    const experience = user.profile.experience.id(expId);
    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    const fields = [
      "jobTitle",
      "company",
      "employmentType",
      "startDate",
      "description",
    ];
    fields.forEach((field) => {
      if (updates[field] !== undefined) {
        experience[field] = updates[field];
      }
    });

    if (updates.hasOwnProperty("endDate")) {
      experience.endDate = updates.endDate || null;
      experience.isCurrent = !updates.endDate;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Experience updated successfully",
      experience: experience,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUserEducation = async (req, res) => {
  try {
    const updates = req.body;
    const eduId = req.params.eduId;
    const user = req.user;

    const education = user.profile.education.id(eduId);

    if (!education) {
      return res.status(404).json({
        success: false,
        message: "Education not found",
      });
    }

    const fields = ["degree", "institute", "startYear", "endYear"];
    fields.forEach((field) => {
      if (updates[field] !== undefined) {
        education[field] = updates[field];
      }
    });

    await user.save();
    return res.status(200).json({
      success: true,
      message: "Education updated successfully",
      education: education,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteUserExperience = async (req, res) => {
  try {
    const expId = req.params.expId;
    const user = req.user;

    const experience = user.profile.experience.id(expId);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    user.profile.experience.pull(expId);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Experience deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteUserEducation = async (req, res) => {
  try {
    const eduId = req.params.eduId;
    const user = req.user;

    const education = user.profile.education.id(eduId);
    if (!education) {
      return res.status(404).json({
        success: false,
        message: "Education not found",
      });
    }

    user.profile.education.pull(eduId);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Education deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }

};
