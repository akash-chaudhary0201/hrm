import dbConnect from "@/app/dbConfig/db";
import Employee from "@/models/employees";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
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
    return NextResponse.json({
      success: true,
      employeeDet,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      error,
    });
  }
};
