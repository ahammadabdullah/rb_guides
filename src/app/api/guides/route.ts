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
    const res = await prisma.user.findMany({
      where: {
        role: "guide",
      },
      orderBy: [
        {
          status: "desc",
        },
      ],
    });
    return NextResponse.json({
      success: "true",
      guides: res,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong, please try again",
      success: "false",
    });
  }
}

export async function PUT(request: NextRequest) {
  const session = await auth();
  if (session?.user.role !== "admin") {
    return NextResponse.json({
      message: "You are not authorized to perform this action",
      success: "false",
    });
  }
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const id = searchParams.get("id");
  const status = searchParams.get("status");
  try {
    const res = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        status: status as string,
      },
    });
    return NextResponse.json({
      success: "true",
      message: `Guide ${status} successfully`,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong, please try again",
      success: "false",
    });
  }
}
