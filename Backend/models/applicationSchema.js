import mongoose from "mongoose";

const applicationSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },

    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: [true, "Job is required"],
    },

    status: {
      type: String,
      enum: {
        values: ["applied", "shortlisted", "rejected", "hired"],
        message: "Invalid status",
      },
      default: "applied",
    },

    resume: {
      type: String,
      trim: true,
    },

    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

applicationSchema.index({ user: 1, job: 1 }, { unique: true });
applicationSchema.index({ user: 1, createdAt: -1 });
applicationSchema.index({ job: 1 });

const Application = mongoose.model("Application", applicationSchema);

export default Application;
