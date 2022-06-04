import { Icon } from "@iconify/react";
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

function Customers() {
  const [store, setStore] = useOutletContext();
  const user = useRecoilValue(userState);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [filterInput, setFilterInput] = useState("");
  const [customers, setCustomers] = useState("")

  const getCustomers = (id) => {
    // console.log('fetching store')
    // ?? Unsubscribe itu buat clear memory mislanya componentnya udah unmount
    const unsubscribe = onSnapshot(
      query(collection(firestoreDb, "customers"), where("storeId", "==", id)),
      (snapshot) => {
        setCustomers(snapshot.docs)
        // console.log({...snapshot.docs})
        const mapped = snapshot.docs.map(doc => {
          return ({...doc.data(), id: doc.id})
        })
        console.log(mapped)
      }
    );
    return unsubscribe;
  };

  useEffect(() => {

    setLoading(true)
    try{
      getCustomers(store.id)
    } catch(err){
      console.log(err)
    }
    setLoading(false)
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
        <title>Customers | Merchain</title>
      </Helmet>
      <NavbarAdmin user={user} />
      <div className="layoutContainer">
        {!user.verified && <VerificationReminder />}
        <div className="flex justify-between items-center">
          <h1 className="pageName">Customers</h1>
          <Link to="/app/customers/new" className="addButton">
            <Icon icon="akar-icons:plus" width="18" />
            Kustomer Baru
          </Link>
        </div>
        <div className="contentContainer">
          <h5 className="font-semibold">Total Kustomer: {data?.length}</h5>
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
          {loading && <div>Loading...</div>}

          {/* Table */}
          {!loading && (
            <>
              {data ? (
                <Table
                  columns={columns}
                  data={dataMemo}
                  filterInput={filterInput}
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
