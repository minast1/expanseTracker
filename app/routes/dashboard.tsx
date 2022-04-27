import { ActionFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import React from "react";
import Dashboard from "~/components/Dashboard";
import { authenticator } from "~/lib/auth.server";

const DashboardLayout = () => {
  return (
    <Dashboard>
      <Outlet />
    </Dashboard>
  );
};

export default DashboardLayout;
export const action: ActionFunction = async ({ request }) => {
  //let formData = await request.formData();

  return await authenticator.logout(request, { redirectTo: "/" });
};
