import { Icon } from "@iconify/react";
import React from "react";
import rupiahConverter from "../helpers/rupiahConverter";

function CartItem({ image, name, quantity, price, deleteHandler, id, color }) {
  return (
    <div className="grid grid-cols-12 gap-2 items-center">
      <img src={image} className={`w-20 h-24 object-cover col-span-2`} alt="" />
      <div className="flex items-center gap-[10px] col-span-4">
        <h6 className="font-semibold">{name}</h6>
      </div>
      <h6 className="col-span-1 font-medium text-gray-500 text-center">
        <span className="text-sm">x</span>
        {quantity}
      </h6>
      <div
        className={`col-span-3 ${
          color + "-txt"
        } font-medium text-[15px] text-center ${deleteHandler === null && "col-span-5"} `}
      >
        {rupiahConverter(quantity * price)}
      </div>
      {deleteHandler !==
        null && (
          <button
            className="col-span-2 flex justify-center p-1 text-gray-600 hover:text-red-500 cursor-pointer rounded bg-gray-100 w-fit mx-auto"
            onClick={() => deleteHandler(id)}
          >
            <Icon icon="ci:trash-full" width={24} />
          </button>
        )}
    </div>
  );
}

export default CartItem;
