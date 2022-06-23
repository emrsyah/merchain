import { Icon } from "@iconify/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/merchainLogo.svg";
import { cartCount } from "../atoms/cartAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import { storeColor } from "../atoms/storeColor";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { userCustomer } from "../atoms/userCustomer";
import { useEffect } from "react";
import CustomerProfile from "./CustomerProfile";

function NavbarStore() {
  const count = useRecoilValue(cartCount);
  const navigate = useNavigate();
  const color = useRecoilValue(storeColor);
  const [user, setUser] = useRecoilState(userCustomer);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      let userNow = null;
      if (user) {
        userNow = {
          uid: user.uid,
          email: user.email,
          nomor: user.phoneNumber ? user.phoneNumber : "",
          image: user.photoURL ? user.photoURL : null
        };
      }
      setUser(userNow);
    });
  }, []);

  return (
    <nav className="flex 2xl:max-w-7xl 2xl:mx-auto 2xl:px-0 items-center justify-between bg-white z-[49] py-3 px-3 md:px-6 lg:px-16 border-b-gray-200 sticky top-0 border-b-[1px]">
      <Link to="/">
        <img src={logo} alt="merchain logo" className="w-3/4 md:w-auto" />
      </Link>
      <div className="flex items-center justify-between gap-2 md:gap-6">
        <div
          className="relative cursor-pointer"
          onClick={() => navigate("/cart")}
        >
          <div
            className={` ${
              color ? color + "-btn" : "purple-btn"
            } w-5 h-5 rounded-full absolute -right-[10px] -top-2 text-xs p-2 text-white flex items-center justify-center`}
          >
            {count}
          </div>
          <Icon icon="clarity:shopping-bag-line" width={28} />
        </div>
    
        <CustomerProfile user={user} color={color} />
      </div>
    </nav>
  );
}

export default NavbarStore;
