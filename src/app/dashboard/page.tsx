import { auth } from "@/auth";
import AdminDashboard from "@/components/dashboard/admin/AdminDashboard";
import GuideDashboard from "@/components/dashboard/guideDashboard";
import React from "react";

const DashBoardPage = async () => {
  const session = await auth();
  const role = session?.user?.role;
  console.log(role);
  return (
    <div>{role === "admin" ? <AdminDashboard /> : <GuideDashboard />}</div>
  );
};

export default DashBoardPage;
