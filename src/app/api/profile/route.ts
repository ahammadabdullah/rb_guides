import { auth } from "@/auth";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  const { id, name, url, about, age, lang, location } = await request.json();
  const languages = lang.split(",");
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({
      message: "You are not authorized to perform this action",
      success: "false",
    });
  }
  try {
    const res = await prisma.user.update({
      where: {
        id: Number(id) as number,
      },
      data: {
        name: name as string,
        about: about as string,
        age: Number(age),
        location: location as string,
        languages: {
          set: languages,
        },
        image: url,
      },
    });
    return NextResponse.json({
      success: "true",
      message: "Profile updated successfully",
    });
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong, please try again",
      success: "false",
    });
  }
}
