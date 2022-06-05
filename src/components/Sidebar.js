import { Icon } from "@iconify/react";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import SidebarItem from "./SidebarItem";
// import SidebarProfile from "./SidebarProfile";
import logo from "../assets/merchainLogo.svg";

const sidebarItems = [
  {
    itemName: "Home",
    itemPath: "/app/home",
    icon: "carbon:home",
  },
  {
    itemName: "Orders",
    itemPath: "/app/orders",
    icon: "carbon:shopping-cart",
  },
  {
    itemName: "Products",
    itemPath: "/app/products",
    icon: "carbon:tag",
  },
  {
    itemName: "Customers",
    itemPath: "/app/customers",
    icon: "bi:people",
  },
  {
    itemName: "Settings",
    itemPath: "/app/settings",
    icon: "carbon:settings",
  },
];

function Sidebar({ store }) {
  const locationNow = useLocation();

  return (
    <>
      {/* Sidebar For Dekstop */}
      <nav className="pl-6 pr-2 py-7 justify-center h-screen border-r-[1px] w-full sidebarSticky border-r-gray-300 hidden md:flex">
        <div className="flex flex-col items-start w-full">
          {/* Profile */}

          {/* <SidebarProfile img={store.profileImg} name={store.storeName} /> */}

          <div className="flex items-center gap-2 w-full rounded">
            <img src={store.profileImg} className="w-12 h-12 rounded-full p-[2px] border-2 border-purple-600 object-cover" alt="" />
            <p className="font-medium text-left lg:text-[15px]">
              {store.storeName}
              <span className="hidden lg:inline"> Store</span>
            </p>
          </div>

          {/* Sidebar Items Container */}
          <div className="w-full my-5 gap-2 flex flex-col">
            {/* Sidebar Item */}
            {sidebarItems.map((item, i) => (
              <SidebarItem
                key={i}
                locationNow={locationNow}
                itemPath={item.itemPath}
                itemName={item.itemName}
                icon={item.icon}
              />
            ))}
          </div>
        </div>
      </nav>

      {/* Navbar For Mobile */}
      <nav className="flex md:hidden bg-white p-5 border-b-[1px] border-gray-300 items-center justify-between shadow fixed top-0 w-screen overflow-hidden">
        <Link to="/app/home">
          <img src={logo} alt="" />
        </Link>
        <Icon icon="charm:menu-hamburger" width="32" className="opacity-80" />
      </nav>
    </>
  );
}

export default Sidebar;
