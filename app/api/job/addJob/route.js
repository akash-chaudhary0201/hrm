import dbConnect from "@/app/dbConfig/db";
import Job from "@/models/jobPosting";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await dbConnect();
    const { title, description, department, location, posted_date, status } =
      await req.json();

    if (
      !title ||
      !description ||
      !department ||
      !location ||
      !posted_date ||
      !status
    ) {
      return NextResponse.json({
        success: false,
        message: "All fields are required",
      });
    }

    const newJob = await Job.create({
      title,
      description,
      department,
      location,
      posted_date,
      status,
    });

    return NextResponse.json({
      success: true,
      message: "New Job posted",
      newJob,
    });
  } catch (error) {
    console.error("Error in adding job:", error);
    return NextResponse.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
