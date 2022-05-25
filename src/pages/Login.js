import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/merchainLogo.svg";
import GoogleLogin from "../components/GoogleLogin";

function Login() {
  return (
    <>
      <nav className="py-6 px-16 flex items-center justify-between ">
        <Link to="/">
          <img src={logo} alt="merchain icon" />
        </Link>
        <div>
          <span className="opacity-80">Belum punya akun? </span>
          <Link
            to="/signup"
            className="font-semibold text-purple-600 underline hover:font-bold"
          >
            Daftar
          </Link>
        </div>
      </nav>
      <div className="flex justify-center mt-6 flex-col max-w-sm mx-auto">
        <h1 className="text-3xl font-semibold text-center">
          Selamat Datang Kembali!
        </h1>

        {/* Form Login Biasa */}
        <form className="flex flex-col mt-8 gap-3">
          <input
            type="text"
            placeholder="Email"
            required
            className="required font-medium p-4 py-3 border-2 border-gray-300 rounded-lg outline-purple-500 hover:border-purple-600 duration-500 ease-out transition-all"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="required font-medium p-4 py-3 border-2 border-gray-300 rounded-lg outline-purple-500 hover:border-purple-600 duration-500 ease-out transition-all"
          />
          <button
            type="submit"
            className="p-3 mt-2 tracking-widest font-semibold hover:bg-purple-700 transition-all duration-200 ease-out bg-purple-600 text-white rounded-lg"
          >
            Masuk Sekarang
          </button>
        </form>
        <p class="text-center overflow-hidden before:h-[1.5px] font-medium opacity-60 after:h-[1.5px] after:bg-slate-400 after:inline-block after:relative after:align-middle after:w-1/4 before:bg-slate-400 before:inline-block before:relative before:align-middle before:w-1/4 before:right-2 after:left-2  p-8">
          atau masuk dengan
        </p>

        {/* Google Login */}
        <GoogleLogin />
      </div>
    </>
  );
}

export default Login;
