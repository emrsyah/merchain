import React from "react";
import { useNavigate } from "react-router-dom";
import rupiahConverter from "../helpers/rupiahConverter";
import dayjs from "dayjs";

var isToday = require("dayjs/plugin/isToday");
dayjs.extend(isToday);

function OrderStatusItem({ storeName, createdAt, orderId, total, status }) {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center gap-3 justify-between p-2 border-b-[1px] cursor-pointer orderP"
      onClick={() => navigate(orderId)}
    >
      <div>
        <h5 className="font-medium text-lg">{storeName}</h5>
        <p className="text-gray-600 text-sm">
          {dayjs(createdAt.toDate()).isToday()
            ? "Hari Ini " + dayjs(createdAt.toDate()).format("HH:mm")
            : dayjs(createdAt.toDate()).format("DD MMM YYYY")}
        </p>
      </div>
      <h5 className="font-medium text-gray-500 orderC truncate">{orderId}</h5>
      <div  className="text-right">
      <h5 className="font-medium text-lg">{rupiahConverter(total)}</h5>
      <p className={`text-sm ${status} font-medium `}>{status}</p>
      </div>
    </div>
  );
}

export default OrderStatusItem;
