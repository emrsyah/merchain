import { Icon } from "@iconify/react";
import React, { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../../atoms/userAtom";
import NavbarAdmin from "../../../components/NavbarAdmin";
import imgPlaceholder from "../../../assets/imgPlaceholder.svg";
import ProductSwitch from "../../../components/ProductSwitch";

function NewProduct() {
  const user = useRecoilValue(userState);
  const imgRef = useRef("");
  const [selectedImage, setSelectedImage] = useState();
  const [enabled, setEnabled] = useState(true)

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      // console.log(e.target.files[0]);
    }
  };

  const submitHandler = (ev) => {
    ev.preventDefault();
  };

  return (
    <>
      <Helmet>
        <title>Create Product | Merchain</title>
      </Helmet>
      <NavbarAdmin user={user} />

      <div className="layoutContainer">
        <Link
          to="/app/products"
          className="py-1 px-3 text-sm my-3 bg-white border-[1px] border-gray-300 hover:bg-gray-50 rounded font-medium flex items-center w-fit gap-1"
        >
          <Icon icon="akar-icons:chevron-left" className="inline" />
          Kembali
        </Link>

        <div className="contentContainer">
          <h1 className="pageName mb-6">Produk Baru</h1>
          <form className="flex flex-col gap-4" onSubmit={submitHandler}>
            <div className="flex flex-col">
            <label htmlFor="switch" className="font-medium">Produk Aktif</label>
            <ProductSwitch enabled={enabled} setEnabled={setEnabled} />
            </div>
            <div>
              <label htmlFor="nama" className="font-medium">
                Nama Produk<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="nama"
                className="addInput"
                placeholder="Sunflower Bouquet"
                required
              />
            </div>
            <div>
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
            </div>
            <div>
              <label htmlFor="harga" className="font-medium">
                Harga (Rupiah)<span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                id="harga"
                className="addInput"
                placeholder="Harga"
                required
                min={0}
              />
              <p className="text-xs font-medium text-purple-500">
                perhatian jangan menggunakan titik (.)
              </p>
            </div>
            <div>
              <label htmlFor="gambar" className="font-medium">
                Gambar<span className="text-red-600">*</span>
              </label>
              <div
                className="border-gray-300 border-[1px] w-fit hover:border-purple-600 p-4 items-center my-2 rounded flex flex-col gap-4 cursor-pointer"
                onClick={() => imgRef.current.click()}
              >
                {selectedImage ? (
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    className="w-80"
                    alt="Thumb"
                  />
                ) : (
                  <>
                    <img
                      src={imgPlaceholder}
                      alt="img placeholder"
                      className="w-32"
                    />
                    <h5 className="text-sm font-medium">Tambah Gambar</h5>
                  </>
                )}
              </div>
              <input
                type="file"
                name="gambar"
                accept="image/*"
                className="opacity-0"
                ref={imgRef}
                onChange={imageChange}
                // required
              />
              <div className="my-1 justify-end flex gap-3 md:">
                <Link to="/app/products" className="rounded py-3 hover:bg-purple-100 font-semibold text-sm px-6 text-purple-600 border-2 border-purple-600">
                  Batalkan
                </Link>
                <button type="submit" className="bg-purple-600 py-3 hover:bg-purple-700 px-6 font-semibold text-white rounded text-sm">
                  Simpan Produk
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default NewProduct;
