import { Icon } from "@iconify/react";
import dayjs from "dayjs";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useOutletContext } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../../atoms/userAtom";
import EmptyTable from "../../../components/EmptyTable";
import NavbarAdmin from "../../../components/NavbarAdmin";
import Table from "../../../components/Table";
import VerificationReminder from "../../../components/VerificationReminder";
import { firestoreDb } from "../../../firebase";
import mappingToArray from "../../../helpers/mappingToArray";

function Customers() {
  const [store, setStore] = useOutletContext();
  const user = useRecoilValue(userState);
  const [filterInput, setFilterInput] = useState("");
  const [customers, setCustomers] = useState(false);

  const getCustomers = (id) => {
    // ?? Unsubscribe itu buat clear memory mislanya componentnya udah unmount
    const unsubscribe = onSnapshot(
      query(collection(firestoreDb, "customers"), where("storeId", "==", id)),
      (snapshot) => {
        if (snapshot.docs.length) {
          setCustomers(mappingToArray(snapshot.docs));
        } else {
          setCustomers([]);
        }
      }
    );
    return unsubscribe;
  };

  useEffect(() => {
    try {
      getCustomers(store.id);
    } catch (err) {
      console.error(err);
    }
  }, []); 

  const dataMemo = useMemo(() => customers, [customers]);

  const columns = useMemo(
    () => [
      {
        Header: "Dari",
        accessor: "createdAt",
        Cell: ({cell: {value}}) => (
          <p>
            {dayjs(value?.toDate()).format("MMM DD")}
          </p>
        )
      },
      {
        Header: "Nama",
        accessor: "nama",
      },
      {
        Header: "Email",
        accessor: "email",
        Cell: ({cell: {value}}) => (
          <p className="truncate max-w-[80px] md:max-w-none">
            {value}
          </p>
        )
      },
      {
        Header: "No. Telp",
        accessor: "nomor",
        Cell: ({cell: {value}}) => (
          <p className="truncate max-w-[80px] md:max-w-none">
            {value}
          </p>
        )
      },
      {
        Header: "Order",
        accessor: "jumlahOrder",
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
        <title>Customers | Merchain</title>
      </Helmet>
      <NavbarAdmin user={user} />
      <div className="layoutContainer min-h-screen">
        {!user.verified && <VerificationReminder />}
        <div className="flex justify-between items-center">
          <h1 className="pageName">Customers</h1>
          <Link to="/app/customers/new" className="addButton">
            <Icon icon="akar-icons:plus" width="18" />
            Kustomer Baru
          </Link>
        </div>
        <div className="contentContainer">
          <h5 className="font-semibold">Total Kustomer: {customers?.length}</h5>
          {/* Search Bar & Filter Nanti */}
          <div className="flex w-full my-2">
            <input
              type="text"
              placeholder="Cari Kustomer"
              onChange={handleFilterChange}
              value={filterInput}
              className="w-full focus:border-purple-600 text-sm outline-none border-[1px] border-gray-300 transition-all duration-300 ease-out  rounded p-2"
            />
            {/* <button>
              Cari
            </button> */}
          </div>

          {/* Kalo Loading */}
          {(customers === false) && <div>Tunggu...</div>}

          {/* Table */}
          {(!customers === false) && (
            <>
              {(dataMemo?.length > 0) ? (
                <Table
                  columns={columns}
                  data={dataMemo}
                  filterInput={filterInput}
                  filterColumn="nama"
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

export default Customers;
