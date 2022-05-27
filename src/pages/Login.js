import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/merchainLogo.svg";
import GoogleLogin from "../components/GoogleLogin";
import { auth } from "../firebase";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passRef = useRef();

  const loginHandler = async (ev) => {
    ev.preventDefault();
    const id = toast.loading("Tolong tunggu...")
    setLoading(true);
    try {
      await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passRef.current.value
      );
      toast.update(id, { render: "Sukses, Selamat Datang!", type: "success", isLoading: false, autoClose: 2000 });
      navigate("/app/home");
    } catch (error) {
      if (error.code.includes("not-found")) {
        toast.error("Sorry, account is not found");
        return;
      } else if (error.code.includes("wrong-password")) {
        toast.error("Invalid username or password");
        return;
      }
      toast.error(error.code);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | Merchain</title>
      </Helmet>
      <nav className="py-4 px-4 lg:px-16 flex items-center justify-between ">
        <Link to="/">
          <img src={logo} alt="merchain icon" />
        </Link>
        <div>
          <span className="opacity-80 hidden md:inline">
            Belum punya akun?{" "}
          </span>
          <Link
            to="/signup"
            className="font-semibold text-purple-600 underline hover:font-bold"
          >
            Daftar
          </Link>
        </div>
      </nav>
      <div className="flex px-4 lg:px-0 justify-center mt-6 flex-col max-w-sm mx-auto">
        <h1 className="text-3xl font-semibold text-center">
          Selamat Datang Kembali!
        </h1>

        {/* Form Login Biasa */}
        <form className="flex flex-col mt-6 gap-3" onSubmit={loginHandler}>
          <input
            disabled={loading}
            ref={emailRef}
            type="email"
            placeholder="Email"
            required
            className="inputStyle"
          />
          <input
            ref={passRef}
            disabled={loading}
            type="password"
            placeholder="Password"
            required
            minLength={8}
            className="inputStyle"
          />
          <button
            type="submit"
            disabled={loading}
            className={`p-3 mt-2 tracking-widest font-semibold hover:bg-purple-700 transition-all duration-200 ease-out bg-purple-600 text-white rounded-lg ${loading && "opacity-75"}`}
          >
            Masuk Sekarang
          </button>
        </form>
        <p className="opacity-80 text-center my-5 font-medium  overflow-hidden before:h-[1.5px] after:h-[1.5px] after:bg-gray-300 after:inline-block after:relative after:align-middle after:w-1/4 before:bg-gray-300 before:inline-block before:relative before:align-middle before:w-1/4 before:right-2 after:left-2">
          atau lanjut dengan
        </p>

        {/* Google Login */}
        <GoogleLogin />
      </div>
    </>
  );
}

export default Login;
