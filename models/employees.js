import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      default: "emp",
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

const Employee =
  mongoose.models.Employee || mongoose.model("Employee", employeeSchema);

export default Employee;
