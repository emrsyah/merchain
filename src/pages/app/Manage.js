import { Icon } from "@iconify/react";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link, useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../atoms/userAtom";
import NavbarAdmin from "../../components/NavbarAdmin";
import VerificationReminder from "../../components/VerificationReminder";
import { toast } from "react-toastify";

function Manage() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(()=>{
    // if check kalo dia di path "/app" doang bukan di  "app/home"
    if(!location.pathname.includes("/home")) navigate('/app/home')
  },[])

  const [store, setStore] = useOutletContext();
  const user = useRecoilValue(userState);
  return (
    <>
      <Helmet>
        <title>Home | Merchain</title>
      </Helmet>

      <NavbarAdmin user={user} />

      <div className="h-[120vh] layoutContainer">
        <h1 className="pageName">Home</h1>

        {!user.verified && <VerificationReminder />}

        {/* Akses Cepat */}
        <div className="bg-white my-3 rounded-lg p-4 shadow">
          <div className="flex items-start justify-between">
            {/* Bagian Kiri Atas */}
            <div className="md:flex-row flex flex-col items-start md:items-center gap-3">
              <img src={store.profileImg} alt="" className="w-16" />
              <div>
                <h5 className="font-semibold text-xl">
                  {store.storeName} Store
                </h5>
                <CopyToClipboard
                  text={`https://merchain.com/${store.storeName}}`}
                  className="cursor-pointer"
                  onCopy={() => toast.success("Copied!")}
                >
                  <span  >
                    <p className="opacity-75 flex gap-2 items-center">
                      merchain.com/{store.storeName}
                      <Icon
                        icon="fluent:copy-24-regular"
                        width="20"
                        className="text-purple-600 hover:scale-110 transition-all duration-75 ease-out cursor-pointer"
                      />
                    </p>
                  </span>
                </CopyToClipboard>
              </div>
            </div>

            {/* Bagian Kanan Atas */}
            <div className="flex items-start gap-4">
              <button className="font-medium items-center text-sm  hover:bg-gray-200 flex gap-2 py-2 px-4 bg-gray-100 rounded-md">
                <Icon icon="clarity:eye-line" width="22" />
                <p className="hidden sm:inline">Preview Toko</p>
              </button>
              {/* <button className="text-sm font-medium hover:bg-gray-200 py-2 px-4 bg-gray-100 rounded-md">Edit Profile</button> */}
              <Link
                to="/app/settings"
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                <Icon icon="carbon:settings" width="22" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bio & Jam */}
        <div className="items-center bg-white p-4 rounded shadow">
          <h5 className="md:text-xl text-lg font-semibold">Tentang Toko 📢</h5>
          <p className="mt-2  rounded w-fit text-sm font-medium">
            Jam Buka:{" "}
            {store.storeTime?.length === 2 ? (
              <>
                {store.storeTime[0]} - {store.storeTime[1]}
              </>
            ) : (
              "Belum Ada Data"
            )}
          </p>
          <p className="text-sm leading-tight opacity-75 my-1">
            {store.storeBio ? store.storeBio : "Belum Ada Bio"}
          </p>
        </div>
      </div>
    </>
  );
}

export default Manage;
