import { Icon } from "@iconify/react";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { userState } from "../../../atoms/userAtom";
import NavbarAdmin from "../../../components/NavbarAdmin";
import { firestoreDb } from "../../../firebase";
import dayjs from "dayjs";
import rupiahConverter from "../../../helpers/rupiahConverter";
import CartItem from "../../../components/CartItem";
import capitalizeFirstLetter from "../../../helpers/capitalizeFirstLetter";

function EditOrder() {
  let { id } = useParams();
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [store, setStore] = useOutletContext();
  const [loading, setLoading] = useState(false);
  const [firstLoading, setFirstLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const [isChange, setIsChange] = useState(false);
  const [midOrder, setMidOrder] = useState(null);

  const getOrderStatus = async (orderId) => {
    const url = `https://merchain-api-production.up.railway.app/det/${orderId}`;
    const res = await fetch(url);
    const resJson = await res.json();
    // setOrderStatus(resJson);
    console.log(resJson);
    setMidOrder(resJson);
    // setStatus("founded");
  };

  useEffect(() => {
    setFirstLoading(true);
    try {
      getOrder();
      setFirstLoading(false);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const getOrder = async () => {
    const docRef = doc(firestoreDb, "orders", id);
    const docSnap = await getDoc(docRef);

    // Handling error dan exception
    if (!docSnap.exists()) {
      console.log("Order doesnt exist");
      navigate("/app/orders");
      return;
    }
    if (docSnap.data().storeId !== store.id) {
      console.log("order doesnt exist");
      navigate("/app/orders");
      return;
    }
    console.log(docSnap.data());
    setOrder(docSnap.data());
    getOrderStatus(docSnap.data().orderId);
  };

  const changeHandler = () => {
    if (isChange === true) return;
    setIsChange(true);
  };

  const submitHandler = async (data) => {
    setLoading(true);
    try {
      await updateDoc(doc(firestoreDb, "orders", id), {
        storeId: store.id,
        nama: data.nama,
        email: data.email,
        nomor: data.telepon,
        domisili: data.domisili,
        jumlahOrder: data.jumlah,
      });
      toast.success("Data Berhasil Disimpan");
      // navigate("/app/Orders");
    } catch (err) {
      console.error(err);
      toast.error("Terjadi Kesalahan");
    } finally {
      setIsChange(false);
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Edit Order | Merchain</title>
      </Helmet>
      <NavbarAdmin user={user} />

      <div className="layoutContainer">
        <Link
          to="/app/orders"
          className="py-1 px-3 text-sm my-3 bg-white border-[1px] border-gray-300 hover:bg-gray-50 rounded font-medium flex items-center w-fit gap-1"
        >
          <Icon icon="akar-icons:chevron-left" className="inline" />
          Kembali
        </Link>

        {!firstLoading && order ? (
          <>
            <div className="contentContainer my-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-semibold text-lg">{order.orderId}</h1>
                  <p className="text-sm text-gray-700">
                    {dayjs(order.createdAt.toDate()).format(
                      "DD MMMM YYYY HH:mm"
                    )}
                  </p>
                </div>
                <div className="text-right">
                  <h6 className={`${order.status} text-lg font-medium`}>
                    {capitalizeFirstLetter(order.status)}
                  </h6>
                  <h6 className="font-semibold text-lg text-gray-900">
                    {rupiahConverter(order.total)}
                  </h6>
                  {order.status !== "settlement" &&
                    order.status !== "capture" && <h6 className="text-sm text-gray-600 font-medium">Expire di {dayjs(order.createdAt.toDate()).add(1, 'day').format("DD MMM HH:mm")}</h6>}
                </div>
              </div>
              <div className="flex items-center mt-4 gap-5 flex-wrap">
                <div className="border-r-[1px] border-gray-300 pr-3">
                  <h6 className="text-sm text-gray-500">Nama</h6>
                  <p className="text-sm">
                    {order.customer.firstname + " " + order.customer.lastname}
                  </p>
                </div>
                <div className="border-r-[1px] border-gray-300 pr-3">
                  <h6 className="text-sm text-gray-500">Email</h6>
                  <p className="text-sm">{order.customer.email}</p>
                </div>
                <div className="border-r-[1px] border-gray-300 pr-3">
                  <h6 className="text-sm text-gray-500">No. Telepon</h6>
                  <p className="text-sm">{order.customer.phone}</p>
                </div>
                <div className="border-r-[1px] border-gray-300 pr-3">
                  <h6 className="text-sm text-gray-500">Alamat</h6>
                  <p className="text-sm">{order.customer.alamat}</p>
                </div>
                <div className="border-r-[1px] border-gray-300 pr-3">
                  <h6 className="text-sm text-gray-500">Pembayaran</h6>
                  <p className="text-sm">
                    {!midOrder ? "Tunggu..." : midOrder?.payment_type?.split("_").join(" ")}
                  </p>
                </div>
              </div>
            </div>
            <div className="contentContainer my-4">
              <h5 className="font-semibold text-lg mb-2">Ringkasan Pesanan</h5>
              <div className="flex flex-col gap-4 p-3 border-t-[1px] border-gray-300">
                {order.products.map((p) => (
                  <CartItem
                    image={p.product.image}
                    name={p.product.name}
                    price={p.product.price}
                    quantity={p.quantity}
                    id={p.id}
                    key={p.id}
                    deleteHandler={null}
                    // color={color}
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <div>Harap Tunggu...</div>
        )}
      </div>
    </>
  );
}

export default EditOrder;
