import { auth } from "@/auth";
import prisma from "@/lib/db";
import { useSearchParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const info = await request.json();
  const bookingDate = new Date(info.date);
  const session = await auth();
  // Check if the guide has any accepted bookings on the same date
  const existingBooking = await prisma.booking.findFirst({
    where: {
      guideId: info.userId,
      date: bookingDate,
      status: "accepted",
    },
  });
  if (existingBooking) {
    return NextResponse.json({
      message: "The guide is already booked on this date",
      success: "false",
    });
  }
  try {
    const res = await prisma.booking.create({
      data: {
        userId: Number(session?.user?.id),
        name: session?.user.name as string,
        email: session?.user.email as string,
        number: info.phone,
        date: bookingDate,
        time: info.time,
        location: info.location,
        note: info?.note ?? "",
        guideId: info.userId,
      },
    });
    return NextResponse.json({
      success: true,
      message: "Booked successfully",
    });
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong, please try again",
      success: false,
    });
  }
}
// get all bookings by status
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
  const status = searchParams.get("status");
  const role = session?.user.role;

  try {
    // for user
    const bookings = await prisma.booking.findMany({
      where: {
        guideId: Number(userId),
        status: status as string,
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
// update status of a booking
export async function PUT(request: NextRequest) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const bookingId = searchParams.get("id");
  const status = searchParams.get("status");
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
