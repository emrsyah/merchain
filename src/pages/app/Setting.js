import React, { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { v4 as uuidv4 } from "uuid";
import { Helmet } from "react-helmet-async";
import { useOutletContext } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../atoms/userAtom";
import NavbarAdmin from "../../components/NavbarAdmin";
import VerificationReminder from "../../components/VerificationReminder";
import { useForm } from "react-hook-form";
import checkStoreNameAvailability from "../../helpers/checkStoreNameAvailability";
import { doc, updateDoc } from "firebase/firestore";
import { firestoreDb } from "../../firebase";
import setFirestoreStorage from "../../helpers/setFirestoreStorage";
import { toast } from "react-toastify";
import ColorThemeRadio from "../../components/ColorThemeRadio";

function Setting() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const user = useRecoilValue(userState);
  const [store, setStore] = useOutletContext();
  const [loading, setLoading] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const imgRef = useRef("");
  const [changedImg, setChangedImg] = useState(null);
  const [nameUsed, setNameUsed] = useState(false);
  const [storeBuka, setStoreBuka] = useState(
    store.storeTime ? store.storeTime[0] : "00:00"
  );
  const [storeTutup, setStoreTutup] = useState(
    store.storeTime ? store.storeTime[1] : "00:00"
  );
  const [color, setColor] = useState(
    store.colorTheme ? store.colorTheme : "purple"
  );

  const changeHandler = () => {
    if (isChange === true) return;
    setIsChange(true);
  };

  const changeImgHandler = (e) => {
    // console.log(changedImg)
    if (e.target.files && e.target.files.length > 0) {
      setChangedImg(e.target.files[0]);
    }
    return false;
  };

  const submitHandler = async (data) => {
    setLoading(true);
    const id = toast.loading("Tolong tunggu...");
    try {
      // If Check misalnya dia ganti nama
      if (data.storeName.toLowerCase() !== store.storeNameLowercase) {
        const isAvailable = await checkStoreNameAvailability(data.storeName);
        if (isAvailable) {
          setNameUsed(true);
          return;
        }
        setNameUsed(false);
      }

      // Update img field if change
      if (changedImg) {
        const imgUrl = await setFirestoreStorage(
          changedImg,
          uuidv4(),
          "stores-pofile"
        );
        // console.log("new img = " + imgUrl)
        await updateDoc(doc(firestoreDb, "stores", store.id), {
          profileImg: imgUrl,
        });
      }

      // Update Doc
      await updateDoc(doc(firestoreDb, "stores", store.id), {
        storeName: data.storeName,
        storeBio: data.storeBio,
        storeTime: [data.storeTimeBuka, data.storeTimeTutup],
        links: {
          whatsapp: data.whatsapp,
          telegram: data.telegram,
          tokopedia: data.tokopedia,
          shopee: data.shopee,
          facebook: data.facebook,
          instagram: data.instagram,
        },
        colorTheme: color,
      });
      toast.update(id, {
        render: "Data Tersimpan!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } catch (err) {
      console.error(err);
      toast.update(id, {
        render: "Terjadi Error",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
      setIsChange(false);
      setChangedImg(null);
    }
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
              onSubmit={handleSubmit(submitHandler)}
              onChange={changeHandler}
            >
              {/* Image Input */}
              <div className="mt-3">
                <label htmlFor="nama" className="font-semibold">
                  Foto
                </label>
                <div className="flex items-center gap-4">
                  {!changedImg ? (
                    <img
                      src={store?.profileImg}
                      className="w-20 h-20 object-cover p-1 my-2 border-purple-700 border-2 rounded-full"
                      alt="foto profile"
                    />
                  ) : (
                    <img
                      src={URL.createObjectURL(changedImg)}
                      className="object-cover w-20 h-20 p-1 my-2 border-purple-700 border-2 rounded-full"
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
                    className="hidden"
                    alt=""
                    onChange={changeImgHandler}
                  />
                </div>
              </div>

              {/* Name Input */}
              <div>
                <label htmlFor="nama" className="font-medium">
                  Nama Toko
                </label>
                <div className="addInput mb-0 p-0 pl-3 items-center">
                  <p>merchain.com/</p>
                  <input
                    type="text"
                    id="nama"
                    placeholder="John Doe"
                    className="py-2 outline-none w-full"
                    defaultValue={store?.storeName}
                    {...register("storeName", { required: true })}
                  />
                </div>
                {errors.storeName && (
                  <span className="text-[13px] ml-1 text-red-500">
                    nama harus diisi
                  </span>
                )}
                {nameUsed && (
                  <span className="text-[13px] ml-1 text-red-500">
                    nama sudah terpakai, silahkan ganti
                  </span>
                )}
              </div>

              {/* Desc Input */}
              <div>
                <label htmlFor="email" className="font-medium">
                  Tentang Toko
                </label>
                <textarea
                  id="email"
                  className="addInput"
                  placeholder="Ceritakan toko kamu"
                  defaultValue={store?.storeBio}
                  {...register("storeBio")}
                />
              </div>

              {/* Jam Input */}
              <div className="flex sm:flex-row flex-col items-center gap-6">
                <div className="w-full">
                  <label htmlFor="telepon" className="font-medium">
                    Waktu Buka
                  </label>
                  <input
                    type="time"
                    id="telepon"
                    className="addInput"
                    placeholder="+62"
                    defaultValue={storeBuka}
                    {...register("storeTimeBuka")}
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
                    defaultValue={storeTutup}
                    {...register("storeTimeTutup")}
                  />
                </div>
              </div>

              {/* Link2 Container */}
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-6 gap-y-2">
                <h5 className="md:col-span-2 font-semibold mb-2 text-lg">
                  Hubungkan dengan
                </h5>

                {/* Wa */}
                <div>
                  <label
                    htmlFor="whatsapp"
                    className="font-medium text-sm flex items-center gap-2"
                  >
                    <Icon icon="logos:whatsapp" width="21" />
                    Whatsapp
                    {/* <span className="text-red-600">*</span> */}
                  </label>
                  <input
                    type="tel"
                    id="whatsapp"
                    defaultValue={store?.links?.whatsapp || ""}
                    {...register("whatsapp")}
                    className="addInput"
                    placeholder="+62"
                  />
                </div>

                {/* Telegram */}
                <div>
                  <label
                    htmlFor="telegram"
                    className="font-medium text-sm flex items-center gap-2"
                  >
                    <Icon icon="logos:telegram" width="21" />
                    Telegram
                    {/* <span className="text-red-600">*</span> */}
                  </label>
                  <input
                    type="tel"
                    id="telegram"
                    className="addInput"
                    placeholder="+62"
                    defaultValue={store?.links?.telegram || ""}
                    {...register("telegram")}
                  />
                </div>

                {/* tokped */}
                <div>
                  <label
                    htmlFor="tokopedia"
                    className="font-medium text-sm flex items-center gap-2"
                  >
                    <Icon
                      icon="arcticons:tokopedia"
                      width="21"
                      className="text-green-600"
                    />
                    Tokopedia
                    {/* <span className="text-red-600">*</span> */}
                  </label>
                  <input
                    type="text"
                    id="tokopedia"
                    className="addInput"
                    placeholder="https://"
                    defaultValue={store?.links?.tokopedia || ""}
                    {...register("tokopedia")}
                  />
                </div>

                {/* shopee */}
                <div>
                  <label
                    htmlFor="shopee"
                    className="font-medium text-sm flex items-center gap-2"
                  >
                    <Icon
                      icon="arcticons:shopee"
                      width="21"
                      className="text-orange-600"
                    />
                    Shopee
                    {/* <span className="text-red-600">*</span> */}
                  </label>
                  <input
                    type="text"
                    id="shopee"
                    className="addInput"
                    placeholder="https://"
                    defaultValue={store?.links?.shopee || ""}
                    {...register("shopee")}
                  />
                </div>

                {/* fb */}
                <div>
                  <label
                    htmlFor="facebook"
                    className="font-medium text-sm flex items-center gap-2"
                  >
                    <Icon
                      icon="akar-icons:facebook-fill"
                      width="21"
                      className="text-blue-600"
                    />
                    Facebook
                    {/* <span className="text-red-600">*</span> */}
                  </label>
                  <input
                    type="text"
                    id="facebook"
                    className="addInput"
                    placeholder="https://"
                    defaultValue={store?.links?.facebook || ""}
                    {...register("facebook")}
                  />
                </div>

                {/* ig */}
                <div>
                  <label
                    htmlFor="instagram"
                    className="font-medium text-sm flex items-center gap-2"
                  >
                    <Icon
                      icon="akar-icons:instagram-fill"
                      width="21"
                      className="text-pink-600"
                    />
                    Instagram
                    {/* <span className="text-red-600">*</span> */}
                  </label>
                  <input
                    type="text"
                    id="instagram"
                    className="addInput"
                    placeholder="https://"
                    defaultValue={store?.links?.instagram || ""}
                    {...register("instagram")}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="colorpick" className="font-medium">
                  Pilih tema untuk toko
                </label>
                {/* <SketchPicker
                  color={color}
                  id="colorpick"
                  onChangeComplete={(colorPicked) => setColor(colorPicked.hex)}
                  onChange={()=>setIsChange(true)}
                /> */}
                <div>
                  <ColorThemeRadio color={color} setColor={setColor} />
                </div>
              </div>

              <div className="my-1 justify-end flex">
                <button
                  type="submit"
                  disabled={loading || !isChange}
                  className={`simpanBtn ${
                    (loading || !isChange) && "opacity-75 hover:bg-purple-600"
                  }`}
                >
                  {!loading ? <>Simpan Perubahan</> : <>Menyimpan...</>}
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
