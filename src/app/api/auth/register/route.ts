import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  const { name, email, password, url, role } = await request.json();
  const hashedPassword = await bcrypt.hash(password as string, 10);
  try {
    const res = await prisma.user.create({
      data: {
        name: name as string,
        email: email as string,
        password: hashedPassword as string,
        image: url,
        role: role as string,
      },
    });
    return NextResponse.json({
      success: "true",
      message: "Sign up successful",
    });
  } catch (error) {
    return NextResponse.json({
      message: "Email already exists",
      success: "false",
    });
  }
}
