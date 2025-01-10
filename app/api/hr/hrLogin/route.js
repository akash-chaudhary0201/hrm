import dbConnect from "@/app/dbConfig/db";
import HR from "@/models/hr";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { sendToken } from "@/app/utils/jwt";

export const POST = async (req) => {
  try {
    await dbConnect();
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({
        success: false,
        message: "It's required to fill both the details",
      });
    }

    const findHr = await HR.findOne({ email });
    if (!findHr) {
      return NextResponse.json({
        success: false,
        message: "Email or Password is incorrect",
      });
    }
    const matchedPassword = await bcrypt.compare(password, findHr.password);
    if (!matchedPassword) {
      return NextResponse.json({
        success: false,
        message: "Email or Password is incorrect",
      });
    }
    return sendToken(findHr, "Logged in Successfully", findHr.role);
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({
      success: false,
      message: "An error occurred during login. Please try again.",
    });
  }
};
