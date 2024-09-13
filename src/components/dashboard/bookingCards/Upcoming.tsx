"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { cancelBooking, completeBooking } from "@/lib/api";
import { CalendarDays, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";

const Upcoming = (data: any) => {
  const info = data.data;
  const handleCancelBooking = async () => {
    const res = await cancelBooking(info.id);
    if (res.success === "true") {
      toast({
        variant: "success",
        title: "Hurray!",
        description: "Booking cancelled successfully",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Oops!",
        description: "Something went wrong, please try again",
      });
    }
  };
  const handleCompleteBooking = async () => {
    const res = await completeBooking(info.id);
    if (res.success === "true") {
      toast({
        variant: "success",
        title: "Hurray!",
        description: "Booking declined successfully",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Oops!",
        description: "Something went wrong, please try again",
      });
    }
  };
  return (
    <div className="bg-primary/[0.07] rounded-[12px] flex  flex-col justify-between  w-full p-10  h-[293px]  font-inter">
      <div className=" flex gap-5">
        <div className="flex gap-10">
          <Image
            src={info?.image ?? `https://avatar.vercel.sh/${info?.name}`}
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
              {info?.name}
            </p>
            <p className="text-white/50 text-xl font-medium mb-3">
              <span className="text-xl font-bold pr-1 text-white">Email:</span>
              {info?.email}
            </p>
            <p className="text-white/50 text-xl font-medium">
              <span className="text-xl font-bold pr-1 text-white">Number:</span>
              {info?.number}
            </p>
          </div>
        </div>
        <div className="w-[300px]">
          <p className="text-base font-bold pr-1 text-white">
            Special Request:
          </p>
          <p className="text-white/50 text-base">{info?.note}</p>
        </div>
        <div>
          <div className="flex items-center gap-3">
            <CalendarDays color="#D8A3B5" />
            <div>
              <p className="text-2xl font-bold">
                Request for {new Date(info?.date).toLocaleDateString("en-US")}
              </p>
              <p className="text-white/50 text-xl font-semibold">
                around {info?.time} BST
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin color="#D8A3B5" />
            <div>
              <p className="text-2xl font-bold">{info?.location}</p>
              <p className="text-white/50 text-xl font-semibold">
                Meeting Point
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-end justify-end w-full gap-5">
        <Button
          onClick={() => handleCancelBooking()}
          className=" w-[232px] rounded-[8px] font-clash text-2xl font-medium text-white bg-primary/20 py-6"
        >
          Cancel Booking
        </Button>
        <Button
          onClick={() => handleCompleteBooking()}
          className=" w-[232px] rounded-[8px] font-clash text-2xl font-medium text-white bg-primary/20 py-6"
        >
          Complete Booking
        </Button>
      </div>
    </div>
  );
};

export default Upcoming;
