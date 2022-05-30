import { Icon } from "@iconify/react";
import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../../atoms/userAtom";
import NavbarAdmin from "../../../components/NavbarAdmin";
import Table from "../../../components/Table";
import VerificationReminder from "../../../components/VerificationReminder";

function Products() {
  const user = useRecoilValue(userState);
  const [data, setData] = useState([]);
  const [filterInput, setFilterInput] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const result = await fetch(
          "https://api.tvmaze.com/search/shows?q=snow"
        );
        const resJson = await result.json();
        setData(resJson);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const dataMemo = useMemo(() => data, [data])

  const columns = useMemo(
    () => [
      {
        Header: "No",
        accessor: "show.id",
      },
      {
        Header: "Tanggal Pesan",
        accessor: "show.ended",
      },
      {
        Header: "Pembeli",
        accessor: "show.language",
      },
      {
        Header: "Status",
        accessor: "show.status",
        Cell: ({cell: {value} }) => <p className={`${value} rounded text-[13px] py-1 px-2 w-fit font-semibold interFonts`}>{value}</p>
      },
      {
        Header: "Total",
        accessor: "show.runtime",
      },
    ],
    []
  );

  const handleFilterChange = e => {
    const value = e.target.value || "";
    setFilterInput(value);
  };


  return (
    <>
      <Helmet>
        <title>Products | Merchain</title>
      </Helmet>
      <NavbarAdmin user={user} />
      <div className="layoutContainer">
        {!user.verified && <VerificationReminder />}
        <div className="flex justify-between items-center">
          <h1 className="pageName">Products</h1>
          <Link to="/app/products/new" className="addButton">
            <Icon icon="akar-icons:plus" width="18" />
            Produk Baru
          </Link>
        </div>
        <div className="contentContainer">
          <h5 className="font-semibold">Total Produk: 12</h5>
          {/* Search Bar & Filter Nanti */}
          <div className="flex w-full my-2">
            <input
              type="text"
              placeholder="Cari Produk"
              onChange={handleFilterChange}
              value={filterInput}
              className="w-full focus:border-purple-600 text-sm outline-none border-[1px] border-gray-300 transition-all duration-300 ease-out  rounded p-2"
            />
            {/* <button>
              Cari
            </button> */}
          </div>

          {/* Table */}
          <div>{data && <Table columns={columns} data={dataMemo} filterInput={filterInput} />}</div>
        </div>
      </div>
    </>
  );
}

export default Products;
