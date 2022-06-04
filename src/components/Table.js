// Table.js
import { Icon } from "@iconify/react";
import React, { useEffect } from "react";
import { useTable, useFilters, useSortBy, usePagination } from "react-table";

export default function Table({ columns, data, filterInput }) {
  // Table component logic and UI come here
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setFilter,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state: { pageIndex, pageSize },
  } = useTable({ columns, data }, useFilters, useSortBy, usePagination);

  useEffect(() => {
    const value = filterInput || "";
    setFilter("show.id", value);
  }, [filterInput]);

  return (
    <>
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
                  {column.render("Header")}{" "}
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <Icon
                        icon="ant-design:caret-down-filled"
                        className="inline"
                      />
                    ) : (
                      <Icon
                        icon="ant-design:caret-up-filled"
                        className="inline"
                      />
                    )
                  ) : (
                    ""
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className="border-y-[1px] text-gray-800 border-gray-300 cursor-pointer hover:bg-purple-100  helveticaFonts"
                // onClick={()=>console.log(row.original.show.id)}
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
      <div className="flex gap-3 items-center justify-end mt-6 mb-2 mx-2">
        <button disabled={!canPreviousPage} onClick={()=>previousPage()}>
          <Icon
            icon="cil:chevron-circle-left-alt"
            width="28"
            className={`${
              !canPreviousPage
                ? "opacity-40 cursor-auto"
                : "hover:text-purple-600 text-gray-700"
            } cursor-pointer`}
          />
        </button>
        <p className="font-medium text-gray-600">
          <span className="text-purple-700">{pageIndex + 1}</span> dari{" "}
          {pageOptions.length}
        </p>
        <button disabled={!canNextPage} onClick={()=>nextPage()}>
          <Icon
            icon="cil:chevron-circle-right-alt"
            width="28"
            className={`${
              !canNextPage ? "opacity-40 cursor-auto" : "hover:text-purple-600 text-gray-700"
            } cursor-pointer`}
          />
        </button>
      </div>
    </>
  );
}
