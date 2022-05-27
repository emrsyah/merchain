import React from "react";
import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";
import SidebarItem from "./SidebarItem";

function Sidebar({ store }) {
  const locationNow = useLocation()

  return (
    <nav className="px-6 py-3 flex justify-center h-screen">
      <div className="bg-red-400 flex flex-col items-start">
        {/* Profile */}
        <div className="flex items-center gap-1">
          <img src={store.profileImg} className="w-10" alt="" />
          <p className="font-medium">{store.storeName} Store</p>
        </div>

        {/* Sidebar Items Container */}
        <div className="w-full my-6">
          {/* Sidebar Item */}
          <SidebarItem locationNow={locationNow} itemPath="/app/home" itemName="Home" />
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
