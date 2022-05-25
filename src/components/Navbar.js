import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/merchainLogo.svg";

function Navbar() {
  return (
    <div className="flex items-center justify-between py-5 px-16">
      <Link to="/">
        <img src={logo} alt="" />
      </Link>
      <div className="flex items-center justify-between gap-10">
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
    </div>
  );
}

export default Navbar;
