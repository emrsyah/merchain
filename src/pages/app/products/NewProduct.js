import { Icon } from "@iconify/react";
import React, { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../../atoms/userAtom";
import NavbarAdmin from "../../../components/NavbarAdmin";
import imgPlaceholder from "../../../assets/imgPlaceholder.svg";

function NewProduct() {
  const user = useRecoilValue(userState);
  const imgRef = useRef("");
  const [selectedImage, setSelectedImage] = useState();

  const imageChange = (e) => {
    console.log("halo");
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
          className="py-1 px-3 text-sm my-3 bg-gray-200 hover:bg-gray-300 rounded font-medium flex items-center w-fit gap-1"
        >
          <Icon icon="akar-icons:chevron-left" className="inline" />
          Kembali
        </Link>

        <div className="contentContainer">
          <h1 className="pageName mb-6">Produk Baru</h1>
          <form className="flex flex-col gap-4" onSubmit={submitHandler}>
            <div>
              <label for="nama" className="font-medium">
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
              <label for="desc" className="font-medium">
                Deskripsi<span className="text-red-600">*</span>
              </label>
              <textarea
                // type="text"
                id="desc"
                className="addInput"
                placeholder="Deskripsi"
                required
              />
            </div>
            <div>
              <label for="harga" className="font-medium">
                Harga (Rupiah)<span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                id="harga"
                className="addInput"
                placeholder="Harga"
                required
              />
              <p className="text-xs font-medium text-purple-500">
                tolong jangan menggunakan titik (.)
              </p>
            </div>
            <div>
              <label for="gambar" className="font-medium">
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
                required
              />
              <div className="my-1 justify-end flex gap-3">
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
