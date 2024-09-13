import { auth } from "@/auth";
import AdminDashboard from "@/components/dashboard/admin/AdminDashboard";
import GuideDashboard from "@/components/dashboard/guideDashboard";
import UserDashboard from "@/components/dashboard/user/UserDashboard";
import React from "react";

const DashBoardPage = async () => {
  const session = await auth();
  const role = session?.user?.role;
  return (
    <div>
      {role === "admin" ? (
        <AdminDashboard />
      ) : role === "user" ? (
        <UserDashboard />
      ) : (
        <GuideDashboard />
      )}
    </div>
  );
};

export default DashBoardPage;
