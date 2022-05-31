import React from "react";

function EmptyTable({columns}) {
  return (
    <>
      <table className=" my-4 border-b-[1px] border-gray-300 border-collapse bg-white text-sm w-full text-left">
        <tr>
          {columns.map((col) => (
            <th className="font-semibold rounded-sm p-2">{col.Header}</th>
          ))}
        </tr>
      </table>
      <p className="text-sm text-center text-gray-600">Belum Ada Data</p>
    </>
  );
}

export default EmptyTable;
