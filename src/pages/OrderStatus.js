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
        <title>Status Pesanan - Merchain</title>
      </Helmet>
      <NavbarStore />
      <div className="containerStore">
        <h5 className="font-semibold text-xl">Status Pesanan</h5>
        <div className="border-[1px] p-2 border-gray-300 rounded flex flex-col gap-4">
          <div className="flex items-center justify-between p-2 border-b-[1px]">
            <div>
              <h5 className="font-medium text-lg">Mindrown</h5>
              <p className="text-gray-600 text-sm">22 Juni 2022</p>
            </div>
            <h5>order-id-ascjbasjkbasc-acsbkjacs-csa</h5>
            <h5 className="font-medium text-lg">Rp 120.000</h5>
          </div>
          <div className="flex items-center justify-between p-2 border-b-[1px]">
            <div>
              <h5 className="font-medium text-lg">Mindrown</h5>
              <p className="text-gray-600 text-sm">22 Juni 2022</p>
            </div>
            <h5>order-id-ascjbasjkbasc-acsbkjacs-csa</h5>
            <h5 className="font-medium text-lg">Rp 120.000</h5>
          </div>
          <div className="flex items-center justify-between p-2 border-b-[1px]">
            <div>
              <h5 className="font-medium text-lg">Mindrown</h5>
              <p className="text-gray-600 text-sm">22 Juni 2022</p>
            </div>
            <h5>order-id-ascjbasjkbasc-acsbkjacs-csa</h5>
            <h5 className="font-medium text-lg">Rp 120.000</h5>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderStatus;
