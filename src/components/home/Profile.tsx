/* eslint-disable react/no-unescaped-entities */
"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { auth } from "@/auth";
import prisma from "@/lib/db";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogClose,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { UploadButton } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { LoaderPinwheel } from "lucide-react";

const Profile = ({ info }: any) => {
  const [image, setImage] = useState<any | null>(info?.image ?? null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const ageGroup = Array.from({ length: 20 }, (_, i) => i + 1);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const about = formData.get("about");
    const location = formData.get("location");
    const lang = formData.get("languages");
    const age = formData.get("age");
    // console.log(name, about, location, lang, age);
    const res = await fetch("/api/profile", {
      method: "PATCH",
      body: JSON.stringify({
        id: info.id,
        name,
        about,
        location,
        lang,
        age,
        url: image,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success === "true") {
          toast({
            title: "Success",
            description: "Profile updated successfully",
            variant: "success",
          });
        } else {
          toast({
            title: "Error!!",
            description: "Something went wrong, please try again",
            variant: "destructive",
          });
        }
      });
    setOpen(false);
    setLoading(false);
    window.location.reload();
  };
  console.log(info);
  return (
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
          <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <DialogTrigger asChild>
              <Button
                onClick={() => setOpen(true)}
                className="w-full rounded-[8px] font-clash text-2xl font-medium text-white bg-primary/20 py-6"
              >
                Edit your information
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[500px] rounded-[12px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <form className="space-y-3" onSubmit={handleSubmit}>
                <div className="flex justify-center">
                  <Image
                    src={image?.url ?? info?.image}
                    alt="Guide Image"
                    width={121}
                    height={121}
                    className="w-[121px] h-[121px] rounded-[18px]"
                  />
                </div>
                <div className="grid gap-4 ">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      name="name"
                      id="name"
                      defaultValue={info?.name}
                      className="col-span-3 rounded-[8px] border-none bg-primary/[0.07] h-14 pl-4"
                    />
                  </div>
                </div>
                <div className="grid gap-4 ">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Image
                    </Label>
                    <UploadButton
                      className="bg-primary/[0.07] text-white w-[334px] h-14 mt-2 rounded-[12px] text-xl ut-button:bg-primary/[0.07] ut-allowed-content:hidden ut-button:w-full ut-button:h-14 ut-button:text-white focus:ring-0 focus:outline-none focus:border-none !ut-uploading:bg-primary/[0.07] !ut-uploading:text-white "
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => setImage(res[0].url)}
                      onUploadError={(err) => console.log(err)}
                    />
                  </div>
                </div>
                <div className="grid gap-4 ">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      About You
                    </Label>
                    <Input
                      name="about"
                      id="about"
                      defaultValue={info?.about ?? ""}
                      className="col-span-3 rounded-[8px] border-none bg-primary/[0.07] h-14 pl-4"
                    />
                  </div>
                </div>
                <div className="grid gap-4 ">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Location
                    </Label>
                    <Input
                      name="location"
                      id="location"
                      defaultValue={info?.location ?? ""}
                      className="col-span-3 rounded-[8px] border-none bg-primary/[0.07] h-14 pl-4"
                    />
                  </div>
                </div>
                <div className=" grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Age
                  </Label>
                  <Select name="age">
                    <SelectTrigger className="w-[334px] rounded-[8px] border-none bg-primary/[0.07] h-14 pl-4">
                      <SelectValue placeholder="Select Age" />
                    </SelectTrigger>
                    <SelectContent className="">
                      <SelectGroup>
                        {ageGroup.map((age, i) => (
                          <SelectItem key={i} value={(age + 24).toString()}>
                            {age + 24}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className=" grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Languages
                  </Label>
                  <Input
                    id="location"
                    name="languages"
                    placeholder="Separated by comma"
                    defaultValue={info?.languages?.join(", ") ?? ""}
                    className="col-span-3 rounded-[8px] border-none bg-primary/[0.07] h-14 pl-4"
                  />
                </div>
                <DialogFooter>
                  {/* <DialogClose> */}
                  <Button type="submit" className="rounded-[12px]">
                    {loading ? (
                      <LoaderPinwheel className="animate-spin" />
                    ) : (
                      "Save changes"
                    )}
                  </Button>
                  {/* </DialogClose> */}
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div>
        <div className="text-white/50  text-sm space-y-3">
          <div>
            <span className="font-semibold text-sm text-white  pr-1">Age:</span>
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
            {info?.languages?.map((lang: any, i: number) => (
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
  );
};

export default Profile;
