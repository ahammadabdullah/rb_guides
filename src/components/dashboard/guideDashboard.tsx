import React, { useState } from "react";
import Upcoming from "./bookingCards/Upcoming";
import Request from "./bookingCards/Request";
import { auth } from "@/auth";
import prisma from "@/lib/db";
import Profile from "../home/Profile";
import { getBookingRequests, getUpcomingBookings } from "@/lib/api";
import NotFound from "./NotFound";
const userData = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return user;
};

const GuideDashboard = async () => {
  const session = await auth();
  const info = await userData(Number(session?.user?.id));
  const id = session?.user?.id;
  const upcomingBookingsData = await getUpcomingBookings(id as string);
  const upcomingBookings = upcomingBookingsData.bookings;
  const pendingRequestsData = await getBookingRequests(id as string);
  const pendingRequests = pendingRequestsData.bookings;
  return (
    <div>
      <Profile info={info} />
      <section className="mb-20">
        <h3 className="text-4xl font-medium font-clash mb-5">
          Upcoming Bookings
        </h3>
        <div className="flex flex-col gap-10">
          {upcomingBookings?.length > 0 ? (
            upcomingBookings.map((booking: any, i: number) => (
              <Upcoming key={i} data={booking} />
            ))
          ) : (
            <NotFound />
          )}
        </div>
      </section>
      <section className="mb-20">
        <h3 className="text-4xl font-medium font-clash mb-5">
          Booking requests
        </h3>
        <div className="flex flex-col gap-10">
          {pendingRequests?.length > 0 ? (
            pendingRequests.map((booking: any, i: number) => (
              <Request key={i} data={booking} />
            ))
          ) : (
            <NotFound />
          )}
        </div>
      </section>
    </div>
  );
};

export default GuideDashboard;
