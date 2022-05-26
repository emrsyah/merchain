import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/merchainLogo.svg";
import GoogleLogin from "../components/GoogleLogin";
import { auth, firestoreDb } from "../firebase";
import checkStoreNameAvailability from "../helpers/checkStoreNameAvailability";

function Signup() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate()
  const [storeName, setStoreName] = useState(
    searchParams.get("name") ? searchParams.get("name") : ""
  );
  const [loading, setLoading] = useState(false)
  const emailRef = useRef();
  const passRef = useRef();

  const signupHandler = async (ev) => {
    ev.preventDefault();
    setLoading(true)
    try {
      const isAvailable = await checkStoreNameAvailability(storeName);
      if (isAvailable > 0) {
        toast.error("Nama sudah dipakai, silahkan ganti");
        return;
      }
      const userCred = await createUserWithEmailAndPassword(auth, emailRef.current.value, passRef.current.value)
      const user = userCred.user
      const username = user.email.split('@')[0]; 
      await updateProfile(user,{
        photoURL: "gs://merchain-77995.appspot.com/defaultImage.png",
        displayName: username
      })
      await setDoc(doc(firestoreDb, "users", user.uid),{
        userId: user.uid,
        email: user.email,
        username: username,
        userImg: "gs://merchain-77995.appspot.com/defaultImage.png",
        emailVerified: user.emailVerified,
        createdAt: serverTimestamp(),
      })
      await addDoc(collection(firestoreDb, "stores"), {
        userId: user.uid,
        emailVerified: user.emailVerified,
        profileImg: "gs://merchain-77995.appspot.com/defaultImage.png",
        storeName: storeName,
        storeBio: null,
        storeTime: null,
        visited: 0,
        ecommerceLinks: {},
        createdAt: serverTimestamp(),
      });
      navigate('/app/home')

    } catch (error) {
      if (error.message.includes("already-in-use")) {
        toast.error("This Email Already In Use");
        return;
      }
      console.log(error);
      toast.error(error.code);
    } finally{
      setLoading(false)
    }
  };

  return (
    <>
      <Helmet>
        <title>Get Started | Merchain</title>
      </Helmet>
      <nav className="py-4 px-4 lg:px-16 flex items-center justify-between ">
        <Link to="/">
          <img src={logo} alt="merchain icon" />
        </Link>
        <div>
          <span className="opacity-80 hidden md:inline">
            Sudah punya akun?{" "}
          </span>
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

        {/* Form Signup Biasa */}
        <form className="flex flex-col mt-6 gap-3" onSubmit={signupHandler}>
          {/* Input nama toko */}
          <div className="inputStyle">
            <p>merchain.com/</p>
            <input
              type="text"
              disabled={loading}
              required
              placeholder="tokokamu"
              value={storeName}
              pattern="^[0-9a-zA-Z]+$"
              errorMessage="Only Accept Letter and Number"
              onChange={(ev) => setStoreName(ev.target.value)}
              className="required outline-none font-medium w-4/5"
            />
          </div>
          <input
            type="email"
            required
            disabled={loading}
            placeholder="Email"
            className="inputStyle"
            ref={emailRef}
          />
          <input
            type="password"
            required
            disabled={loading}
            minLength={8}
            placeholder="Password"
            className="inputStyle"
            ref={passRef}
          />
          <button
            type="submit"
            disabled={loading}
            className="p-3 mt-2 tracking-widest font-semibold hover:bg-purple-700 transition-all duration-200 ease-out bg-purple-600 text-white rounded-lg"
          >
            Daftar
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

export default Signup;
