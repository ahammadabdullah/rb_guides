"use client";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Navigation, Search } from "lucide-react";
import { useSession } from "next-auth/react";

import LogOut from "../ui/LogOut";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <div className="font-inter bg-primary/[0.07] rounded-[12px] p-4 mb-12 mt-5">
      <nav className="flex justify-between">
        {/* logo here*/}
        <Link href={"/"}>
          <div className="flex gap-2 items-center">
            <Navigation width={37} height={37} color="#D8A3B5" fill="#D8A3B5" />
            <h3 className="font-black text-2xl">RB Guides</h3>
          </div>
        </Link>
        {/* nav links */}
        <div className="flex gap-4 items-center">
          {session?.user ? (
            <></>
          ) : (
            <Link className="font-medium" href={"/about"}>
              About Us
            </Link>
          )}
          {session?.user ? <LogOut /> : <span></span>}
          {session?.user ? (
            <Link href={pathname === "/dashboard" ? "/" : "/dashboard"}>
              <Button className="font-clash bg-primary text-[22px] font-medium text-black  rounded-[8px]">
                {pathname === "/dashboard" ? "Home" : "Dashboard"}
              </Button>
            </Link>
          ) : (
            <Link href={"/login"}>
              <Button className="font-clash bg-primary text-[22px] font-medium text-black  rounded-[8px]">
                Sign In
              </Button>
            </Link>
          )}

          <Search width={28} height={28} />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
