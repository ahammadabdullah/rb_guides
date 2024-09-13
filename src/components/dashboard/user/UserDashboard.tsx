import { auth } from "@/auth";
import Profile from "@/components/home/Profile";
import prisma from "@/lib/db";
import React from "react";
import Upcoming from "../bookingCards/Upcoming";
import NotFound from "../NotFound";
import { getMyBookings, getUpcomingBookings } from "@/lib/api";
import MyBooking from "../bookingCards/MyBooking";
const userData = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return user;
};
const UserDashboard = async () => {
  const session = await auth();
  const id = session?.user?.id;
  const info = await userData(Number(id));
  const myBookingsData = await getMyBookings(id as string);
  const myBookings = myBookingsData.bookings;
  return (
    <div>
      <Profile info={info} />
      <section className="mb-20">
        <h3 className="text-4xl font-medium font-clash mb-5">My Bookings</h3>
        <div className="flex flex-col gap-10">
          {myBookings?.length > 0 ? (
            myBookings.map((booking: any, i: number) => (
              <MyBooking key={i} data={booking} />
            ))
          ) : (
            <NotFound />
          )}
        </div>
      </section>
    </div>
  );
};

export default UserDashboard;
