import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      <SideBar />

      <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
        <Outlet />
      </main>

    </div>
  );
};

export default AdminLayout;