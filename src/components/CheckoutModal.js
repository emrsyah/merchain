import { Dialog } from "@headlessui/react";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { useRef } from "react";
import { useRecoilState } from "recoil";
import { checkoutModal } from "../atoms/checkoutModalAtom";

export default function CheckoutModal() {
  const [isOpen, setIsOpen] = useRecoilState(checkoutModal);
  const [mode, setMode] = useState("login");
  const emailRef = useRef(null);
  const passRef = useRef(null);

  const submitHandler = (ev) => {
    ev.preventDefault();
    console.log("sub");
  };

  const googleLoginHandler = () => {
    console.log("first");
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4 max-w-xl mx-auto">
        <Dialog.Panel className="bg-white pt-3 pb-6 px-6 rounded-md">
          <div className="flex items-center justify-between pb-1 border-b-[1px] border-b-gray-300">
            <Dialog.Title className="font-semibold text-purple-600 text-[17px]">
              {mode === "login"
                ? "Login Terlebih Dahulu"
                : "Silahkan Mendaftar Dahulu"}
            </Dialog.Title>
            <Icon
              icon="heroicons-solid:x"
              width={18}
              className="text-gray-700 cursor-pointer hover:text-gray-900"
              onClick={() => setIsOpen(false)}
            />
          </div>
          <Dialog.Description className="mt-2 text-gray-700">
            {mode === "login"
              ? "Silahkan login terlebih dahulu untuk melanjutkan proses checkout"
              : "Silahkan daftar dahulu untuk melanjutkan proses checkout"}
          </Dialog.Description>
          <form className="flex flex-col mt-3 gap-2" onSubmit={submitHandler}>
            <div>
              <p className="text-gray-700 text-[15px] font-medium">Email</p>
              <input
                type="text"
                className="border-[1px] w-full border-gray-400 rounded outline-none p-2 text-sm focus:border-purple-600"
                placeholder="user@gmail.com"
                ref={emailRef}
              />
            </div>
            <div>
              <p className="text-gray-700 text-[15px] font-medium">Password</p>
              <input
                type="password"
                className="border-[1px] w-full border-gray-400 rounded outline-none p-2 text-sm focus:border-purple-600"
                placeholder="password"
                ref={passRef}
              />
            </div>
            <button className="btnPrimary py-[6px]" type="submit">
              {mode === "login" ? "Masuk" : "Daftar"}
            </button>
          </form>
          <p className="text-center my-3 text-sm text-gray-700">
            atau masuk dengan
          </p>
          <button
            onClick={googleLoginHandler}
            className="border-2 w-full border-gray-300 gap-3 rounded-full p-2 font-semibold items-center flex justify-center transition-all duration-300 hover:border-purple-600 cursor-pointer"
          >
            <Icon icon="flat-color-icons:google" width="24" />
            <p>Masuk dengan Google</p>
          </button>
          {mode === "login" ? (
            <p className="text-center mt-3 text-sm text-gray-700" onClick={()=>setMode('daftar')}>
              Belum punya akun?{" "}
              <span className="text-purple-600 font-semibold underline cursor-pointer">
                Daftar
              </span>
            </p>
          ) : (
            <p className="text-center mt-3 text-sm text-gray-700" onClick={()=>setMode('login')}>
              Sudah punya akun?{" "}
              <span className="text-purple-600 font-semibold underline cursor-pointer">
                Masuk
              </span>
            </p>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
