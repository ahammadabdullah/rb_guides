import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const info = await request.json();
  const bookingDate = new Date(info.date);
  // Check if the guide has any accepted bookings on the same date
  const existingBooking = await prisma.booking.findFirst({
    where: {
      userId: info.userId,
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
    console.log("user id", info.userId);
    const res = await prisma.booking.create({
      data: {
        userId: info.userId,
        name: info.name,
        email: info.email,
        number: info.phone,
        date: bookingDate,
        time: info.time,
        location: info.location,
        note: info?.note ?? "",
      },
    });
    console.log(res);
    return NextResponse.json({
      success: "true",
      message: "Booked successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Something went wrong, please try again",
      success: "false",
    });
  }

  console;
}
