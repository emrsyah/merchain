import { Icon } from "@iconify/react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import CartItem from "../components/CartItem";
import NavbarStore from "../components/NavbarStore";
import { auth, firestoreDb } from "../firebase";
import dayjs from "dayjs";
import rupiahConverter from "../helpers/rupiahConverter";
import spinner from "../assets/spinner.gif";
import sadFace from "../assets/sadFace.svg";
import capitalizeFirstLetter from "../helpers/capitalizeFirstLetter";
import TransactionDisclosure from "../components/TransactionDisclosure";
var isToday = require("dayjs/plugin/isToday");
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(isToday);
dayjs.extend(relativeTime);

function OrderStatusDetail() {
  const navigate = useNavigate();
  let { orderId } = useParams();
  const [status, setStatus] = useState("loading");
  const [order, setOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState("loading...");

  const getSpecificOrder = async (orderId, uid) => {
    setStatus("loading");
    const q = query(
      collection(firestoreDb, "orders"),
      where("orderId", "==", orderId),
      where("customerId", "==", uid)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs[0]) {
      const data = {
        ...querySnapshot.docs[0].data(),
        id: querySnapshot.docs[0].id,
      };
      return data;
    } else {
      setStatus("no data");
      return;
    }
  };

  const getOrderStatus = async () => {
    const url = `https://merchain-api-production.up.railway.app/det/${orderId}`;
    const res = await fetch(url);
    const resJson = await res.json();
    setOrderStatus(resJson);
    console.log(resJson);
    setStatus("founded");
  };

  useEffect(() => {
    let userNow = null;
    try {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          userNow = {
            uid: user.uid,
            email: user.email,
            nomor: user.phoneNumber ? user.phoneNumber : "",
            image: user.photoURL ? user.photoURL : null
          };
          getSpecificOrder(orderId, user.uid).then((data) => {
            if (data) {
              setOrder(data);
              getOrderStatus();
            }
          });
        } else {
          navigate("/");
          return;
        }
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Status Pesanan - Merchain</title>
      </Helmet>
      <NavbarStore />
      <div className="containerStore">
        <button
          className="px-3 py-1 text-left font-medium text-[15px] text-gray-600 rounded border-[1px] flex items-center gap-1 pl-1 border-gray-300 w-fit"
          onClick={() => navigate("/order-status")}
        >
          <Icon icon="ci:chevron-left" />
          <p>Kembali</p>
        </button>
        <h5 className="font-semibold text-xl">Detail Status Pesanan</h5>
        <div className="orderContainer">
          {status === "loading" ? (
            <div className="flex justify-center">
              <img className="h-28" src={spinner} alt="" />
            </div>
          ) : (
            <>
              {status === "no data" ? (
                <div className="flex justify-center items-center gap-2 flex-col">
                  <img loading="lazy" src={sadFace} alt="" className="h-32" />
                  <h5 className="font-medium text-lg">Data tidak ditemukan</h5>
                  <p className="text-sm text-gray-600 w-3/5 text-center">
                    Data yang anda cari tidak bisa ditemukan, silahkan hubungi
                    developer bila ada yang ingin ditanyakan
                  </p>
                </div>
              ) : (
                <>
                  {order && (
                    <div>
                      <div className="flex items-center justify-between p-3">
                        <div>
                          <h5 className="font-semibold text-lg">
                            {order.storeName}
                          </h5>
                          <h6 className="font-medium text-gray-600">
                            {order.orderId}
                          </h6>
                          <p className="text-gray-600 text-sm">
                            {dayjs(order.createdAt.toDate()).isToday()
                              ? "Hari Ini " +
                                dayjs(order.createdAt.toDate()).format("HH:mm")
                              : dayjs(order.createdAt.toDate()).format(
                                  "DD MMM YYYY"
                                )}
                          </p>
                        </div>
                        <div className="text-right">
                          <h5 className="font-semibold">
                            {rupiahConverter(order.total)}
                          </h5>
                          <h6
                            className={`font-medium ${orderStatus.transaction_status}`}
                          >
                            Status:{" "}
                            {capitalizeFirstLetter(
                              orderStatus.transaction_status
                            )}
                          </h6>
                          <p className="text-gray-600 font-medium">
                            Batas:{" "}
                            {orderStatus.transaction_status ===
                            ("settlement" || "capture")
                              ? "Sudah Dibayar"
                              : dayjs(orderStatus.transaction_time)
                                  .add(1, "day")
                                  .fromNow()}
                          </p>
                        </div>
                      </div>
                      <div className="p-2 mb-2">
                        <TransactionDisclosure informations={orderStatus} />
                      </div>
                      <div className="flex flex-col gap-4 p-4 border-t-[1px] border-gray-300">
                        {order.products.map((p) => (
                          <CartItem
                            image={p.product.image}
                            name={p.product.name}
                            price={p.product.price}
                            quantity={p.quantity}
                            id={p.id}
                            key={p.id}
                            deleteHandler={null}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default OrderStatusDetail;
