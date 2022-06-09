import { Icon } from "@iconify/react";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  Link,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../atoms/userAtom";
import NavbarAdmin from "../../components/NavbarAdmin";
import VerificationReminder from "../../components/VerificationReminder";
import { toast } from "react-toastify";
import StatistikAngka from "../../components/StatistikAngka";
import { SalesChart } from "../../components/SalesChart";
import TopProduct from "../../components/TopProduct";

const products = [
  {
    name: "Nike Air Jordan 1 Mid",
    sold: 23,
  },
  {
    name: "Swallow Indomaret",
    sold: 20,
  },
  {
    name: "A Bathing Ape",
    sold: 18,
  },
  {
    name: "Kaos Catur Bekasi",
    sold: 14,
  },
  {
    name: "Jaket Jamet Yoru",
    sold: 12,
  },
];

function Manage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [store, setStore] = useOutletContext();
  const user = useRecoilValue(userState);

  useEffect(() => {
    // if check kalo dia di path "/app" doang bukan di  "app/home"
    if (!location.pathname.includes("/home")) navigate("/app/home");
  }, []);

  return (
    <>
      <Helmet>
        <title>Home | Merchain</title>
      </Helmet>

      <NavbarAdmin user={user} />

      <div className="layoutContainer">
        {!user.verified && <VerificationReminder />}

        <h1 className="pageName">Home</h1>

        {/* Akses Cepat */}
        <div className="bg-white my-3 rounded-md p-4 shadow">
          <div className="flex items-start justify-between">
            {/* Bagian Kiri Atas */}
            <div className="md:flex-row flex flex-col items-start md:items-center gap-3">
              <img
                src={store.profileImg}
                alt=""
                className="w-16 h-16 rounded-full p-[2px] border-2 border-purple-600 object-cover"
              />
              <div>
                <h5 className="font-semibold text-xl">
                  {store.storeName} Store
                </h5>
                <CopyToClipboard
                  text={`https://merchain.com/${store.storeName}`}
                  className="cursor-pointer"
                  onCopy={() => toast.success("Copied!")}
                >
                  <span>
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
                <p className="hidden sm:inline">Kunjungi Toko</p>
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
        <div className="items-center bg-white p-4 rounded-md shadow">
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

        {/* Statistik Angka */}
        <div className="grid grid-cols-3 my-4 gap-5">
          <StatistikAngka
            title="Pengunjung Minggu Ini"
            value="120 Pengunjung"
            emoji={"emojiMata"}
          />
          <StatistikAngka
            title="Transaksi Berlangsung"
            value="8 Transaksi"
            emoji={"emojiCart"}
          />
          <StatistikAngka
            title="Total Produk"
            value="10 Produk"
            emoji={"emojiProduk"}
          />
        </div>

        {/* Sales Container */}
        <div className="md:grid flex flex-col md:grid-cols-6 gap-5">
          <div className="bg-white rounded shadow md:col-span-4">
            <h5 className="mx-4 pt-3 font-semibold text-xl">
              Laporan Penjualan 📈
            </h5>
            <div className="w-full lg:h-80 md:h-72 sm:h-56  rounded-md px-4 py-3 bg-white">
              <SalesChart className="w-full h-full" />
            </div>
          </div>

          {/* Terlaris container */}
          <div className="md:col-span-2 bg-white flex justify-between flex-col rounded shadow p-4">
            <div>
              <h5 className="font-semibold">Produk Terlaris 💰</h5>
              <div className="flex md:flex-col overflow-scroll scrollProduct gap-5 flex-auto my-4">
                {products.map((p, i) => (
                  <TopProduct
                    name={p.name}
                    sold={p.sold}
                    key={p.name}
                    index={i + 1}
                  />
                ))}
              </div>
            </div>
            <Link
              to={"/app/products"}
              className="batalkanBtn border-[1.6px] text-center"
            >
              Lihat Semua
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Manage;
