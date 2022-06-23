import { Menu } from "@headlessui/react";
import { Icon } from "@iconify/react";
import { signOut } from "firebase/auth";
import React from "react";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { checkoutModal } from "../atoms/checkoutModalAtom";
import { auth } from "../firebase";
import {toast} from 'react-toastify'

function CustomerProfile({ user, color }) {
  const setIsOpen = useSetRecoilState(checkoutModal);

  const logoutHandler = async () => {
    try {
      signOut(auth);
      toast.info('Berhasil Logout')
    } catch (err) {
      console.error(err);
    }
  };

  const loginHandler = () => {
    setIsOpen(true);
  };

  return (
    <Menu className="relative" as="div">
      <Menu.Button className={`flex rounded-full hover:scale-105 transition-all ease-out duration-100 p-[2px] border-2 !text-black ${color + "Nav"} items-center gap-2 cursor-pointer w-full`}>
        {user ? (
          <img
            src={user.image}
            className="w-8 h-8 rounded-full"
            alt="profile img"
          />
        ) : (
          <Icon icon="iconoir:profile-circled" width={26} />
        )}
      </Menu.Button>
      <Menu.Items className="absolute right-0 flex flex-col py-2 rounded bg-white gap-[2px] mt-1 w-44 shadowProfile text-sm font-medium z-10">
        {user ? (
          <>
            <Menu.Item>
              {({ active }) => (
                <Link
                  className={` px-3 py-[6px] flex gap-2 ${
                    active && "bg-gray-100"
                  }`}
                  to="/order-status"
                >
                  <Icon icon="ep:price-tag" width="18" />
                  <p>Pesanan Kamu</p>
                </Link>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  className={` px-3 py-[6px] flex gap-2  ${
                    active && "bg-gray-100 text-red-500"
                  }`}
                  onClick={logoutHandler}
                >
                  <Icon icon="carbon:logout" width="18" />
                  <p className="font-medium">Logout</p>
                </button>
              )}
            </Menu.Item>
          </>
        ) : (
          <Menu.Item>
            {({ active }) => (
              <button
                className={` px-3 py-[6px] flex gap-2  ${
                  active && "hover:bg-gray-100"
                }`}
                onClick={loginHandler}
              >
                <Icon icon="carbon:login" width="18" />
                <p className="font-medium">Login</p>
              </button>
            )}
          </Menu.Item>
        )}
      </Menu.Items>
    </Menu>
  );
}

export default CustomerProfile;
