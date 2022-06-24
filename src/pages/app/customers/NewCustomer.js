import { Icon } from "@iconify/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { userState } from "../../../atoms/userAtom";
import NavbarAdmin from "../../../components/NavbarAdmin";
import { firestoreDb } from "../../../firebase";

function NewCustomer() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [store, setStore] = useOutletContext();
  const [loading, setLoading] = useState(false);
  const user = useRecoilValue(userState);

  const submitHandler = async (data) => {
    setLoading(true);
    try {
      await addDoc(collection(firestoreDb, "customers"), {
        storeId: store.id,
        nama: data.nama,
        email: data.email,
        nomor: data.telepon,
        domisili: data.domisili,
        jumlahOrder: parseInt(data.jumlah),
        createdAt: serverTimestamp(),
      });
      toast.success("Data Berhasil Ditambahkan");
      navigate("/app/customers");
    } catch (err) {
      console.error(err);
      toast.error("Terjadi Kesalahan")
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Create Customer | Merchain</title>
      </Helmet>
      <NavbarAdmin user={user} />

      <div className="layoutContainer min-h-screen">
        <Link
          to="/app/customers"
          className="py-1 px-3 text-sm my-3 bg-white border-[1px] border-gray-300 hover:bg-gray-50 rounded font-medium flex items-center w-fit gap-1"
        >
          <Icon icon="akar-icons:chevron-left" className="inline" />
          Kembali
        </Link>

        <div className="contentContainer">
          <h1 className="pageName mb-6">Kustomer Baru</h1>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(submitHandler)}
          >
            <div>
              <label htmlFor="nama" className="font-medium">
                Nama<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="nama"
                className="addInput"
                placeholder="John Doe"
                {...register("nama", { required: true })}
              />
              {errors.nama && (
                <span className="text-[13px] ml-1 text-red-500">
                  nama harus diisi
                </span>
              )}
            </div>
            <div>
              <label htmlFor="email" className="font-medium">
                Email
              </label>
              <input
                type="text"
                id="email"
                className="addInput"
                placeholder="johndoe@gmail.com"
                {...register("email", { required: false })}
              />
            </div>
            <div>
              <label htmlFor="telepon" className="font-medium">
                Nomor Telepon
                {/* <span className="text-red-600">*</span> */}
              </label>
              <input
                type="tel"
                id="telepon"
                className="addInput"
                placeholder="+62"
                {...register("telepon", { required: false })}
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
                {...register("domisili", { required: false })}
              />
            </div>
            <div>
              <label htmlFor="jumlah" className="font-medium">
                Jumlah Order
              </label>
              <input
                type="number"
                id="jumlah"
                className="addInput"
                placeholder="3"
                {...register("jumlah", { required: false })}
              />
            </div>
            <div className="my-1 justify-end flex gap-3 md:">
              <button
                type="button"
                className={`batalkanBtn ${
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
                className={`simpanBtn ${
                  loading && "opacity-75 hover:bg-purple-600"
                }`}
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
