"use server";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";

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
  return fetch(`${process.env.URL}/api/bookings?id=${id}&status=canceled`, {
    method: "PUT",
    headers: headers(),
  })
    .then((res) => res.json())
    .then((res) => {
      revalidateTag("upcoming");
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
