import dbConnect from "@/app/dbConfig/db";
import HR from "@/models/hr";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await dbConnect();
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({
        success: false,
        message: "JWT token must be provided",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    const hr = await HR.findById(decoded.id).select("-password");
    if (!hr) {
      return NextResponse.json({
        success: false,
        message: "HR not found",
      });
    }
    return NextResponse.json({
      success: true,
      hr,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Error",
    });
  }
};
