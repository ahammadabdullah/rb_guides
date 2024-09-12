"use client";
import { toast } from "@/hooks/use-toast";
import { rateGuide } from "@/lib/api";
import { Rating } from "@smastrom/react-rating";
import { useEffect, useState } from "react";

const RatingComponent = ({ id, bookingId, rating }: any) => {
  const handleRating = async (newRating: any) => {
    const res = await rateGuide(id, newRating, bookingId);
    console.log("res", res);
    if (res.success) {
      toast({
        title: "Rating added successfully",
        description: "Your rating has been added successfully",
        variant: "success",
      });
    } else {
      toast({
        title: "Sorry!",
        description: res.message,
        variant: "destructive",
      });
    }
  };
  console.log("object", id);
  return (
    <div className="w-[200px]">
      <Rating value={rating} onChange={handleRating} />
    </div>
  );
};

export default RatingComponent;
