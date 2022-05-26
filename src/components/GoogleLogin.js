import { Icon } from "@iconify/react";
import React from "react";

function GoogleLogin() {
  return (
    <div className="border-2 border-gray-300 gap-4 rounded-full p-3 font-semibold items-center flex justify-center transition-all duration-300 hover:border-purple-600 cursor-pointer">
      <Icon icon="flat-color-icons:google" width="28" />
      <p>Lanjutkan dengan Google</p>
    </div>
  );
}

export default GoogleLogin;
