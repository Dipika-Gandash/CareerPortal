import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
      trim: true,
      minlength: [2, "First name must be at least 2 character"],
      maxlength: [30, "First name must be at most 30 character"],
      match: [
        /^[A-Za-z\s-]+$/,
        "First name can only contain letters, spaces, or hyphens",
      ],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
      trim: true,
      minlength: [2, "Last name must be at least 2 character"],
      maxlength: [30, "Last name must be at most 30 character"],
      match: [
        /^[A-Za-z\s-]+$/,
        "Last name can only contain letters, spaces, or hyphens",
      ],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please fill a valid email address",
      ],
    },

    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      trim: true,
      match: [
        /^[6-9]\d{9}$/,
        "Please enter a valid 10-digit Indian phone number",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
      minlength: [8, "Password must be atleast 8 characters"],
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character (!@#$%^&*)",
      ],
    },

    role: {
      type: String,
      required: [true, "Role is required"],
      enum: ["jobseeker", "recruiter", "admin"],
      default: "jobseeker",
    },

    profile: {
      gender: {
        type: String,
        enum: {
          values: ["male", "female", "non-binary", "prefer-not-to-say"],
          message:
            "Gender must be one of: male, female, non-binary, prefer-not-to-say",
        },
        lowercase: true,
      },

      bio: {
        type: String,
        maxlength: 500,
        trim: true,
      },

      skills: {
        type: [String],
        trim: true,
        lowercase: true,
        default: [],
        validate: [
          {
            validator: function (value) {
              if (!value || value.length === 0) return true;
              const lowerSkills = value.map((v) => v.trim().toLowerCase());
              return new Set(lowerSkills).size === value.length;
            },
            message: "Duplicate skills are not allowed",
          },

          {
            validator: function (value) {
              if (!value || value.length === 0) return true;
              return value.every((v) => v.length >= 1 && v.length <= 50);
            },
            message: "Each skill must be between 1 and 50 characters",
          },
        ],
      },

      experience: [
        {
          jobTitle: {
            type: String,
            required: [true, "Job title is required feild"],
            trim: true,
            minlength: [2, "Job title must be at least 2 characters"],
            maxlength: [100, "Job title must be at most 100 characters"],
          },
          company: {
            type: String,
            required: [true, "Company name is required"],
            trim: true,
            minlength: [2, "Company name must be at least 2 characters"],
            maxlength: [100, "Company name must be at most 100 characters"],
          },
          employmentType: {
            type: String,
            enum: [
              "internship",
              "full-time",
              "part-time",
              "contract",
              "freelance",
            ],
            required: true,
          },
          startDate: {
            type: Date,
            required: [true, "Start date is required"],
          },
          endDate: {
            type: Date,
            required: function () {
              return !this.isCurrent;
            },
            validate: {
              validator: function (value) {
                if (!value) return true;
                return value > this.startDate;
              },
              message: "End date must be after start date",
            },
          },
          isCurrent: {
            type: Boolean,
            default: false,
          },
          description: {
            type: String,
            maxlength: [500, "Description can be at most 500 characters"],
          },
        },
      ],

      education: [
        {
          degree: {
            type: String,
            required: [true, "Degree is required"],
            trim: true,
            minlength: [2, "Degree must be at least 2 characters"],
            maxlength: [100, "Degree must be at most 100 characters"],
          },
          institute: {
            type: String,
            required: [true, "Institute name is required"],
            trim: true,
            minlength: [2, "Institute name must be at least 2 characters"],
            maxlength: [150, "Institute name must be at most 150 characters"],
          },
          startYear: {
            type: Date,
            required: [true, "Start Year is required"],
            validate: {
              validator: function (value) {
                return value <= new Date();
              },
              message: "Start date cannot be in future",
            },
          },

          endYear: {
            type: Date,
            required: [true, "End Year is required"],
            validate: {
              validator: function (value) {
                return value > this.startYear;
              },
              message: "End year must be greater than start year",
            },
          },
        },
      ],

      resume: {
        type: String,
        trim: true,
        match: [
          /^(https?:\/\/|\/uploads\/).+$/,
          "Please provide a valid resume file path or URL",
        ],
      },

      resumeOriginalName: {
        type: String,
        trim: true,
      },

      profilePhoto: {
        type: String,
        trim: true,
        default:
          "https://www.macfcu.org/wp-content/uploads/2024/02/Windows_10_Default_Profile_Picture.svg.png",
        match: [
          /^(https?:\/\/)([\w\-]+(\.[\w\-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/,
          "Please provide a valid image URL",
        ],
      },

      socialLinks: {
        linkedin: {
          type: String,
          trim: true,
          match: [
            /^https?:\/\/(www\.)?linkedin\.com\/.+$/,
            "Please enter a valid LinkedIn profile URL",
          ],
        },
        github: {
          type: String,
          trim: true,
          match: [
            /^https?:\/\/(www\.)?github\.com\/.+$/,
            "Please enter a valid GitHub profile URL",
          ],
        },

        leetcode: {
          type: String,
          trim: true,
          match: [
            /^https?:\/\/(www\.)?leetcode\.com\/.+$/,
            "Please enter a valid Leetcode profile URL",
          ],
        },
      },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
})

const User = mongoose.model("User", userSchema);

export default User;
