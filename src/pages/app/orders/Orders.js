import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useRecoilValue } from "recoil";
import { userState } from "../../../atoms/userAtom";
import EmptyTable from "../../../components/EmptyTable";
import NavbarAdmin from "../../../components/NavbarAdmin";
import Table from "../../../components/Table";
import VerificationReminder from "../../../components/VerificationReminder";

function Orders() {
  const user = useRecoilValue(userState);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterInput, setFilterInput] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const result = await fetch(
          "https://api.tvmaze.com/search/shows?q=snow"
        );
        const resJson = await result.json();
        setData(resJson);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    })();
  }, []);

  const dataMemo = useMemo(() => data, [data]);

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
        Cell: ({ cell: { value } }) => (
          <p
            className={`${value} rounded text-[13px] py-1 px-2 w-fit font-semibold interFonts`}
          >
            {value}
          </p>
        ),
      },
      {
        Header: "Total",
        accessor: "show.runtime",
      },
    ],
    []
  );

  const handleFilterChange = (e) => {
    const value = e.target.value || "";
    setFilterInput(value);
  };

  return (
    <>
      <Helmet>
        <title>Orders | Merchain</title>
      </Helmet>
      <NavbarAdmin user={user} />
      <div className="layoutContainer min-h-screen">
        {!user.verified && <VerificationReminder />}
        <div className="flex justify-between items-center">
          <h1 className="pageName">Orders</h1>
          {/* <Link to="/app/orders/new" className="addButton">
            <Icon icon="akar-icons:plus" width="18" />
            Orderan Baru
          </Link> */}
        </div>
        <div className="contentContainer">
          <h5 className="font-semibold">Total Orderan: {data?.length}</h5>
          {/* Search Bar & Filter Nanti */}
          <div className="flex w-full my-2">
            <input
              type="text"
              placeholder="Cari Orderan"
              onChange={handleFilterChange}
              value={filterInput}
              className="w-full focus:border-purple-600 text-sm outline-none border-[1px] border-gray-300 transition-all duration-300 ease-out  rounded p-2"
            />
            {/* <button>
              Cari
            </button> */}
          </div>

          {/* Kalo Loading */}
          {loading && <div>Loading...</div>}

          {/* Table */}
          {!loading && (
            <>
              {(dataMemo?.length > 0) ? (
                <Table
                  columns={columns}
                  data={dataMemo}
                  filterInput={filterInput}
                  filterColumn="show.id"
                />
              ) : (
                <EmptyTable columns={columns} />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Orders;
