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
      required: true,
      validate: {
        validator: function (value) {
          return (
            Array.isArray(value) &&
            value.length > 0 &&
            value.every(
              (skill) =>
                typeof skill === "string" &&
                skill.trim().length >= 2 &&
                skill.trim().length <= 50,
            )
          );
        },
        message:
          "Each requirement must be a string between 2 and 50 characters",
      },
    },

    experienceLevel: {
      type: String,
      enum: {
        values: ["Fresher", "Junior", "Mid", "Senior"],
        message: "Not a valid experience level",
      },
      required: [true, "Experience level is required"],
    },

    salary: {
      min: {
        type: Number,
        required: [true, "Minimum salary is required"],
        min: [0, "Minimum salary cannot be negative"],
      },
      max: {
        type: Number,
        required: [true, "Maximum salary is required"],
        min: [0, "Maximum salary cannot be negative"],
        max: [10000000, "Maximum salary is too high"],
      },
      currency: {
        type: String,
        enum: {
          values: ["USD", "EUR", "GBP", "INR", "JPY", "CNY"],
          message: "Not a valid currency",
        },
        default: "INR",
      },
    },

    location: {
      type: String,
      trim: true,
      minlength: [2, "Location must be at least 2 characters"],
      maxlength: [100, "Location cannot exceed 100 characters"],
    },

    workMode: {
      type: String,
      enum: ["Onsite", "Remote", "Hybrid"],
      default: "Onsite",
    },

    jobType: {
      type: String,
      enum: {
        values: ["Full-Time", "Part-Time", "Internship", "Contract"],
        message: "Not a valid job-type",
      },
      required: [true, "Job type is required"],
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

    status: {
      type: String,
      enum: {
        values: ["Open", "Closed"],
        message: "Not a valid status",
      },
      default: "Open",
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: [true, "Job must be linked to a company"],
    },

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },

  { timestamps: true },
);

jobSchema.pre("validate", function () {
  if (this.salary?.min > this.salary?.max) {
    this.invalidate(
      "salary.max",
      "Max salary must be greater than min salary"
    );
  }
});

jobSchema.index({ title: "text", description: "text" });

const Job = mongoose.model("Job", jobSchema);

export default Job;
