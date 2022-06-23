import React from "react";
import { toast } from "react-toastify";
import sendVerification from "../helpers/sendVerification";

function VerificationReminder() {
  const resendVerification = () =>{
    try{
      sendVerification()
      toast.success("Email verifikasi terkirim")
    } catch(err) {
      console.error(err)
    }
  }

  return (
    <div className="my-3 bg-purple-100 border-2 border-purple-600 rounded-md p-4 font-medium">
      <p>
        <span className="text-xl">😓</span> Silahkan konfirmasi email terlebih dahulu untuk mengakses toko.{" "}
        <span className="font-semibold text-purple-600 underline cursor-pointer" onClick={resendVerification}>
          Kirim Ulang
        </span>
      </p>
    </div>
  );
}

export default VerificationReminder;
