import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useSearchParams } from "react-router-dom";
import NavbarStore from "../components/NavbarStore";
import { auth, firestoreDb } from "../firebase";
import spinner from "../assets/spinner.gif";
import sadFace from "../assets/sadFace.svg";
import OrderStatusItem from "../components/OrderStatusItem";
import { onAuthStateChanged } from "firebase/auth";

function OrderStatus() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [orderId, setOrderId] = useState(
    searchParams.get("order_id") ? searchParams.get("order_id") : ""
  );
  const navigate = useNavigate();
  // const user = useRecoilValue(userCustomer);
  const [user, setUser] = useState();
  const [orders, setOrders] = useState();
  const [status, setStatus] = useState("loading");

  const getOrders = (uid) => {
    const unsubscribe = onSnapshot(
      query(collection(firestoreDb, "orders"), where("customerId", "==", uid), orderBy('createdAt', "desc")),
      (snapshot) => {
        if (snapshot.docs.length > 0) {
          setOrders(snapshot.docs);
          setStatus("all order");
        } else {
          setStatus("no data");
          return;
        }
      }
    );
    return unsubscribe;
  };

  useEffect(() => {
    if (orderId) {
      navigate(orderId);
    }
  }, [orderId]);

  useEffect(() => {
    let userNow = null;
    try {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          userNow = {
            uid: user.uid,
            email: user.email,
            nomor: user.phoneNumber ? user.phoneNumber : "",
          };
        } else {
          navigate("/");
          return;
        }
        setUser(userNow);
        getOrders(user.uid);
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
        <h5 className="font-semibold text-xl">Status Pesanan</h5>
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
                  {status === "all order" && (
                    <>
                      {orders.map((order) => (
                        <OrderStatusItem
                          key={order.id}
                          storeName={order.data().storeName}
                          createdAt={order.data().createdAt}
                          orderId={order.data().orderId}
                          total={order.data().total}
                        />
                      ))}
                    </>
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

export default OrderStatus;
