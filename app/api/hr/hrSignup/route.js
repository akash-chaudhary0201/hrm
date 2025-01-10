import dbConnect from "@/app/dbConfig/db";
import HR from "@/models/hr";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req) => {
  try {
    await dbConnect();
    const { name, email, password, designation, phoneNumber, hireAt } =
      await req.json();
    if (
      !name ||
      !email ||
      !password ||
      !designation ||
      !phoneNumber ||
      !hireAt
    ) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newHR = await HR.create({
      name,
      email,
      password: hashedPassword,
      designation,
      phoneNumber,
      hireAt,
    });

    return NextResponse.json({
      success: true,
      message: "HR added successfully",
      newHR,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      error,
    });
  }
};
