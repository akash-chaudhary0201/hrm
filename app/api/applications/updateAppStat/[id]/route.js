import dbConnect from "@/app/dbConfig/db";
import Application from "@/models/application";
import { NextResponse } from "next/server";

export const PATCH = async (req, { params }) => {
  try {
    await dbConnect();
    const { id } = params;
    if (!id) {
      return NextResponse.json({
        success: false,
        message: "This Application is not present here",
      });
    }
    const { status } = await req.json();
    if (!status) {
      return NextResponse.json({
        success: false,
        message: "Status is required",
      });
    }
    const updatedStatus = await Application.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
      }
    );
    return NextResponse.json({
      success: true,
      message: "Application's Status Updated",
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
