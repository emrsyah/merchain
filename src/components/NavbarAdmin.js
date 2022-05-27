import { Icon } from "@iconify/react";
import React from "react";
import NavbarProfile from "./NavbarProfile";

function NavbarAdmin({ user }) {
  return (
    <nav className="hidden md:flex bg-white py-3 px-5 border-b-[1px] border-b-gray-300 items-center justify-between">
      <h5 className="font-medium text-lg"><span className="text-3xl">🌃</span>Selamat Malam, {user.displayName}</h5>
      <div className="flex items-center gap-4">
        <Icon
          icon="clarity:notification-outline-badged"
          width="22"
          className="text-purple-600 hover:scale-105 transition-all duration-100 ease-out cursor-pointer"
        />
        {/* <img src={user.profileImg} className="w-10 rounded-full" alt="" /> */}
        <NavbarProfile img={user.profileImg} />
      </div>
    </nav>
  );
}

export default NavbarAdmin;
