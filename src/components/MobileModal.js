import { Dialog } from "@headlessui/react";
import { Icon } from "@iconify/react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { navbarUser } from "../atoms/navbarUser";

function MobileModal() {
  const [isOpen, setIsOpen] = useRecoilState(navbarUser);
  const locationNow = useLocation();

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50 inline md:hidden"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed top-0 right-0 flex justify-end p-3 ml-auto w-full">
        <Dialog.Panel className="bg-white pt-3 pb-6 px-6 rounded-md w-4/5">
          <Dialog.Title className="flex items-center justify-end text-gray-600">
            <Icon
              icon="heroicons-outline:x"
              width={28}
              onClick={() => setIsOpen(false)}
            />
          </Dialog.Title>
          <div className="w-full my-2 font-medium gap-2 flex flex-col">
            <Link
              to="/"
              onClick={()=>setIsOpen(false)}
              className={`py-1 ${
                locationNow.pathname === "/" && "text-purple-600"
              } `}
            >
              <p>Home</p>
            </Link>
            <Link
              to="/faq"
              onClick={()=>setIsOpen(false)}
              className={`py-1 ${
                locationNow.pathname.includes("/faq") && "text-purple-600"
              } `}
            >
              <p>Faq</p>
            </Link>
            <Link
              to="/login"
              onClick={()=>setIsOpen(false)}
              className={`py-1 ${
                locationNow.pathname.includes("/login") && "text-purple-600"
              } `}
            >
              <p>Login</p>
            </Link>
            <Link
              to="/signup"
              onClick={()=>setIsOpen(false)}
              className="rounded-3xl flex items-center justify-center mt-3 p-2 text-[15px]  font-medium bg-purple-500 text-white"
            >
              <p>Coba Sekarang - Gratis</p>
            </Link>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default MobileModal;
