"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { acceptBooking, declineBooking } from "@/lib/api";
import { CalendarDays, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";

const Request = (data: any) => {
  const info = data.data;

  const handleAcceptRequest = async () => {
    const res = await acceptBooking(info.id);
    if (res.success === "true") {
      toast({
        variant: "success",
        title: "Hurray!",
        description: "Booking accepted successfully",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Oops!",
        description: "Something went wrong, please try again",
      });
    }
  };
  const handleDeclineRequest = async () => {
    const res = await declineBooking(info.id);
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
    <div className="bg-primary/[0.07] rounded-[12px] flex  flex-col justify-between  w-full p-10  h-[293px] items-center font-inter">
      <div className=" flex gap-5">
        <div className="flex gap-10">
          <Image
            src={info?.image ?? `https://avatar.vercel.sh/${info?.name}`}
            alt="Tourist Image"
            width={200}
            height={200}
            className="w-[154px] h-[154px] rounded-[15px] object-fit"
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
              <p className="text-2xl font-bold">
                Request for {new Date(info?.date).toLocaleDateString("en-US")}
              </p>
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
      <div className="flex items-end justify-end w-full gap-5">
        <Button
          onClick={() => handleDeclineRequest()}
          className=" w-[129px] rounded-[8px] font-clash text-2xl font-medium text-white bg-primary/20 py-6"
        >
          Decline
        </Button>
        <Button
          onClick={() => handleAcceptRequest()}
          className=" w-[129px] rounded-[8px] font-clash text-2xl font-medium text-white bg-primary py-6"
        >
          Accept
        </Button>
      </div>
    </div>
  );
};

export default Request;
