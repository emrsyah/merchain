import { Dialog } from "@headlessui/react";
import { Icon } from "@iconify/react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { checkoutModal } from "../atoms/checkoutModalAtom";
import { auth, googleProvider } from "../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { userCustomer } from "../atoms/userCustomer";

export default function CheckoutModal() {
  const [isOpen, setIsOpen] = useRecoilState(checkoutModal);
  const [mode, setMode] = useState("login");
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userCustomer);

  const submitHandler = async (ev) => {
    ev.preventDefault();
    if (mode === "login") {
      const userCred = await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passRef.current.value
      );
      const user = userCred.user;
      let userNow = {
        uid: user.uid,
        email: user.email,
        nomor: user.phoneNumber ? user.phoneNumber : "",
        image: user.photoURL ? user.photoURL : null
      };
      setUser(userNow);
      toast.success("Berhasil Login");
      // navigate('/checkout')
      setIsOpen(false);
    } else {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passRef.current.value
      );
      const user = userCred.user;
      let userNow = {
        uid: user.uid,
        email: user.email,
        nomor: user.phoneNumber ? user.phoneNumber : "",
        image: user.photoURL ? user.photoURL : null
      };
      setUser(userNow);
      toast.success("Berhasil Membuat Akun");
      // navigate("/checkout")
      setIsOpen(false);
    }
  };

  const googleLoginHandler = async () => {
    const userCred = await signInWithPopup(auth, googleProvider);
    const user = userCred.user;
    let userNow = {
      uid: user.uid,
      email: user.email,
      nomor: user.phoneNumber ? user.phoneNumber : "",
      image: user.photoURL ? user.photoURL : null
    };
    setUser(userNow);
    toast.success("Berhasil Login");
    setIsOpen(false);
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
              ? "Silahkan login terlebih dahulu untuk melanjutkan belanjamu"
              : "Silahkan daftar dahulu untuk melanjutkan belanjamu"}
          </Dialog.Description>
          <form className="flex flex-col mt-3 gap-2" onSubmit={submitHandler}>
            <div>
              <p className="text-gray-700 text-[15px] font-medium">Email</p>
              <input
                type="text"
                className="border-[1px] w-full border-gray-400 rounded outline-none p-2 text-sm focus:border-purple-600"
                placeholder="user@gmail.com"
                ref={emailRef}
                required
              />
            </div>
            <div>
              <p className="text-gray-700 text-[15px] font-medium">Password</p>
              <input
                type="password"
                className="border-[1px] w-full border-gray-400 rounded outline-none p-2 text-sm focus:border-purple-600"
                placeholder="password"
                ref={passRef}
                required
                minLength={8}
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
            <p className="text-center mt-3 text-sm text-gray-700">
              Belum punya akun?{" "}
              <span
                className="text-purple-600 font-semibold underline cursor-pointer"
                onClick={() => setMode("daftar")}
              >
                Daftar
              </span>
            </p>
          ) : (
            <p className="text-center mt-3 text-sm text-gray-700">
              Sudah punya akun?{" "}
              <span
                className="text-purple-600 font-semibold underline cursor-pointer"
                onClick={() => setMode("login")}
              >
                Masuk
              </span>
            </p>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
