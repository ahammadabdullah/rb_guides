import prisma from "@/lib/db";
import React from "react";
import Profile from "../../home/Profile";
import { auth } from "@/auth";
import { getAllBookings, getAllGuides } from "@/lib/api";
import GuideList from "./GuideList";
import BookingList from "./BookingList";

const userData = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return user;
};
const AdminDashboard = async () => {
  const session = await auth();
  const info = await userData(Number(session?.user?.id));
  const res = await getAllGuides();
  const { bookings } = await getAllBookings();
  return (
    <div>
      <Profile info={info} />
      <section className="mb-20 ">
        <h3 className="text-4xl font-medium font-clash mb-5">Guide Lists</h3>
        <div className="max-h-[520px] overflow-y-scroll">
          <GuideList guides={res.guides} />
        </div>
      </section>
      <section className="mb-20">
        <h3 className="text-4xl font-medium font-clash mb-5">Booking Lists</h3>
        <div className="max-h-[520px] overflow-y-scroll">
          <BookingList guides={bookings} />
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
