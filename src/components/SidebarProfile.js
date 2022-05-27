import { Menu } from "@headlessui/react";
import { Icon } from "@iconify/react";
import React from "react";

function SidebarProfile({ img, name }) {
  console.log(img, name);
  return (
    <Menu className="w-full relative" as="div">
      {/* <div className="flex items-center gap-2 cursor-pointer w-full rounded p-1 hover:bg-gray-100">
          <img src={store.profileImg} className="w-10" alt="" />
          <p className="font-medium text-[15px]">{store.storeName} Store</p>
        </div> */}
      <Menu.Button className="flex items-center gap-2 cursor-pointer w-full rounded p-1 hover:bg-gray-100">
        <img src={img} className="w-10" alt="" />
        <p className="font-medium text-[15px]">{name} Store</p>
      </Menu.Button>
      <Menu.Items className="absolute flex flex-col py-2 rounded bg-white gap-[2px] mt-1 w-full shadowProfile text-sm font-medium z-10">
        <Menu.Item>
          {({ active }) => (
            <a
              className={` px-2 py-[6px] flex gap-2 ${active && "bg-gray-100"}`}
              href="/account-settings"
            >
              <Icon icon="carbon:settings" width="18" /> 
              <p>Settings</p>
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <a
              className={` p-2 py-[6px] flex gap-2  ${
                active && "bg-gray-100 text-red-500"
              }`}
              href="/account-settings"
            >
              <Icon icon="carbon:logout" width="18" />
              <p>Keluar</p>
            </a>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}

export default SidebarProfile;
