"use client";
import { toast } from "@/hooks/use-toast";
import { rateGuide } from "@/lib/api";
import { Rating } from "@smastrom/react-rating";
import { useEffect, useState } from "react";

const RatingComponent = ({ id, bookingId, rating, disable }: any) => {
  const handleRating = async (newRating: any) => {
    const res = await rateGuide(id, newRating, bookingId);
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
  return (
    <div className="w-[200px]">
      <Rating readOnly={disable} value={rating} onChange={handleRating} />
    </div>
  );
};

export default RatingComponent;
