import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartCount, cartState, cartTotal } from "../atoms/cartAtom";
import rupiahConverter from "../helpers/rupiahConverter";
import { toast } from "react-toastify";
import { userCustomer } from "../atoms/userCustomer";
import { storeNameAtom } from "../atoms/storeName";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  increment,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestoreDb } from "../firebase";
import { storeColor } from "../atoms/storeColor";
import { useState } from "react";

function Checkout() {
  const clientKey = process.env.MIDTRANS_CLIENT_KEY;
  const endpoint = "https://merchain-api-production.up.railway.app/charge";
  const color = useRecoilValue(storeColor);
  const navigate = useNavigate();
  // useScript("https://app.sandbox.midtrans.com/snap/snap.js", clientKey);
  const [cart, setCart] = useRecoilState(cartState);
  const total = useRecoilValue(cartTotal);
  const count = useRecoilValue(cartCount);
  const user = useRecoilValue(userCustomer);
  const storeState = useRecoilValue(storeNameAtom);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = clientKey;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    if (!cart) {
      navigate("/");
    }
  }, [cart]);

  const addOrderFirebase = async (orderId, customerData) => {
    const docRef = await addDoc(collection(firestoreDb, "orders"), {
      storeId: storeState.id,
      storeName: storeState.name,
      orderId: "order-id-" + orderId,
      total: total,
      customerId: user.uid,
      products: cart,
      status: "",
      customer: customerData,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  };

  const addCustomerFirebase = async (jumlah, customer) => {
    const customerRef = collection(firestoreDb, "customers");
    const q = query(customerRef, where("storeId", "==", storeState.id), where("email", "==", customer.email ));
    const snapshot = await getDocs(q)
    if(snapshot.docs[0]){
      const uptCustomerRef = doc(firestoreDb, "customers", snapshot.docs[0].id)
      await updateDoc(uptCustomerRef, {
        jumlahOrder: increment(parseInt(jumlah))
      })
      return
    }
    await addDoc(collection(firestoreDb, 'customers'),{
      storeId: storeState.id,
      nama: `${customer.firstname} ${customer.lastname}`,
      email: customer.email,
      nomor: customer.phone,
      domisili: customer.alamat,
      jumlahOrder: parseInt(jumlah),
    })
  };

  const submitHandler = async (data) => {
    const id = toast.loading("Tolong tunggu...");
    const orderId = uuidv4();
    setLoading(true);
    try {
      const cartUbah = cart.map((c) => {
        return {
          id: c.id,
          price: c.product.price,
          quantity: c.quantity,
          name: c.product.name,
        };
      });
      const customerData = {
        email: data.email,
        firstname: data.nama1,
        lastname: data.nama2,
        phone: data.nomor.toString(),
      };
      const bodyRequest = {
        customers: customerData,
        items: cartUbah,
        url: "order-status",
        order_id: orderId,
      };
      const res = await fetch(endpoint, {
        method: "post",
        body: JSON.stringify(bodyRequest),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resJson = await res.json();
      toast.update(id, {
        render: "Berhasil, Silahkan Bayar",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      const docId = addOrderFirebase(orderId, {
        ...customerData,
        alamat: data.alamat,
      });
      addCustomerFirebase(count ,{...customerData, alamat: data.alamat})
      window.snap.pay(resJson.token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          setCart([]);
          // alert("payment success!");
          console.log("payment success!");
          navigate(`/order-status/order-id-${orderId}`, { replace: true });
          // console.log(result);
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          setCart([]);
          // alert("wating your payment!");
          console.log("wating your payment!");
          navigate(`/order-status/order-id-${orderId}`, { replace: true });
          // console.log(result);
        },
        onError: function (result) {
          /* You may add your own implementation here */
          setCart([]);
          console.log("payment failed!");
          alert("payment failed!");
          navigate(`/order-status/order-id-${orderId}`, { replace: true });
          // console.log(result);
        },
        onClose: async function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
          await deleteDoc(doc(firestoreDb, "orders", docId));
        },
      });
    } catch (err) {
      console.error(err);
      toast.update(id, {
        render: "Terjadi Kesalahan",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Checkout - Merchain</title>
      </Helmet>
      <div className="containerStore">
        <div
          className={`flex items-center gap-1 ${
            color + "-txt"
          } font-medium cursor-pointer w-fit`}
          onClick={() => navigate(-1)}
        >
          <Icon icon="ci:chevron-left" width={20} />
          <p>Kembali</p>
        </div>
        <div className="md:grid flex flex-col-reverse md:grid-cols-11 gap-4">
          <div className="md:col-span-7  p-3 border-gray-300 border-[1px] rounded">
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
                  defaultValue={user?.email}
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
                  type="string"
                  {...register("nomor", {
                    required: true,
                  })}
                  defaultValue={user?.nomor}
                  className="checkoutInput"
                  placeholder="62xxxxxxxxxxx"
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
                <button
                  type="button"
                  disabled={loading}
                  className={`border-[1.5px] ${
                    color + "Nav"
                  } font-medium cursor-pointer py-2 px-6 rounded  ${
                    loading && "opacity-75"
                  } `}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`border-[1.5px] ${
                    color + "-btn"
                  } cursor-pointer  text-white font-medium py-2 px-6 rounded ${
                    loading && "opacity-75"
                  } `}
                >
                  Konfirmasi & Pesan
                </button>
              </div>
            </form>
          </div>

          <div className="md:col-span-4 h-fit  p-3 border-gray-300 border-[1px] rounded">
            <h5 className="font-medium text-lg">Ringkasan Pesanan</h5>
            <div className="flex flex-col gap-3 my-4">
              {cart.map((c) => (
                <div className="grid grid-cols-4" key={c.id}>
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
            <div
              className={`flex items-center justify-between font-medium border-[1px] ${
                color + "Nav"
              } ${color + "Low"} b p-2 rounded`}
            >
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
