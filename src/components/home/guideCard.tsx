"use client";
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogFooter,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { CopyIcon, LoaderPinwheel } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "@/hooks/use-toast";

const GuideCard = ({ data }: any) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const info = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      date: formData.get("date"),
      time: formData.get("time"),
      location: formData.get("location"),
      note: formData.get("note"),
      userId: data.id,
    };
    console.log(info);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        body: JSON.stringify(info),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await res.json();
      if (json.success === "true") {
        toast({
          title: "Booked successfully",
          description:
            "Your booking has been applied. Wait for the guide to contact you.",
          variant: "success",
        });
      } else {
        toast({
          title: "Sorry!",
          description: json.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Sorry!",
        description: "Something went wrong, please try again later",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-[432px] h-[595px] border-none rounded-[10px] bg-primary/[0.07] relative">
      <Image
        src={data.image}
        width={400}
        height={400}
        alt="Image"
        className=" w-full h-[434px] rounded-t-[10px] object-cover"
      />
      <CardContent className="p-3 bg-[#3E2930] rounded-[10px] w-[90%] mx-auto space-y-3 absolute bottom-[3%] left-[4%]">
        <div>
          <h1 className="text-2xl font-extrabold">
            {data.name} <span>({data.age})</span>
          </h1>
          <p className="text-base font-semibold">{data.location}</p>
        </div>
        <p className="font-medium text-sm text-white/60">{data.description}</p>
        <div className="flex justify-between">
          <p className="text-2xl font-extrabold">$ {data.price}/day</p>

          <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <DialogTrigger asChild>
              <Button
                onClick={() => setOpen(!open)}
                className="font-clash bg-primary text-[22px] font-medium text-black  rounded-[8px]"
              >
                Book Now
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md border-none !rounded-[12px]">
              <DialogHeader>
                <DialogTitle>Book {data?.name}!</DialogTitle>
                <DialogDescription>
                  Please provide your details to book this guide.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      className="col-span-3 rounded-[8px] border-none bg-primary/[0.07] h-14 pl-4"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      required
                      name="email"
                      id="email"
                      className="col-span-3 rounded-[8px] border-none bg-primary/[0.07] h-14 pl-4"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                      Phone
                    </Label>
                    <Input
                      name="phone"
                      required
                      id="phone"
                      className="col-span-3 rounded-[8px] border-none bg-primary/[0.07] h-14 pl-4"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">
                      Date
                    </Label>
                    <Input
                      min={new Date().toISOString().split("T")[0]}
                      id="date"
                      type="date"
                      required
                      name="date"
                      className="col-span-3 rounded-[8px] border-none bg-primary/[0.07] h-14 pl-4"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="time" className="text-right">
                      Time
                    </Label>
                    <Input
                      id="time"
                      required
                      name="time"
                      type="time"
                      className="col-span-3 rounded-[8px] border-none bg-primary/[0.07] h-14 pl-4"
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="location" className="text-right">
                      Location
                    </Label>
                    <Input
                      id="location"
                      type="text"
                      required
                      name="location"
                      className="col-span-3 rounded-[8px] border-none bg-primary/[0.07] h-14 pl-4"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="note" className="text-right">
                      note
                    </Label>
                    <Input
                      id="note"
                      type="text"
                      name="note"
                      className="col-span-3 rounded-[8px] border-none bg-primary/[0.07] h-14 pl-4"
                    />
                  </div>
                </div>
                <DialogFooter className="mt-3">
                  <Button type="submit" className="rounded-[12px]">
                    {loading ? (
                      <LoaderPinwheel className="animate-spin" />
                    ) : (
                      "Book!"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default GuideCard;
