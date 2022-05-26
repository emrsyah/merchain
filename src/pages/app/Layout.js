import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

function Layout() {
  return (
    <div className="grid grid-cols-11">
      <nav className="col-span-2">
        <Sidebar />
      </nav>
      <main className="col-span-9">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
