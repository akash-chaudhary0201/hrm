import dbConnect from "@/app/dbConfig/db";
import Job from "@/models/jobPosting";
import { NextResponse } from "next/server";

export const PATCH = async (req, { params }) => {
  try {
    await dbConnect();
    const { id } = params;
    if (!id) {
      return NextResponse.json({
        success: false,
        message: "This job is not listed",
      });
    }
    const { status } = await req.json();
    if (!status) {
      return NextResponse.json({
        success: false,
        message: "Status is required",
      });
    }
    const updatedStatus = await Job.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
      }
    );
    return NextResponse.json({
      success: true,
      message: "Job's Status Updated",
      updatedStatus,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Updation failed",
    });
  }
};
