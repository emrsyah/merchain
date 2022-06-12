import { Icon } from "@iconify/react";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/merchainLogo.svg";

function NavbarStore() {
  return (
    <nav className="flex items-center justify-between bg-white z-[999] py-3 px-3 md:px-6 lg:px-16 border-b-gray-200 sticky top-0 border-b-[1px]">
      <Link to="/">
        <img src={logo} alt="merchain logo" className="w-3/4 md:w-auto" />
      </Link>
      <div className="flex items-center justify-between gap-2 md:gap-10">
        <div className="font-medium text-xs md:text-base bg-purple-200 py-2 px-4 rounded-md md:rounded-lg border-[1px] border-purple-200 hover:bg-white hover:border-purple-700 cursor-pointer text-purple-700">Coba Merchain</div>
        <div className="relative cursor-pointer">
            <div className="bg-purple-600 w-5 h-5 rounded-full absolute -right-[10px] -top-1 text-xs p-2 text-white flex items-center justify-center">30</div>
            <Icon icon="clarity:shopping-bag-line" width={28}/>
        </div>
      </div>
    </nav>
  );
}

export default NavbarStore;
