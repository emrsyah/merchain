import { Icon } from "@iconify/react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/merchainLogo.svg";
import { auth, firestoreDb } from "../firebase";

function Navbar() {
  const [userAvailable, setUserAvailable] = useState(false);


  // TODO Buat si fetch user pake useMemo/useCallback biar gak mubajir si readnya.
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docSnap = await getDoc(doc(firestoreDb, "users", user.uid));
        if (docSnap.exists()) {
          setUserAvailable(true);
        }
      }
    });
  }, []);
  

  return (
    <nav className="flex items-center justify-between bg-white z-[999] py-5 px-6 lg:px-16 border-b-[1px] border-b-gray-200">
      <Link to="/">
        <img src={logo} alt="merchain logo" />
      </Link>

      <div className="items-center justify-between gap-10 hidden md:flex">
        <NavLink
          to="/faq"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-purple-600"
              : "font-semibold hover:text-purple-600"
          }
        >
          FAQ
        </NavLink>
        {userAvailable ? (
          <Link
            to="/app/home"
            className="hidden md:flex py-3 hover:bg-purple-700 hover:px-9 cursor-pointer transition-all duration-200 ease-out font-semibold items-center gap-3 text-white tracking-wider px-6 bg-purple-600 rounded-full"
          >
            <Icon icon="ri:pie-chart-2-fill" width={22} />
            <p>Dashboard</p>
          </Link>
        ) : (
          <div className="flex items-center justify-between gap-4">
            <Link to="/login" className="btnSecondary">
              Masuk
            </Link>
            <Link to="/signup" className="btnPrimary">
              Daftar Sekarang
            </Link>
          </div>
        )}
      </div>

      <div className="md:hidden flex">
        <Icon icon="charm:menu-hamburger" width="32" className="opacity-80" />
      </div>
    </nav>
  );
}

export default Navbar;
