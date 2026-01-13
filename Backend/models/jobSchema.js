import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
      minlength: [3, "Job title must be at least 3 characters"],
      maxlength: [100, "Job title must be at most 100 characters"],
      match: [
        /^[A-Za-z0-9\s\-()]+$/,
        "Job title can contain letters, numbers, spaces, hyphens, and parentheses",
      ],
    },

    description: {
      type: String,
      required: [true, "Job description is required"],
      trim: true,
      minlength: [50, "Job description must be at least 50 characters"],
      maxlength: [5000, "Job description must be at most 5000 characters"],
    },

    requirements: {
      type: [String],
      required: [true, "Job requirements are required"],
      validate: [
        {
          validator: function (value) {
            return Array.isArray(value) && value.length > 0;
          },
          message: "At least one requirement is required",
        },
        {
          validator: function (value) {
            const skills = value.map((s) => s.trim().toLowerCase());
            return new Set(skills).size === value.length;
          },
          message: "Duplicate requirements are not allowed",
        },
      ],
      default: [],
    },

    salary: {
      type: Number,
      min: [0, "Salary cannot be negative"],
    },

    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
      minlength: [2, "Location must be at least 2 characters"],
      maxlength: [100, "Location cannot exceed 100 characters"],
    },

    jobType: {
      type: String,
      enum: {
        values: ["Full-Time", "Part-Time", "Internship", "Remote", "Contract"],
        message: "Not a valid job-type",
      },
      default: "Full-Time",
    },

    positions: {
      type: Number,
      min: [1, "Positions must be at least 1"],
      max: [1000, "Positions too high"],
      validate: {
        validator: Number.isInteger,
        message: "Positions must be an integer",
      },
      default: 1,
    },

    company : {
     type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: [true, "Job must be linked to a company"]
    },

    postedBy: {
      type : mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },

  { timestamps: true }
);

jobSchema.path("requirements").validate(function (value) {
  return value.every(
    (skill) =>
      typeof skill === "string" &&
      skill.trim().length >= 2 &&
      skill.trim().length <= 50
  );
}, "Each requirement must be between 2 and 50 characters");

const Job = mongoose.model("Job", jobSchema);

export default Job;
