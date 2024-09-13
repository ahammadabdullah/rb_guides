"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { acceptGuide, cancelBooking, getAllGuides } from "@/lib/api";
import React, { useEffect, useState } from "react";

const BookingList = ({ guides: bookings }: { guides: any }) => {
  const Headers = [
    "ID",
    "Name",
    "Email",
    "Location",
    "Date",
    "Status",
    "Action",
  ];

  const handleChangeStatus = async (id: number) => {
    const res = await cancelBooking(id);
    if (res.success === "true") {
      toast({
        variant: "success",
        title: "Hurray!",
        description: "Booking Canceled successfully",
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
    <div>
      <Table className="text-xl">
        <TableHeader>
          <TableRow>
            {Headers.map((header, index) => (
              <TableHead className="text-center" key={index}>
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings?.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                No Bookings Found
              </TableCell>
            </TableRow>
          )}
          {bookings?.map((booking: any, index: number) => (
            <TableRow key={index}>
              <TableCell className="text-center">{booking.id}</TableCell>
              <TableCell className="text-center">{booking.name}</TableCell>
              <TableCell className="text-center">{booking.email}</TableCell>
              <TableCell className="text-center">{booking.location}</TableCell>
              <TableCell className="text-center">
                {new Date(booking?.date).toLocaleDateString("en-US")}
              </TableCell>
              <TableCell className="text-center">{booking.status}</TableCell>
              <TableCell className="text-center">
                {booking.status !== "pending" ? (
                  <Button disabled className="rounded-[8px] ">
                    {`Already ${
                      booking.status === "accepted"
                        ? "Accepted"
                        : booking.status === "declined"
                        ? "Declined"
                        : booking.status === "completed"
                        ? "Completed"
                        : "Canceled"
                    }`}
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleChangeStatus(booking.id)}
                    className="rounded-[8px] "
                  >
                    Cancel
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingList;
