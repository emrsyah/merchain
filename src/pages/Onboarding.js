import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { onboardingState } from "../atoms/onboardingAtom";
import { auth, firestoreDb } from "../firebase";
import logo from "../assets/merchainLogo.svg";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import checkStoreNameAvailability from "../helpers/checkStoreNameAvailability";
import { Helmet } from "react-helmet-async";

function Onboarding() {
  const [isOnboarding, setIsOboarding] = useRecoilState(onboardingState);
  const navigate = useNavigate();
  const [storeName, setStoreName] = useState("");
  const [userNow, setUserNow] = useState();
  const bioRef = useRef();
  const openRef = useRef();
  const closeRef = useRef();

  useEffect(() => {
    // disini 2 cek yaitu state on boarding ama login ato nggak
    if (!isOnboarding) navigate("/");
    onAuthStateChanged(auth, (user) => {
      if (!user) navigate("/");
      setUserNow(user);
    });
  }, []);

  const submitHandler = async (ev) => {
    ev.preventDefault();
    try {
      const isAvailable = await checkStoreNameAvailability(storeName)
      if (isAvailable > 0) {
        toast.error("Nama sudah dipakai, silahkan ganti");
        return;
      }
      await setDoc(doc(firestoreDb, "users", userNow.uid), {
        userId: userNow.uid,
        email: userNow.email,
        username: userNow.displayName,
        userImg: userNow.photoURL,
        emailVerified: userNow.emailVerified,
        createdAt: serverTimestamp(),
      });
      await addDoc(collection(firestoreDb, "stores"), {
        userId: userNow.uid,
        emailVerified: userNow.emailVerified,
        profileImg: "gs://merchain-77995.appspot.com/defaultImage.png",
        storeName: storeName,
        storeBio: bioRef.current.value,
        storeTime: [openRef.current.value, closeRef.current.value],
        visited: 0,
        ecommerceLinks: {},
        createdAt: serverTimestamp(),
      });
      setIsOboarding(false)
      navigate('/app/home')
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="flex m-auto my-8 max-w-sm flex-col items-center justify-center">
      <Helmet>
        <title>
          Onboarding | Merchain
        </title>
      </Helmet>
      <Link to="/">
        <img src={logo} alt="merchain logo" />
      </Link>
      <h1 className="font-semibold text-3xl my-5">Silahkan Isi Dahulu</h1>
      <form
        className="w-full m-auto flex flex-col gap-3"
        onSubmit={submitHandler}
      >
        <div className="p-2 rounded-md bg-red-100 font-medium">
          💡 Kamu bisa mengganti hal-hal dibawah nanti
        </div>
        <div>
          <p className="mb-1 font-semibold">Nama</p>
          <div className="inputStyle">
            <p>merchain.com/</p>
            <input
              type="text"
              required
              placeholder="tokokamu"
              value={storeName}
              onChange={(ev) => setStoreName(ev.target.value)}
              className="required outline-none font-medium w-4/5"
            />
          </div>
        </div>
        <div>
          <p className="mb-1 font-semibold">Tentang Toko Kamu</p>
          <textarea
            required
            rows="3"
            ref={bioRef}
            className="inputStyle w-full"
            placeholder="Ceritain sedikit tentang toko kamu"
          ></textarea>
        </div>
        <div>
          <div className="grid grid-cols-2">
            <p className="mb-1 font-semibold col-span-1">Jam Buka</p>
            <p className="mb-1 font-semibold col-span-1 pl-1">Sampai</p>
          </div>
          <div className="flex gap-3">
            <input
              type="time"
              required
              ref={openRef}
              className="inputStyle w-full"
            />
            <input
              type="time"
              required
              ref={closeRef}
              className="inputStyle w-full"
            />
          </div>
        </div>
        <button type="submit" className="btnPrimary">
          Buat Sekarang
        </button>
      </form>
    </div>
  );
}

export default Onboarding;
