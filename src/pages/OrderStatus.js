import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userCustomer } from "../atoms/userCustomer";
import NavbarStore from "../components/NavbarStore";
import { auth, firestoreDb } from "../firebase";
import spinner from "../assets/spinner.gif";
import sadFace from "../assets/sadFace.svg";
import CartItem from "../components/CartItem";
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
  const [specificOrder, setSpecificOrder] = useState();
  const [status, setStatus] = useState("loading");

  const getOrders = (uid) => {
    const unsubscribe = onSnapshot(
      query(collection(firestoreDb, "orders"), where("customerId", "==", uid)),
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
      navigate(orderId)
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
        getOrders(user.uid)
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
                  <img src={sadFace} alt="" className="h-32" />
                  <h5 className="font-medium text-lg">Data tidak ditemukan</h5>
                  <p className="text-sm text-gray-600 w-3/5 text-center">
                    Data yang anda cari tidak bisa ditemukan, silahkan hubungi
                    developer bila ada yang ingin ditanyakan
                  </p>
                </div>
              ) : (
                <>
                  {status === "all order" ? (
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
                  ) : (
                    <>
                      {status === "founded" && (
                        <div>
                          <div className="flex items-center justify-between border-b-[1px] border-gray-300 p-3">
                            <div>
                              <h5 className="font-semibold text-lg">
                                Mindrown
                              </h5>
                              <h6 className="font-medium text-gray-600">
                                order-id-ajv214-anIybc2-jbac8
                              </h6>
                              <p className="text-gray-600 text-sm">
                                5 Juni 2022
                              </p>
                            </div>
                            <div className="text-right">
                              <h5 className="font-semibold">Rp 120.000</h5>
                              <h6 className="font-medium text-green-600">
                                Status: Dibayar
                              </h6>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 p-4">
                            <CartItem
                              image={
                                "https://www.lsflowerdesign.com.au/wp-content/uploads/2020/02/Sunflower-bouquet1-scaled.jpeg"
                              }
                              name={"Sedih Muka"}
                              price={120000}
                              quantity={2}
                              id={"acnjabcj"}
                              key={"adljcba"}
                              deleteHandler={null}
                              // color={color}
                            />
                          </div>
                        </div>
                      )}
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
