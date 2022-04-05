import { Outlet } from "@remix-run/react";
import React from "react";
import Dashboard from "~/components/Dashboard";

const DashboardLayout = () => {
  return (
    <Dashboard>
      <Outlet />
    </Dashboard>
  );
};

export default DashboardLayout;
