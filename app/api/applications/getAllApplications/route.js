import dbConnect from "@/app/dbConfig/db";
import Application from "@/models/application";
import { NextResponse } from "next/server";
export const revalidate = 0;

export const GET = async () => {
  try {
    await dbConnect();
    const allApplications = await Application.find();
    const totalApplications = await Application.countDocuments();
    return NextResponse.json({
      success: true,
      data: allApplications,
      count: totalApplications,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong.",
    });
  }
};
