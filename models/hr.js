import mongoose from "mongoose";

const hrSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "hr",
    },
    department: {
      type: String,
      default: "HR",
    },
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    hireAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const HR = mongoose.models.HR || mongoose.model("HR", hrSchema);

export default HR;
