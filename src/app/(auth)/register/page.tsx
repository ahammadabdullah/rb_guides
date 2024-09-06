"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import prisma from "@/lib/db";
import { UploadButton } from "@/lib/utils";
import { LoaderPinwheel } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const RegisterPage = () => {
  const [image, setImage] = React.useState<any | null>(null);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const url = image?.url ?? `https://avatar.vercel.sh/${name}`;
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password, url }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success === "true") {
          toast({
            title: "Success",
            description: "Sign up successful. Please login",
            variant: "success",
          });
          router.push("/login");
        } else {
          toast({
            title: "Error!!",
            description: "Email already exists",
            variant: "destructive",
          });
        }
      });
    setLoading(false);
  };
  return (
    <div>
      <h3 className="font-clash text-center text-4xl font-extrabold">
        Welcome to RB Guides
      </h3>

      <form onSubmit={handleSubmit} className="w-[50%] mx-auto ">
        <div className="mt-4">
          <label className="text-xl font-bold" htmlFor="email">
            Your name
          </label>
          <input
            required
            className="w-full bg-primary/[0.07] border-none rounded-[12px] pl-6 focus:ring-0 focus:outline-none h-14 text-xl mt-2 autofill:bg-primary/[0.07] autofill:border-none autofill:text-xl selection:bg-primary/[0.07]"
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name"
          />
        </div>

        <div className="mt-2">
          <label className="text-xl font-bold" htmlFor="email">
            Profile Image
          </label>
          {image !== null ? (
            <div className="w-full h-14 text-center bg-primary/[0.07] rounded-[12px] text-xl mt-2 flex items-center justify-center">
              <span>{image?.name}</span>
            </div>
          ) : (
            <UploadButton
              className="bg-primary/[0.07] text-white w-full h-14 mt-2 rounded-[12px] text-xl ut-button:bg-primary/[0.07] ut-allowed-content:hidden ut-button:w-full ut-button:h-14 ut-button:text-white focus:ring-0 focus:outline-none focus:border-none !ut-uploading:bg-primary/[0.07] !ut-uploading:text-white "
              endpoint="imageUploader"
              onClientUploadComplete={(res) => setImage(res[0])}
              onUploadError={(err) => console.log(err)}
            />
          )}
        </div>
        <div className="mt-2">
          <label className="text-xl font-bold" htmlFor="email">
            Email
          </label>
          <input
            required
            className="w-full bg-primary/[0.07] border-none rounded-[12px] pl-6 focus:ring-0 focus:outline-none h-14 text-xl mt-2 autofill:bg-primary/[0.07] autofill:border-none autofill:text-xl selection:bg-primary/[0.07]"
            type="email"
            name="email"
            id="email"
            placeholder="email@example.com"
          />
        </div>
        <div className="mt-2">
          <label className="text-xl font-bold" htmlFor="password">
            Password
          </label>
          <input
            required
            className="w-full bg-primary/[0.07] border-none rounded-[12px] pl-6 focus:ring-0 focus:outline-none h-14 text-xl mt-2 autofill:bg-primary/[0.07] autofill:border-none autofill:text-xl selection:bg-primary/[0.07]"
            type="password"
            name="password"
            id="password"
            placeholder="******"
          />
        </div>
        <div className="mt-10">
          <Button
            type="submit"
            className="rounded-[12px] w-full h-14 text-2xl bg-primary/20 text-white"
          >
            {loading ? <LoaderPinwheel className="animate-spin" /> : "Sign Up"}
          </Button>
        </div>
      </form>
      <div>
        <p className="text-center mt-10">
          Already have an account?{" "}
          <Link className="font-bold" href={"/login"}>
            Sign In
          </Link>{" "}
          here.
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
