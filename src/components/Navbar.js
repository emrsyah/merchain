import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/merchainLogo.svg";

function Navbar() {
  return (
    <nav className="flex items-center justify-between py-5 px-16 border-b-[1px] border-b-gray-200">
      <Link to="/">
        <img src={logo} alt="merchain logo" />
      </Link>
      <div className="items-center justify-between gap-10 hidden md:flex">
        <Link to="/faq" className="font-medium ml-7 hover:text-purple-600">
          FAQ
        </Link>
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
        Hamburger Button
      </div>
    </nav>
  );
}

export default Navbar;
