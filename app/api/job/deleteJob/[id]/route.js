import dbConnect from "@/app/dbConfig/db";
import Job from "@/models/jobPosting";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
  try {
    dbConnect();
    const { id } = params;
    const jobDet = await Job.findById(id);
    if (!jobDet) {
      return NextResponse.json({
        success: false,
        message: "Job not found",
      });
    }

    await Job.findByIdAndDelete(id);
    return NextResponse.json({
      success: true,
      message: "Job's record deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      error,
    });
  }
};
