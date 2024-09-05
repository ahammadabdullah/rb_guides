import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";

const Upcoming = () => {
  const info = {
    name: "Rafsan Islam Mika",
    number: "01700000000",
    location: "Tejgao Road, Dhaka",
    email: "farhan@zeneticesports.com",
    image:
      "https://pixahive.com/wp-content/uploads/2021/02/An-Indian-boy-375075-pixahive-681x1024.jpg",
    note: "help me pick out some good food places and if you've a cat its a plus!",
    date: "12th October 2021",
    time: "2:00 PM",
  };
  return (
    <div className="bg-primary/[0.07] rounded-[12px] flex  flex-col justify-between  w-full p-10  h-[293px] items-center font-inter">
      <div className=" flex gap-5">
        <div className="flex gap-10">
          <Image
            src={info.image}
            alt="Tourist Image"
            width={154}
            height={154}
            className="w-[154px] h-[154px] rounded-[15px]"
          />
          <div className="text-white ">
            <p
              className="text-3xl font-bold mb-5
              "
            >
              {info.name}
            </p>
            <p className="text-white/50 text-xl font-medium mb-3">
              <span className="text-xl font-bold pr-1 text-white">Email:</span>
              {info.email}
            </p>
            <p className="text-white/50 text-xl font-medium">
              <span className="text-xl font-bold pr-1 text-white">Number:</span>
              {info.number}
            </p>
          </div>
        </div>
        <div className="w-[300px]">
          <p className="text-base font-bold pr-1 text-white">
            Special Request:
          </p>
          <p className="text-white/50 text-base">{info.note}</p>
        </div>
        <div>
          <div className="flex items-center gap-3">
            <CalendarDays color="#D8A3B5" />
            <div>
              <p className="text-2xl font-bold">Request for {info.date}</p>
              <p className="text-white/50 text-xl font-semibold">
                around {info.time} BST
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin color="#D8A3B5" />
            <div>
              <p className="text-2xl font-bold">{info.location}</p>
              <p className="text-white/50 text-xl font-semibold">
                Meeting Point
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-end justify-end w-full">
        <Button className=" w-[232px] rounded-[8px] font-clash text-2xl font-medium text-white bg-primary/20 py-6">
          Cancel Booking
        </Button>
      </div>
    </div>
  );
};

export default Upcoming;
