import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useOutletContext } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../../atoms/userAtom";
import EmptyTable from "../../../components/EmptyTable";
import NavbarAdmin from "../../../components/NavbarAdmin";
import Table from "../../../components/Table";
import VerificationReminder from "../../../components/VerificationReminder";
import { firestoreDb } from "../../../firebase";
import mappingToArray from "../../../helpers/mappingToArray";
import dayjs from "dayjs";
import rupiahConverter from "../../../helpers/rupiahConverter";

function Orders() {
  const user = useRecoilValue(userState);
  const [filterInput, setFilterInput] = useState("");
  const [orders, setOrders] = useState(false);
  const [store, setStore] = useOutletContext();

  const getOrders = (id) => {
    // console.log('fetching store')
    // ?? Unsubscribe itu buat clear memory mislanya componentnya udah unmount
    const unsubscribe = onSnapshot(
      query(
        collection(firestoreDb, "orders"),
        where("storeId", "==", id),
        orderBy("createdAt", "desc")
      ),
      (snapshot) => {
        if (snapshot.docs.length) {
          setOrders(mappingToArray(snapshot.docs));
          const arrr = (mappingToArray(snapshot.docs))
          console.log(arrr[3])
        } else {
          setOrders([]);
        }
      }
    );
    return unsubscribe;
  };

  useEffect(() => {
    try {
      getOrders(store.id);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const dataMemo = useMemo(() => orders, [orders]);

  const columns = useMemo(
    () => [
      {
        Header: "Id Pesanan",
        accessor: "orderId",
        Cell: ({ cell: { value } }) => (
          <>
            <p className={`text-sm sm:hidden font-medium truncate text-gray-600`}>
              {value.substring(9, 14)}...
            </p>
            <p className={`text-sm hidden sm:inline font-medium truncate text-gray-600`}>
              {value.substring(9, 20)}...
            </p>
          </>
        ),
      },
      {
        Header: "Pembeli",
        accessor: "customer.firstname",
      },
      {
        Header: "Tanggal Pesan",
        accessor: "createdAt",
        Cell: ({ cell: { value } }) => (
          <p className={``}>
            <span className="sm:inline hidden">
              {dayjs(value?.toDate()).format("HH:mm - ")}
            </span>
            {dayjs(value?.toDate()).format("MMM DD")}
          </p>
        ),
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ cell: { value } }) => (
          <p className={`${value} rounded text-[13px] p-1 w-fit font-semibold`}>
            {value}
          </p>
        ),
      },
      {
        Header: "Total",
        accessor: "total",
        Cell: ({ cell: { value } }) => (
          <p className={``}>{rupiahConverter(value)}</p>
        ),
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
        </div>
        <div className="contentContainer">
          <h5 className="font-semibold">Total Orderan: {orders?.length}</h5>
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
          {orders === false && <div>Loading...</div>}

          {/* Table */}
          {!orders === false && (
            <>
              {dataMemo?.length > 0 ? (
                <Table
                  columns={columns}
                  data={dataMemo}
                  filterInput={filterInput}
                  filterColumn="customer.firstname"
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
