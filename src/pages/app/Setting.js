import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../atoms/userAtom";
import NavbarAdmin from "../../components/NavbarAdmin";
import VerificationReminder from "../../components/VerificationReminder";

function Setting() {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const [loading, setLoading] = useState(false);
  const [store, setStore] = useOutletContext();
  const [storeName, setStoreName] = useState(store?.storeName);
  const [storeBio, setStoreBio] = useState(store?.storeBio);
  const [storeTime, setStoreTime] = useState("");
  const [storeTimeBuka, setStoreTimeBuka] = useState('');
  const [storeTimeTutup, setStoreTimeTutup] = useState('');

  const submitHandler = async (ev) => {
    ev.preventDefault();
  };

  useEffect(() => {
    console.log(store);
    // setStoreName(store?.storeName || "Getting Data")
    // setStoreBio(store?.storeBio || "Getting Data")
    // setStoreTime(store.storeTime || ["00:00", "00:00"])
    // setStoreTimeBuka(store?.storeTime[0] || "")
    // setStoreTimeTutup(store?.storeTime[1] || "")
  }, []);

  return (
    <>
      <Helmet>
        <title>Setting | Merchain</title>
      </Helmet>
      <NavbarAdmin user={user} />
      {store && (
        <div className="layoutContainer">
          {!user.verified && <VerificationReminder />}
          <h1 className="pageName">Settings</h1>
          <div className="contentContainer">
            <form className="flex flex-col gap-4" onSubmit={submitHandler}>
              <div>
                <label htmlFor="nama" className="font-medium">
                  Nama Toko
                </label>
                <div className="addInput">
                  <p>merchain.com/</p>
                  <input
                    type="text"
                    id="nama"
                    // className="addInput"
                    placeholder="John Doe"
                    required
                    value={storeName}
                    onChange={setStoreName}
                    // ref={namaRef}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="font-medium">
                  Tentang Toko
                </label>
                <textarea
                  // type="text"
                  id="email"
                  className="addInput"
                  placeholder="johndoe@gmail.com"
                  value={storeBio}
                  onChange={setStoreBio}
                  // ref={emailRef}
                  // required
                />
              </div>
              {/* <div>
              <label htmlFor="desc" className="font-medium">
                Deskripsi<span className="text-red-600">*</span>
              </label>
              <textarea
                // type="text"
                id="desc"
                className="addInput"
                placeholder="Deskripsi"
                required
                cols="30"
              />
            </div> */}
              <div className="flex items-center gap-6">
                <div className="w-full">
                  <label htmlFor="telepon" className="font-medium">
                    Waktu Buka
                    {/* <span className="text-red-600">*</span> */}
                  </label>
                  <input
                    type="time"
                    id="telepon"
                    className="addInput"
                    placeholder="+62"
                    value={storeTime[0] || "00:00"}
                    onChange={setStoreTimeBuka}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="telepon" className="font-medium">
                    Tutup
                    {/* <span className="text-red-600">*</span> */}
                  </label>
                  <input
                    type="time"
                    id="telepon"
                    className="addInput"
                    placeholder="+62"
                    value={storeTime[1] || "00:00"}
                    onChange={setStoreTimeTutup}
                  />
                </div>
              </div>
              <div className="my-1 justify-end flex gap-3 md:">
                <button
                  className={`rounded py-3 hover:bg-purple-100 font-semibold text-sm px-6 text-purple-600 border-2 border-purple-600 ${
                    loading && "opacity-75"
                  }`}
                  onClick={() => navigate("/app/customers")}
                  disabled={loading}
                >
                  Batalkan
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`bg-purple-600 py-3 hover:bg-purple-700 px-6 font-semibold text-white rounded text-sm ${
                    loading && "opacity-75 hover:bg-purple-600"
                  }`}
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Setting;
