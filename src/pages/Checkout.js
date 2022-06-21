import React from "react";
import { useEffect } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import useScript from "../hooks/useScript";
import { useRecoilValue } from "recoil";
import { cartState, cartTotal } from "../atoms/cartAtom";
import rupiahConverter from "../helpers/rupiahConverter";
import {toast} from 'react-toastify'

function Checkout() {
  const clientKey = process.env.MIDTRANS_CLIENT_KEY;
  const endpoint = "https://merchain-api-production.up.railway.app/charge";
  const navigate = useNavigate();
  useScript("https://app.sandbox.midtrans.com/snap/snap.js", clientKey);
  const cart = useRecoilValue(cartState);
  const total = useRecoilValue(cartTotal);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      navigate("/");
    }
  }, []);

  const submitHandler = async (data) => {
    const id = toast.loading("Tolong tunggu...")
    try {
      const cartUbah = cart.map((c) => {
        return {
          id: c.id,
          price: c.product.price,
          quantity: c.quantity,
          name: c.product.name,
        };
      });
      const bodyRequest = {
        customers: {
          email: data.email,
          firstname: data.nama1,
          lastname: data.nama2,
          phone: data.nomor.toString(),
        },
        items: cartUbah,
      };
      const res = await fetch(endpoint, {
        method: "post",
        body: JSON.stringify(bodyRequest),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resJson = await res.json();
      toast.update(id, { render: "Berhasil, Silahkan Bayar", type: "success", isLoading: false, autoClose: 3000 });
      console.log(resJson)
      window.snap.pay(resJson.token)
    } catch (err) {
      console.error(err);
      toast.update(id, { render: "Terjadi Kesalahan", type: "error", isLoading: false, autoClose: 3000 });
    }
  };

  return (
    <>
      <Helmet>
        <title>Checkout - Merchain</title>
      </Helmet>
      <div className="max-w-5xl px-4 mx-auto flex flex-col my-12 gap-2 md:gap-4 poppins">
        <div
          className="flex items-center gap-1 text-purple-600 font-medium cursor-pointer w-fit"
          onClick={() => navigate(-1)}
        >
          <Icon icon="ci:chevron-left" width={20} />
          <p>Kembali</p>
        </div>
        <div className="grid grid-cols-11 gap-4">
          <div className="col-span-7  p-3 border-gray-300 border-[1px] rounded">
            <h5 className="font-medium text-lg">Informasi Pengiriman</h5>
            <form
              onSubmit={handleSubmit(submitHandler)}
              className="my-4 flex flex-col gap-4"
            >
              <div className="flex flex-col gap-[2px]">
                <p className="text-gray-700 text-[15px] font-medium">
                  Email<span className="text-red-600">*</span>
                </p>
                <input
                  type="text"
                  {...register("email", { required: true })}
                  className="checkoutInput"
                  placeholder="user@gmail.com"
                />
                {errors.email && (
                  <span className="text-[13px] ml-1 text-red-500">
                    email harus diisi
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-[2px]">
                <p className="text-gray-700 text-[15px] font-medium">
                  Nama Depan<span className="text-red-600">*</span>
                </p>
                <input
                  type="text"
                  {...register("nama1", { required: true })}
                  className="checkoutInput"
                  placeholder="firstname"
                />
                {errors.nama1 && (
                  <span className="text-[13px] ml-1 text-red-500">
                    nama depan harus diisi
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-[2px]">
                <p className="text-gray-700 text-[15px] font-medium">
                  Nama Belakang<span className="text-red-600">*</span>
                </p>
                <input
                  type="text"
                  {...register("nama2", { required: true })}
                  className="checkoutInput"
                  placeholder="lastname"
                />
                {errors.nama2 && (
                  <span className="text-[13px] ml-1 text-red-500">
                    nama belakang harus diisi
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-[2px]">
                <p className="text-gray-700 text-[15px] font-medium">
                  Nomor Telepon<span className="text-red-600">*</span>
                </p>
                <input
                  type="number"
                  {...register("nomor", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  className="checkoutInput"
                  placeholder="08xxxxxxxxxx"
                />
                {errors.nomor && (
                  <span className="text-[13px] ml-1 text-red-500">
                    nomor telepon harus diisi
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-[2px]">
                <p className="text-gray-700 text-[15px] font-medium">
                  Detail Alamat<span className="text-red-600">*</span>
                </p>
                <textarea
                  type="text"
                  {...register("alamat", { required: true })}
                  className="checkoutInput"
                  placeholder="alamat pengiriman"
                />
                {errors.alamat && (
                  <span className="text-[13px] ml-1 text-red-500">
                    alamat harus diisi
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 mt-3 text-sm">
                <div className="border-[1.5px] border-purple-600 text-purple-600 font-medium cursor-pointer py-2 px-6 rounded">
                  Batal
                </div>
                <button
                  type="submit"
                  className="border-[1.5px] border-purple-600 bg-purple-600 cursor-pointer hover:bg-purple-700 text-white font-medium py-2 px-6 rounded"
                >
                  Konfirmasi & Pesan
                </button>
              </div>
            </form>
          </div>

          <div className="col-span-4 h-fit  p-3 border-gray-300 border-[1px] rounded">
            <h5 className="font-medium text-lg">Ringkasan Pesanan</h5>
            <div className="flex flex-col gap-3 my-4">
              {cart.map((c) => (
                <div className="grid grid-cols-4">
                  <img
                    src={c.product.image}
                    alt="product img"
                    className="h-20 object-cover rounded-md w-16 col-span-1"
                  />
                  <div className="flex flex-col gap-[2px] col-span-3">
                    <p className="font-medium text-sm">{c.product.name}</p>
                    <p className="text-sm font-medium text-gray-600">
                      {rupiahConverter(c.quantity * c.product.price)}
                    </p>
                    <p className="text-sm text-gray-400">
                      Jumlah:{" "}
                      <span className="text-gray-900 font-medium">
                        {c.quantity}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between font-medium border-[1px] border-purple-600 bg-purple-200 text-purple-700 p-2 rounded">
              <h6>Total</h6>
              <h6>{rupiahConverter(total)}</h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
