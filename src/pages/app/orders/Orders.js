import { collection, onSnapshot, query, where } from "firebase/firestore";
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
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterInput, setFilterInput] = useState("");
  const [orders, setOrders] = useState(false);
  const [store, setStore] = useOutletContext();

  const getOrders = (id) => {
    // console.log('fetching store')
    // ?? Unsubscribe itu buat clear memory mislanya componentnya udah unmount
    const unsubscribe = onSnapshot(
      query(collection(firestoreDb, "orders"), where("storeId", "==", id)),
      (snapshot) => {
        if (snapshot.docs.length) {
          setOrders(mappingToArray(snapshot.docs));
        } else {
          setOrders([]);
        }
      }
    );
    return unsubscribe;
  };

  useEffect(() => {
    // (async () => {
    //   setLoading(true);
    //   try {
    //     const result = await fetch(
    //       "https://api.tvmaze.com/search/shows?q=snow"
    //     );
    //     const resJson = await result.json();
    //     setData(resJson);
    //   } catch (err) {
    //     console.log(err);
    //   }
    //   setLoading(false);
    // })();
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
          <p className={`text-sm font-medium truncate text-gray-600`}>
            {value.substring(0, 15)}...
          </p>
        ),
      },
      {
        Header: "Tanggal Pesan",
        accessor: "createdAt",
        Cell: ({ cell: { value } }) => (
          <p className={``}>
            {dayjs(value?.toDate()).format('MMM DD')}
          </p>
        ),
      },
      {
        Header: "Pembeli",
        accessor: "customer.firstname",
      },
      // {
      //   Header: "Status",
      //   accessor: "show.status",
      //   Cell: ({ cell: { value } }) => (
      //     <p
      //       className={`${value} rounded text-[13px] py-1 px-2 w-fit font-semibold interFonts`}
      //     >
      //       {value}
      //     </p>
      //   ),
      // },
      {
        Header: "Total",
        accessor: "total",
        Cell: ({ cell: { value } }) => (
          <p className={``}>
            {rupiahConverter(value)}
          </p>
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
          {(orders === false) && <div>Loading...</div>}

          {/* Table */}
          {(!orders === false) && (
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
