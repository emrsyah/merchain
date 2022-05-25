import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/merchainLogo.svg";
import GoogleLogin from "../components/GoogleLogin";

function Signup() {
  return (
    <>
      <nav className="py-4 px-4 lg:px-16 flex items-center justify-between ">
        <Link to="/">
          <img src={logo} alt="merchain icon" />
        </Link>
        <div>
          <span className="opacity-80 hidden md:inline">Sudah punya akun? </span>
          <Link
            to="/login"
            className="font-semibold text-purple-600 underline hover:font-bold"
          >
            Masuk
          </Link>
        </div>
      </nav>
      <div className="flex px-4 justify-center mt-6 flex-col max-w-sm mx-auto">
        <h1 className="text-3xl font-semibold text-center">Daftar Sekarang</h1>

        {/* Form Login Biasa */}
        <form className="flex flex-col mt-6 gap-3">
          {/* Input nama toko */}
          <div className="font-medium p-4 flex py-3 border-2 border-gray-300 rounded-lg outline-purple-500 hover:border-purple-600 duration-500 ease-out transition-all">
            <p>merchain.com/</p>
            <input
              type="text"
              required
              placeholder="tokokamu"
              className="required outline-none font-medium w-4/5"
            />
          </div>
          <input
            type="text"
            required
            placeholder="Email"
            className="required font-medium p-4 py-3 border-2 border-gray-300 rounded-lg outline-purple-500 hover:border-purple-600 duration-500 ease-out transition-all"
          />
          <input
            type="password"
            required
            placeholder="Password"
            className="required font-medium p-4 py-3 border-2 border-gray-300 rounded-lg outline-purple-500 hover:border-purple-600 duration-500 ease-out transition-all"
          />
          <button
            type="submit"
            className="p-3 mt-2 tracking-widest font-semibold hover:bg-purple-700 transition-all duration-200 ease-out bg-purple-600 text-white rounded-lg"
          >
            Daftar
          </button>
        </form>
        <p className="opacity-80 text-center my-5 font-medium  overflow-hidden before:h-[1.5px] after:h-[1.5px] after:bg-gray-300 after:inline-block after:relative after:align-middle after:w-1/4 before:bg-gray-300 before:inline-block before:relative before:align-middle before:w-1/4 before:right-2 after:left-2">
          atau masuk dengan
        </p>

        {/* Google Login */}
        <GoogleLogin />
      </div>
    </>
  );
}

export default Signup;
