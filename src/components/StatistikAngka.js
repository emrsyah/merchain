import React from "react";

function StatistikAngka({emote, title, value}) {
  return (
    <div className="flex items-center gap-2 bg-white p-2 lg:p-4 shadow rounded">
      <div className="hidden md:text-4xl md:inline">{emote}</div>
      <div className="flex flex-col justify-between">
        <p className="text-sm text-gray-700">{title}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}

export default StatistikAngka;
