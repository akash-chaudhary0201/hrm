import dbConnect from "@/app/dbConfig/db";
import Employee from "@/models/employees";
import { NextResponse } from "next/server";

export const PATCH = async (req, { params }) => {
  try {
    await dbConnect();
    const { id } = params;
    const employeeDet = await Employee.findById(id).select("-password");
    if (!employeeDet) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      });
    }
    const { name, department, designation, email, phoneNumber } =
      await req.json();
    const updates = {};
    if (name) updates.name = name;
    if (department) updates.department = department;
    if (designation) updates.designation = designation;
    if (email) updates.email = email;
    if (phoneNumber) updates.phoneNumber = phoneNumber;

    const updatedEmployee = await Employee.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedEmployee) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Details Updated Successfully",
      updatedEmployee,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Updation failed",
    });
  }
};
