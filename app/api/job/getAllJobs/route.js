import dbConnect from "@/app/dbConfig/db";
import Job from "@/models/jobPosting";
import { NextResponse } from "next/server";
export const revalidate = 0;

export const GET = async () => {
  try {
    dbConnect();

    const jobs = await Job.find();
    const totalJobs = await Job.countDocuments();

    return NextResponse.json({
      success: true,
      message: "All jobs Fetched Successfully",
      data: jobs,
      count: totalJobs,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong.",
    });
  }
};
