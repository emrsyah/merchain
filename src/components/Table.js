// Table.js
import { Icon } from "@iconify/react";
import React from "react";
import { useTable, useFilters, useSortBy } from "react-table";

export default function Table({ columns, data, filterInput }) {
  // Table component logic and UI come here
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
  } = useTable({ columns, data }, useFilters, useSortBy);

  return (
    <table
      {...getTableProps()}
      className=" my-4 border-collapse bg-white text-sm w-full text-left"
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                className="font-semibold rounded-sm p-2"
              >
                {column.render("Header") }
                {" "}
                {column.isSorted
                  ? column.isSortedDesc
                    ? <Icon icon="ant-design:caret-down-filled" className="inline" />
                    : <Icon icon="ant-design:caret-up-filled" className="inline" />
                  : ""}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              className="border-y-[1px] text-gray-800 border-gray-300 cursor-pointer hover:bg-purple-100  helveticaFonts"
            >
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()} className="px-2 py-3">
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
