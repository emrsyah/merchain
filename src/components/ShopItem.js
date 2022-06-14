import React from "react";

function ShopItem({img, price, name, desc, slug}) {
  return (
    <div className="rounded-lg shadow-lg  hover:scale-[102%] transition-all duration-200 ease-out cursor-pointer">
      <div className="w-full h-80 relative">
        <img
          src={img}
          className="w-full h-full object-cover rounded-t shadow-inner"
          alt=""
        />
        <h5 className="font-semibold text-lg absolute bottom-2 text-white py-1 px-2 rounded-md  right-2 bg-[#B14EFF]">
          {price}
        </h5>
      </div>
      <div className="py-4 px-3 flex flex-col gap-1 ">
        <h5 className="font-semibold text-xl truncate">{name}</h5>
        <p className="text-sm text-gray-600  line-clamp-2 leading-[1.55]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
          aspernatur, ipsa animi esse similique sequi illo adipisci laudantium
          quos praesentium.
        </p>
      </div>
    </div>
  );
}

export default ShopItem;
