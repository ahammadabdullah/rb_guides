import { auth } from "@/auth";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (session?.user.role !== "admin") {
    return NextResponse.json({
      message: "You are not authorized to perform this action",
      success: "false",
    });
  }
  try {
    const bookings = await prisma.booking.findMany();
    return NextResponse.json({
      success: "true",
      bookings,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong, please try again",
      success: "false",
    });
  }
}
// up
