import dbConnect from "@/app/dbConfig/db";
import Employee from "@/models/employees";
import { NextResponse } from "next/server";
export const revalidate = 0;

// Function to get all the employees
export const GET = async () => {
  try {
    dbConnect();

    const employees = await Employee.find();
    const totalEmployees = await Employee.countDocuments();

    return NextResponse.json({
      success: true,
      message: "All Employees Profile Fetched Successfully",
      data: employees,
      count: totalEmployees,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong.",
    });
  }
};
