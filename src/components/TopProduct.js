import React from "react";

function TopProduct({name, sold, index}) {
  return (
    <div className="flex md:flex-row flex-col md:items-center grid-cols-5 text-sm p-1 justify-between">
      <p className="font-medium text-gray-600 flex gap-2 col-span-4">
        {index}
        <span className="font-medium text-black border-l-[1.5px] pl-2 border-gray-400 truncate md:whitespace-pre-wrap md:text-clip md:overflow-auto">
          {name}
        </span>
      </p>
      <p className="text-[13px] text-gray-700 col-span-1 ml-6 md:ml-0">{sold} Terjual</p>
    </div>
  );
}

export default TopProduct;
