import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const search = searchParams.get("search");

  try {
    const res = await prisma.user.findMany({
      where: {
        role: "guide",
        status: "accepted",
        OR: [
          {
            name: {
              contains: search || "",
              mode: "insensitive",
            },
          },
          {
            location: {
              contains: search || "",
              mode: "insensitive",
            },
          },
          {
            languages: {
              hasSome: search ? [search] : [],
            },
          },
        ],
      },
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
