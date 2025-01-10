import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    candidate_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    resume_url: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      required: true,
    },
    applied_date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Application =
  mongoose.models.Application ||
  mongoose.model("Application", applicationSchema);

export default Application;
