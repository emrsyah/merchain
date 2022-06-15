import React from "react";
import { useNavigate } from "react-router-dom";

function ShopItem({ img, price, name, desc, slug, active, color }) {
  const navigate = useNavigate()
  const clickHandler = () => {
    navigate(slug)
  };

  return (
    <div
      onClick={clickHandler}
      className="rounded-lg shadow-lg  hover:scale-[102%] transition-all duration-200 ease-out cursor-pointer"
    >
      <div className="w-full h-56 sm:h-80 relative">
        <img
          src={img}
          className="w-full h-full object-cover rounded-t-lg"
          alt=""
          loading="lazy"
        /> 
        <div className={`font-semibold text-lg absolute bottom-2 ${color + "-tag"} text-white py-1 px-2 rounded-md  right-2`}>
          {active ? <p>{price}</p> : "Sold Out"}
        </div>
      </div>
      <div className="pb-4 pt-3 px-3 flex flex-col gap-1 ">
        <h5 className="font-semibold text-xl truncate">{name}</h5>
        <p className="text-sm text-gray-600  line-clamp-2 leading-[1.55]">
          {desc}
        </p>
      </div>
    </div>
  );
}

export default ShopItem;
