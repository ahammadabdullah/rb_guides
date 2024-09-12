import { auth } from "@/auth";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({
      message: "You are not authorized to perform this action",
      success: "false",
    });
  }
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const userId = searchParams.get("id");

  try {
    const bookings = await prisma.booking.findMany({
      where: {
        userId: Number(userId),
      },
    });
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
export async function PUT(request: NextRequest) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const bookingId = searchParams.get("id");
  const status = "cancelled";
  try {
    const res = await prisma.booking.update({
      where: {
        id: Number(bookingId),
      },
      data: {
        status: status as string,
      },
    });
    return NextResponse.json({
      success: "true",
      message: `Booking ${status} successfully`,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong, please try again",
      success: "false",
    });
  }
}
