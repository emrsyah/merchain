import { Icon } from "@iconify/react";
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link, useOutletContext } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../atoms/userAtom";
import NavbarProfile from "../../components/NavbarProfile";
import VerificationReminder from "../../components/VerificationReminder";

function Manage() {
  const [store, setStore] = useOutletContext();
  const user = useRecoilValue(userState);
  console.log(store.profileImg);
  return (
    <>
      <nav className="hidden md:flex bg-white py-3 px-5 border-b-[1px] border-b-gray-300 items-center justify-between">
        <h5 className="font-medium text-lg">
          Selamat Malam {user.displayName}
        </h5>
        <div className="flex items-center gap-4">
          <Icon
            icon="clarity:notification-outline-badged"
            width="22"
            className="text-purple-600"
          />
          {/* <img src={user.profileImg} className="w-10 rounded-full" alt="" /> */}
          <NavbarProfile img={user.profileImg} />
        </div>
      </nav>
      <div className="h-[120vh] py-6 px-16">
        <Helmet>
          <title>Home | Merchain</title>
        </Helmet>
        <h1 className="font-semibold text-2xl">Home</h1>

        {!user.verified && <VerificationReminder />}

        {/* Akses Cepat */}
        <div className="bg-white my-3 rounded-lg p-4 shadow">
          {/* div atas */}
          <div className="flex items-start justify-between">
            {/* Bagian Kiri Atas */}
            <div className="flex items-center gap-3">
              <img src={store.profileImg} alt="" className="w-16" />
              <div>
                <h5 className="font-semibold text-xl">
                  {store.storeName.charAt(0).toUpperCase() +
                    store.storeName.slice(1)}{" "}
                  Store
                </h5>
                <div className="flex gap-2 items-center">
                  <p className="opacity-75">merchain.com/{store.storeName}</p>
                  <Icon
                    icon="fluent:copy-24-regular"
                    width="20"
                    className="text-purple-600 hover:scale-110 transition-all duration-75 ease-out cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Bagian Kanan Atas */}
            <div className="flex items-start gap-4">
              <button className="text-sm font-medium hover:bg-gray-200 flex gap-2 py-2 px-4 bg-gray-100 rounded-md">
                <Icon icon="clarity:eye-line" width="20" />
                Lihat Toko Saya
              </button>
              {/* <button className="text-sm font-medium hover:bg-gray-200 py-2 px-4 bg-gray-100 rounded-md">Edit Profile</button> */}
              <Link
                to="/app/settings"
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                <Icon icon="carbon:settings" width="20" />
              </Link>
            </div>
          </div>

          {/* div bawah */}
          <div></div>
        </div>
      </div>
    </>
  );
}

export default Manage;
