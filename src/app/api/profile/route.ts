import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  const { id, name, url, about, age, lang, location } = await request.json();
  console.log("location -------->", location);
  const languages = lang.split(",");

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
    console.log(res);
    return NextResponse.json({
      success: "true",
      message: "Profile updated successfully",
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
