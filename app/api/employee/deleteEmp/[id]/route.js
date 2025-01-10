import dbConnect from "@/app/dbConfig/db";
import Employee from "@/models/employees";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
  try {
    dbConnect();
    const { id } = params;
    const employeeDet = await Employee.findById(id).select("-password");
    if (!employeeDet) {
      return NextResponse.json({
        success: false,
        message: "Employee not found",
      });
    }

    await Employee.findByIdAndDelete(id);
    return NextResponse.json({
      success: true,
      message: "Employee's record deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      error,
    });
  }
};
