import { Menu } from "@headlessui/react";
import { Icon } from "@iconify/react";
import { signOut } from "firebase/auth";
import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";

function SidebarProfile({ img, name }) {

  const logoutHandler = async () => {
    try {
      signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Menu className="w-full relative" as="div">
      <Menu.Button className="flex items-center gap-2 cursor-pointer w-full rounded p-1 hover:bg-gray-100">
        <img src={img} className="w-10" alt="" />
        <p className="font-medium text-left lg:text-[15px]">{name}<span className="hidden lg:inline"> Store</span></p>
      </Menu.Button>
      <Menu.Items className="absolute flex flex-col py-2 rounded bg-white gap-[2px] mt-1 w-full shadowProfile text-sm font-medium z-10">
        <Menu.Item>
          {({ active }) => (
            <Link
              className={` px-2 py-[6px] flex gap-2 ${active && "bg-gray-100"}`}
              to="/app/settings"
            >
              <Icon icon="carbon:settings" width="18" />
              <p>Settings</p>
            </Link>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              className={` p-2 py-[6px] flex gap-2  ${
                active && "bg-gray-100 text-red-500"
              }`}
              onClick={logoutHandler}
            >
              <Icon icon="carbon:logout" width="18" />
              <p className="font-medium">Keluar</p>
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}

export default SidebarProfile;
