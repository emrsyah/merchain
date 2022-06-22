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

function OrderStatusDetail() {
  const navigate = useNavigate();
  let { orderId } = useParams();
  const [status, setStatus] = useState("loading");
  const [order, setOrder] = useState(null);

  const getSpecificOrder = async (orderId, uid) => {
    setStatus("loading");
    const q = query(
      collection(firestoreDb, "orders"),
      where("orderId", "==", orderId),
      where("customerId", "==", uid)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs[0]) {
      setOrder({
        ...querySnapshot.docs[0].data(),
        id: querySnapshot.docs[0].id,
      });
      console.log({
        ...querySnapshot.docs[0].data(),
        id: querySnapshot.docs[0].id,
      });
      setStatus("founded");
    } else {
      setStatus("no data");
    }
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
          };
          getSpecificOrder(orderId, user.uid);
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
          className="px-3 py-1 text-left rounded border-[1px] flex items-center gap-1 pl-1 border-gray-300 w-fit"
          onClick={() => navigate("/order-status")}
        >
          <Icon icon="ci:chevron-left" />
          <p>Kembali</p>
        </button>
        <h5 className="font-semibold text-xl">Detail Status Pesanan</h5>
        <div className="orderContainer">
          <>
            {order && (
              <div>
                <div className="flex items-center justify-between border-b-[1px] border-gray-300 p-3">
                  <div>
                    <h5 className="font-semibold text-lg">{order.storeName}</h5>
                    <h6 className="font-medium text-gray-600">
                      {order.orderId}
                    </h6>
                    <p className="text-gray-600 text-sm">
                      {dayjs(order.createdAt.toDate()).format("DD MMM YYYY")}
                    </p>
                  </div>
                  <div className="text-right">
                    <h5 className="font-semibold">
                      {rupiahConverter(order.total)}
                    </h5>
                    <h6 className="font-medium text-green-600">
                      Status: {order.status === "" && "hmm"}
                    </h6>
                  </div>
                </div>
                <div className="flex flex-col gap-2 p-4">
                  {order.products.map((p) => (
                    <CartItem
                      image={
                       p.product.image
                      }
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
            )}
          </>
        </div>
      </div>
    </>
  );
}

export default OrderStatusDetail;
