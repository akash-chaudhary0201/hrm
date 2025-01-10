import dbConnect from "@/app/dbConfig/db";
import Application from "@/models/application";
import Job from "@/models/jobPosting";
import { NextResponse } from "next/server";

export const POST = async (req, { params }) => {
  try {
    await dbConnect();
    const { candidate_name, email, resume_url } = await req.json();
    const { id } = params;
    if (!id) {
      return NextResponse.json({
        success: false,
        message: "This job is not on Job Portal",
      });
    }
    if (!candidate_name || !email || !resume_url) {
      return NextResponse.json({
        success: false,
        message: "All fields are required",
      });
    }
    const newApplication = await Application.create({
      candidate_name,
      email,
      resume_url,
      applied_date: new Date(),
      job_id: id,
      status: "Pending",
    });
    return NextResponse.json({
      success: true,
      message: "Applied Successfully",
      newApplication,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: error,
    });
  }
};
