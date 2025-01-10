import dbConnect from "@/app/dbConfig/db";
import Employee from "@/models/employees";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await dbConnect();
    const { name, designation, department, email, phoneNumber, hireAt } =
      await req.json();

    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return NextResponse.json({
        success: false,
        message: "Employee Already Exists in system",
      });
    }

    // If not, create a new employee
    const newEmp = await Employee.create({
      name,
      designation,
      department,
      email,
      phoneNumber,
      hireAt,
    });

    return NextResponse.json({
      success: true,
      message: "New Employee Added",
      newEmp,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Error",
    });
  }
};
