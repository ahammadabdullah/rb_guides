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
    const res = await prisma.ticket.findMany({
      orderBy: {
        status: "desc",
      },
    });
    return NextResponse.json({
      success: "true",
      tickets: res,
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
  const id = searchParams.get("id");
  const status = searchParams.get("status");
  // check if the ticket already confirmed
  const booking = await prisma.ticket.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (booking?.status === "confirmed") {
    return NextResponse.json({
      message: "This ticket has already been confirmed",
      success: "false",
    });
  }
  try {
    const res = await prisma.ticket.update({
      where: {
        id: Number(id),
      },
      data: {
        status: status as string,
      },
    });
    return NextResponse.json({
      success: "true",
      message: `Ticket ${status} successfully`,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong, please try again",
      success: "false",
    });
  }
}
