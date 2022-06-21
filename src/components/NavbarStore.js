import { Icon } from "@iconify/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/merchainLogo.svg";
import { cartCount } from "../atoms/cartAtom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { storeColor } from "../atoms/storeColor";
import { checkoutModal } from "../atoms/checkoutModalAtom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { userCustomer } from "../atoms/userCustomer";
import { useEffect } from "react";

function NavbarStore() {
  const count = useRecoilValue(cartCount);
  const navigate = useNavigate();
  const color = useRecoilValue(storeColor);
  const setIsOpen = useSetRecoilState(checkoutModal);
  const [user, setUser] = useRecoilState(userCustomer);

  const clickHandler = () => {
    setIsOpen(true);
  };

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.info("Berhasil Logout");
      setUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user)
      let userNow = null;
      if (user) {
        userNow = {
          uid: user.uid,
          email: user.email,
          nomor: user.phoneNumber ? user.phoneNumber : "",
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
        {user ? (
          <button
            className={` ${
              color ? color + "Nav" : "purpleNav"
            } font-medium text-xs md:text-base transition-all duration-150 ease-out hover:-translate-y-[2px]  py-2 px-4 rounded-md md:rounded-lg border-[1.4px] cursor-pointer`}
            onClick={logoutHandler}
          >
            Logout
          </button>
        ) : (
          <button
            className={` ${
              color ? color + "Nav" : "purpleNav"
            } font-medium text-xs md:text-base transition-all duration-150 ease-out hover:-translate-y-[2px]  py-2 px-4 rounded-md md:rounded-lg border-[1.4px] cursor-pointer`}
            onClick={clickHandler}
          >
            Login
          </button>
        )}
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
      </div>
    </nav>
  );
}

export default NavbarStore;
