import { Icon } from "@iconify/react";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/merchainLogo.svg";

function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-white z-[999] py-5 px-6 lg:px-16 border-b-[1px] border-b-gray-200">
      <Link to="/">
        <img src={logo} alt="merchain logo" />
      </Link>
      <div className="items-center justify-between gap-10 hidden md:flex">
        <NavLink to="/faq"  className={({ isActive }) =>
              isActive ? "font-semibold text-purple-600" : "font-semibold hover:text-purple-600"
            }>
          FAQ
        </NavLink>
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/login"
            className="btnSecondary"
          >
            Masuk
          </Link>
          <Link
            to="/signup"
            className="btnPrimary"
          >
            Daftar Sekarang
          </Link>
        </div>
      </div>
      <div className="md:hidden flex">
      <Icon icon="charm:menu-hamburger"  width="32" className="opacity-80" />
      </div>
    </nav>
  );
}

export default Navbar;
