"use client";
import { LoaderPinwheel, Navigation, Section } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogFooter,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { createTicket } from "@/lib/api";

const Footer = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();
  const handleModal = () => {
    if (!user) {
      toast({
        title: "Please login first",
        description: "You need to login to Open a ticket",
        variant: "destructive",
      });
      router.push("/login");
    } else {
      setOpen(true);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const info = {
      userId: user?.id,
      name: user?.name,
      title: formData.get("title"),
      message: formData.get("message"),
    };
    console.log(info);
    const res = await createTicket(info);
    if (res.success) {
      toast({
        title: "Ticket opened",
        description: "Your ticket has been opened successfully",
        variant: "success",
      });
      setOpen(false);
    } else {
      toast({
        title: "Sorry!",
        description: res.message,
        variant: "destructive",
      });
    }
    setLoading(false);
  };
  return (
    <section className=" text-left bg-primary/[0.07] rounded-t-[12px] mt-20 p-10 flex justify-between">
      {/* left */}
      <div>
        <h3 className="text-4xl font-medium font-clash ">
          <div className="flex gap-2 items-center">
            <Navigation width={37} height={37} color="#D8A3B5" fill="#D8A3B5" />
            <h3 className="font-black text-2xl">RB Guides</h3>
          </div>
        </h3>
        <div className="flex flex-col gap-10">
          <p className="text-lg font-medium">
            Find the best guides for your favorite trip.
          </p>
          <p className="text-lg font-medium">© RB Guides 2024</p>
        </div>
      </div>
      {/* right */}
      <div className="flex gap-10">
        <div className=" font-semibold flex flex-col text-left gap-3 justify-center ">
          <p className="font-bold text-xl">Useful links</p>
          <Link className="hover:underline" href="/register">
            Become a guide
          </Link>
          <Link className="hover:underline" href="/about">
            About Us
          </Link>
          <Link className="hover:underline" href="/terms">
            Terms and Conditions
          </Link>
          <h3 onClick={handleModal} className="hover:cursor-pointer">
            Support
          </h3>
        </div>
        <div className="font-semibold text-left flex flex-col gap-3">
          <p className="font-bold text-xl">Contact</p>
          <p>Phone: +880123456789</p>
          <p>Email: help@rbguides.com</p>
          <p>Address: Dhaka, Bangladesh </p>
        </div>
      </div>

      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogContent className="sm:max-w-md border-none !rounded-[12px]">
          <DialogHeader>
            <DialogTitle>Open a Ticket</DialogTitle>
            <DialogDescription>
              Please provide your details to open a ticket.
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
                  disabled
                  defaultValue={user?.name ?? ""}
                  className="col-span-3 rounded-[8px] border-none bg-primary/[0.07] h-14 pl-4"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  name="title"
                  required
                  id="title"
                  className="col-span-3 rounded-[8px] border-none bg-primary/[0.07] h-14 pl-4"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="message" className="text-right">
                  Message
                </Label>
                <Textarea
                  name="message"
                  required
                  id="message"
                  className="col-span-3 rounded-[8px] border-none bg-primary/[0.07] h-14 pl-4"
                />
              </div>
            </div>
            <DialogFooter className="mt-3">
              <Button
                disabled={loading}
                type="submit"
                className="rounded-[12px]"
              >
                {loading ? (
                  <LoaderPinwheel className="animate-spin" />
                ) : (
                  "Submit"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Footer;
