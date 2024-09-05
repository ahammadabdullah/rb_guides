"use client";
import { signOut } from "next-auth/react";
import React from "react";
import { Button } from "./button";

const LogOut = () => {
  const handleLogOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };
  return (
    <div>
      <Button className="rounded-[8px]" onClick={handleLogOut}>
        Log Out
      </Button>
    </div>
  );
};

export default LogOut;
