import React from "react";
import { useLocation } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import SidebarProfile from "./SidebarProfile";

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
    <nav className="pl-6 pr-2 py-7 flex justify-center h-screen border-r-[1px] border-r-gray-300">
      <div className="flex flex-col items-start w-full">
        {/* Profile */}
        {/* <div className="flex items-center gap-2 cursor-pointer w-full rounded p-1 hover:bg-gray-100">
          <img src={store.profileImg} className="w-10" alt="" />
          <p className="font-medium text-[15px]">{store.storeName} Store</p>
        </div> */}
        <SidebarProfile img={store.profileImg} name={store.storeName} />

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
  );
}

export default Sidebar;
