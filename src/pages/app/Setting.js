import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../atoms/userAtom";
import NavbarAdmin from "../../components/NavbarAdmin";
import VerificationReminder from "../../components/VerificationReminder";

function Setting() {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const [store, setStore] = useOutletContext();
  const [loading, setLoading] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [storeName, setStoreName] = useState(store?.storeName);
  const [storeBio, setStoreBio] = useState(store?.storeBio);
  const [storeTimeBuka, setStoreTimeBuka] = useState(store?.storeTime[0]);
  const [storeTimeTutup, setStoreTimeTutup] = useState(store?.storeTime[1]);

  const changeHandler = () => {
    if (isChange === true) return;
    console.log("changee");
    setIsChange(true);
  };

  const submitHandler = async (ev) => {
    ev.preventDefault();
    setLoading(true)
  };

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
            <form
              className="flex flex-col gap-4"
              onSubmit={submitHandler}
              onChange={changeHandler}
            >
              <div>
                <label htmlFor="nama" className="font-medium">
                  Nama Toko
                </label>
                <div className="addInput p-0 pl-3 items-center">
                  <p>merchain.com/</p>
                  <input
                    type="text"
                    id="nama"
                    // className="addInput"
                    placeholder="John Doe"
                    required
                    className="py-2 outline-none"
                    value={storeName}
                    onChange={(ev) => setStoreName(ev.target.value)}
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
                    value={storeTimeBuka}
                    onChange={(ev) => setStoreTimeBuka(ev.target.value)}
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
                    value={storeTimeTutup}
                    onChange={(ev) => setStoreTimeTutup(ev.target.value)}
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
                  disabled={loading || !isChange}
                  className={`bg-purple-600 py-3 hover:bg-purple-700 px-6 font-semibold text-white rounded text-sm ${
                    (loading || !isChange) && "opacity-75 hover:bg-purple-600"
                  }`}
                >
                  {!loading ? <>Simpan Perubahan</> : <>Tunggu Sebentar</>}
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
