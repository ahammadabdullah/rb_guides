"use server";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";
import prisma from "./db";
import { auth } from "@/auth";

export async function getUpcomingBookings(id: number | string) {
  return fetch(`${process.env.URL}/api/bookings?id=${id}&status=accepted`, {
    headers: headers(),
    next: { tags: ["upcoming"] },
  }).then((res) => res.json());
}
export async function getBookingRequests(id: number | string) {
  return fetch(`${process.env.URL}/api/bookings?id=${id}&status=pending`, {
    headers: headers(),

    next: { tags: ["requests"] },
  }).then((res) => res.json());
}

export async function cancelBooking(id: number | string) {
  return fetch(`${process.env.URL}/api/bookings?id=${id}&status=cancelled`, {
    method: "PUT",
    headers: headers(),
  })
    .then((res) => res.json())
    .then((res) => {
      revalidateTag("upcoming");
      revalidateTag("bookings");
      return res;
    });
}

export async function acceptBooking(id: number | string) {
  return fetch(`${process.env.URL}/api/bookings?id=${id}&status=accepted`, {
    method: "PUT",
    headers: headers(),
  })
    .then((res) => res.json())
    .then((res) => {
      revalidateTag("requests");
      revalidateTag("upcoming");
      return res;
    });
}

export async function declineBooking(id: number | string) {
  return fetch(`${process.env.URL}/api/bookings?id=${id}&status=declined`, {
    method: "PUT",
    headers: headers(),
  })
    .then((res) => res.json())
    .then((res) => {
      revalidateTag("requests");
      revalidateTag("upcoming");
      return res;
    });
}

export async function getAllGuides() {
  return fetch(`${process.env.URL}/api/guides`, {
    headers: headers(),
    next: { tags: ["guides"] },
  }).then((res) => res.json().then((res) => res));
}

export async function getAllBookings() {
  return fetch(`${process.env.URL}/api/bookings/all`, {
    headers: headers(),
    next: { tags: ["bookings"] },
  }).then((res) => res.json());
}

export async function acceptGuide(id: number | string) {
  return fetch(`${process.env.URL}/api/guides?id=${id}&status=accepted`, {
    method: "PUT",
    headers: headers(),
  })
    .then((res) => res.json())
    .then((res) => {
      revalidateTag("guides");
      return res;
    });
}

export async function getUser() {
  const session = await auth();
  const id = Number(session?.user?.id);
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id as number,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
}

export async function getMyBookings(id: number | string) {
  return fetch(`${process.env.URL}/api/bookings/me?id=${id}`, {
    headers: headers(),
    next: { tags: ["myBookings"] },
  }).then((res) => res.json());
}

export async function rateGuide(
  guideId: number | string,
  newRating: number,
  bookingId: number
) {
  const session = await auth();
  const userId = Number(session?.user?.id);

  // check if the booking is already rated
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    select: {
      rating: true,
    },
  });
  if (booking?.rating !== 0) {
    return { success: false, message: "This booking has already been rated" };
  }

  // get the current average rating and total ratings of the guide
  const guide = await prisma.user.findUnique({
    where: {
      id: Number(guideId),
    },
    select: {
      avgRating: true,
      totalRating: true,
    },
  });
  const currentAvg = guide?.avgRating || 0;
  const totalRatings = guide?.totalRating || 0;
  const newAvgRating =
    (currentAvg * totalRatings + newRating) / (totalRatings + 1);
  // update the guide's average rating and total ratings
  try {
    const res = await prisma.user.update({
      where: {
        id: Number(guideId),
      },
      data: {
        avgRating: newAvgRating,
        totalRating: totalRatings + 1,
      },
    });
    // add the rating to the booking
    await prisma.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        rating: newRating,
      },
    });
    revalidateTag("myBookings");
    console.log("newRating", newRating);
    return {
      success: true,
      message: "Guide rated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong, please try again",
    };
  }
}

export async function cancelMyBooking(id: number | string) {
  return fetch(`${process.env.URL}/api/bookings/me?id=${id}`, {
    method: "PUT",
    headers: headers(),
  })
    .then((res) => res.json())
    .then((res) => {
      revalidateTag("myBookings");
      return res;
    });
}
