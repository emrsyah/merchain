import { Icon } from "@iconify/react";
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../../atoms/userAtom";
import NavbarAdmin from "../../../components/NavbarAdmin";

function NewCustomer() {
  const user = useRecoilValue(userState);

  const submitHandler = (ev) => {
    ev.preventDefault();
  };

  return (
    <>
      <Helmet>
        <title>Create Customer | Merchain</title>
      </Helmet>
      <NavbarAdmin user={user} />

      <div className="layoutContainer">
        <Link
          to="/app/customers"
          className="py-1 px-3 text-sm my-3 bg-white border-[1px] border-gray-300 hover:bg-gray-50 rounded font-medium flex items-center w-fit gap-1"
        >
          <Icon icon="akar-icons:chevron-left" className="inline" />
          Kembali
        </Link>

        <div className="contentContainer">
          <h1 className="pageName mb-6">Kustomer Baru</h1>
          <form className="flex flex-col gap-4" onSubmit={submitHandler}>
            <div>
              <label htmlFor="nama" className="font-medium">
                Nama<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="nama"
                className="addInput"
                placeholder="Nama"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="font-medium">
                Email
              </label>
              <input
                type="text"
                id="email"
                className="addInput"
                placeholder="customer@gmail.com"
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
            <div>
              <label htmlFor="telepon" className="font-medium">
                Nomor Telepon
                {/* <span className="text-red-600">*</span> */}
              </label>
              <input
                type="number"
                id="telepon"
                className="addInput"
                placeholder="+62"
                // required
              />
            </div>
            <div>
              <label htmlFor="domisili" className="font-medium">
                Domisili
              </label>
              <input
                type="text"
                id="domisili"
                className="addInput"
                placeholder="Kota Bandung, Jawa Barat"
              />
            </div>
            <div className="my-1 justify-end flex gap-3 md:">
              <Link
                to="/app/customers"
                className="rounded py-3 hover:bg-purple-100 font-semibold text-sm px-6 text-purple-600 border-2 border-purple-600"
              >
                Batalkan
              </Link>
              <button
                type="submit"
                className="bg-purple-600 py-3 hover:bg-purple-700 px-6 font-semibold text-white rounded text-sm"
              >
                Simpan Kustomer
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default NewCustomer;
