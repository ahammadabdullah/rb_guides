"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { LoaderPinwheel } from "lucide-react";
import { getSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const LoginPage = () => {
  const [loading, setLoading] = React.useState(false);
  const session = getSession();

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    if (res?.error) {
      toast({
        title: "Error!!",
        description: "Invalid email or password",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Login successful",
        variant: "success",
      });
      router.push("/dashboard");
    }
    setLoading(false);
  };

  return (
    <div>
      <h3 className="font-clash text-center text-4xl font-extrabold">
        Welcome Back
      </h3>

      <form onSubmit={handleSubmit} className="w-[50%] mx-auto ">
        <div className="mt-4">
          <label className="text-xl font-bold" htmlFor="email">
            Email
          </label>
          <input
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
            autoComplete=""
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
            {loading ? <LoaderPinwheel className="animate-spin" /> : "Login"}
          </Button>
        </div>
      </form>
      <div>
        <p className="text-center mt-10">
          Don&apos;t have an account?{" "}
          <Link className="font-bold" href={"/register"}>
            Sign Up
          </Link>{" "}
          here.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
