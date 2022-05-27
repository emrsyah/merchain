import React from "react";

function VerificationReminder() {
  return (
    <div className="my-3 bg-purple-100 border-2 border-purple-600 rounded-md p-4 font-medium">
      <p>
        Silahkan konfirmasi email terlebih dahulu untuk mengakses toko.{" "}
        <span className="font-semibold text-purple-600 underline cursor-pointer">
          Kirim Ulang
        </span>
      </p>
    </div>
  );
}

export default VerificationReminder;
