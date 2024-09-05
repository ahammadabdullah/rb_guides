import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Upcoming from "./bookingCards/Upcoming";
import Request from "./bookingCards/Request";
import { useSession } from "next-auth/react";
import { auth } from "@/auth";
import prisma from "@/lib/db";

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
  console.log(session);
  // const info = {
  //   name: "Farhan Ashhab Nur",
  //   age: 20,
  //   about:
  //     "They there im there for ur best trip ever. I do travel to be there, to know them and to know myself. So be with m",
  //   location: "Dhaka, Bangladesh",
  //   languages: ["English", "Bangla", "Hindi"],
  //   email: "farhan@zeneticesports.com",
  //   image:
  //     "https://pixahive.com/wp-content/uploads/2021/02/An-Indian-boy-375075-pixahive-681x1024.jpg",
  // };
  const info = await userData(Number(session?.user?.id));
  return (
    <div>
      <section className="bg-primary/[0.07] rounded-[12px] w-full grid grid-cols-3 p-10 pl-14 h-[336px] justify-center items-center font-inter mb-20">
        <div className="flex  flex-col justify-between space-y-10">
          <Image
            src={info?.image ?? ""}
            alt="Guide Image"
            width={121}
            height={121}
            className="w-[121px] h-[121px] rounded-[18px]"
          />
          <div>
            <h3 className="font-clash text-3xl text-primary font-medium">
              Welcome...
            </h3>
            <h3 className="font-clash text-4xl font-medium">{info?.name}</h3>
          </div>
        </div>
        <div className="w-[320px] ">
          <h3 className="text-4xl font-clash font-medium mb-5">
            Your Information
          </h3>
          <p className=" font-semibold text-sm">About You</p>
          <p className="font-medium text-[13px] text-white/50">{info?.about}</p>
          <div className="mt-10">
            <Button className="w-full rounded-[8px] font-clash text-2xl font-medium text-white bg-primary/20 py-6">
              Edit your information
            </Button>
          </div>
        </div>
        <div>
          <div className="text-white/50  text-sm space-y-3">
            <div>
              <span className="font-semibold text-sm text-white  pr-1">
                Age:
              </span>
              {info?.age}
              <span className="font-semibold text-sm text-white  pr-1 pl-5">
                Location:
              </span>
              {info?.location}
            </div>
            <div>
              <span className="font-semibold text-sm text-white  pr-1">
                Languages:
              </span>
              {info?.languages?.map((lang, i) => (
                <span key={i}>{lang}, </span>
              ))}
            </div>
            <div>
              <span className="font-semibold text-sm text-white  pr-1">
                Email:
              </span>
              {info?.email}
            </div>
          </div>
        </div>
      </section>

      <section className="mb-20">
        <h3 className="text-4xl font-medium font-clash mb-5">
          Upcoming Bookings
        </h3>
        <div>
          <Upcoming />
        </div>
      </section>
      <section className="mb-20">
        <h3 className="text-4xl font-medium font-clash mb-5">
          Booking requests
        </h3>
        <div>
          <Request />
        </div>
      </section>
    </div>
  );
};

export default GuideDashboard;
