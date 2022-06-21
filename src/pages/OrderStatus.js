import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import NavbarStore from "../components/NavbarStore";

function OrderStatus() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [orderId, setOrderId] = useState(
    searchParams.get("order_id") ? searchParams.get("order_id") : ""
  );

  return (
    <>
      <Helmet>
        <title>Checkout - Merchain</title>
      </Helmet>
      <NavbarStore />
      <div>Order Status</div>
    </>
  );
}

export default OrderStatus;
