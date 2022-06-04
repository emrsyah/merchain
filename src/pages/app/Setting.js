import React, { useEffect, useRef, useState } from "react";
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
  const imgRef = useRef("");
  const [storeName, setStoreName] = useState(store?.storeName);
  const [storeImg, setStoreImg] = useState(store?.profileImg);
  const [changedImg, setChangedImg] = useState();
  const [storeBio, setStoreBio] = useState(store?.storeBio);
  const [storeTimeBuka, setStoreTimeBuka] = useState(store?.storeTime[0]);
  const [storeTimeTutup, setStoreTimeTutup] = useState(store?.storeTime[1]);

  useEffect(() => {
    console.log(store);
  }, []);

  const changeHandler = () => {
    if (isChange === true) return;
    setIsChange(true);
  };

  const changeImgHandler = (e) => {
    console.log("first");
    if (e.target.files && e.target.files.length > 0) {
      setChangedImg(e.target.files[0]);
    }
    return false;
  };

  const submitHandler = async (ev) => {
    ev.preventDefault();
    console.log("submitted");
    setLoading(true);
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
              <div className="mt-3">
                <label htmlFor="nama" className="font-semibold">
                  Foto
                </label>
                <div className="flex items-center gap-4">
                  {!changedImg ? (
                    <img
                      src={storeImg}
                      className="w-20 h-20 p-1 my-2 border-purple-800 border-2 rounded-full"
                      alt="foto profile"
                    />
                  ) : (
                    <img
                      src={URL.createObjectURL(changedImg)}
                      className="object-cover w-20 h-20 p-1 my-2 border-purple-800 border-2 rounded-full"
                      alt="foto profile"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => imgRef.current.click()}
                    className="text-sm p-2 hover:bg-purple-300 bg-purple-200 rounded font-medium"
                  >
                    Unggah Foto
                  </button>
                  {/* Ref Img */}
                  <input
                    type="file"
                    accept="image/*"
                    ref={imgRef}
                    className="opacity-0"
                    alt=""
                    onChange={changeImgHandler}
                  />
                </div>
              </div>
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
                  onChange={(ev) => setStoreBio(ev.target.value)}
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
              <div className="my-1 justify-end flex">
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
