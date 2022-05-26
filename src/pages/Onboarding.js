import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { onboardingState } from "../atoms/onboardingAtom";
import { auth, firestoreDb } from "../firebase";
import logo from "../assets/merchainLogo.svg";
import {
  addDoc,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";

function Onboarding() {
  const isOnboarding = useRecoilValue(onboardingState);
  const navigate = useNavigate();
  const [storeName, setStoreName] = useState();
  const [userNow, setUserNow] = useState();

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
    if (checkStoreNameAvailability()) {
      toast.error("Nama toko sudah dipakai, silahkan ganti");
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
  };

  //   Cek nama toko udh ada atau belum
  async function checkStoreNameAvailability() {
    const docSnap = await getDoc(
      doc(firestoreDb, "stores"),
      where("storeName", "==", storeName)
    );
    return docSnap.exists();
  }

  return (
    <div className="flex m-auto my-12 max-w-sm flex-col items-center justify-center">
      <Link to="/">
        <img src={logo} alt="merchain logo" />
      </Link>
      <h1 className="font-semibold text-3xl my-5">Silahkan Isi Dahulu</h1>
      <form
        className="w-full m-auto flex flex-col gap-3"
        onSubmit={submitHandler}
      >
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
            className="inputStyle w-full"
            placeholder="Ceritain sedikit tentang toko kamu"
          ></textarea>
        </div>
        <div>
          <p className="mb-1 font-semibold">Jam Buka</p>
          <input
            type="time"
            name=""
            placeholder="Waktu Kerja"
            id=""
            className="inputStyle w-full"
          />
        </div>
        <button type="submit" className="btnPrimary">
          Buat Sekarang
        </button>
      </form>
    </div>
  );
}

export default Onboarding;
