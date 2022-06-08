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
import mappingToArray from "../../../helpers/mappingToArray";

function Products() {
  const user = useRecoilValue(userState);
  const [store, setStore] = useOutletContext();
  const [loading, setLoading] = useState(true);
  const [filterInput, setFilterInput] = useState("");
  const [products, setProducts] = useState("");

  const getProducts = (id) => {
    // console.log('fetching store')
    // ?? Unsubscribe itu buat clear memory mislanya componentnya udah unmount
    const unsubscribe = onSnapshot(
      query(collection(firestoreDb, "products"), where("storeId", "==", id)),
      (snapshot) => {
        setProducts(mappingToArray(snapshot.docs));
      }
    );
    return unsubscribe;
  };

  useEffect(() => {
    setLoading(true);
    try {
      getProducts(store.id);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }, []);

  const dataMemo = useMemo(() => products, [products]);

  const columns = useMemo(
    () => [
      {
        Header: "Gambar",
        accessor: "image",
        Cell: ({ cell: { value } }) => (
          <img
            src={value}
            alt="productImg"
            className="h-16 w-16 object-cover"
          />
        ),
      },
      {
        Header: "Nama",
        accessor: "name",
        Cell: ({ cell: { value } }) => (
          <p
            className={`max-w-[160px]`}
          >
            {value}
          </p>
        ),
      },
      {
        Header: "Harga",
        accessor: "price",
        Cell: ({ cell: { value } }) => (
          <p
            className={`text-[13px]`}
          >
            Rp {value}
          </p>
        ),
      },
      {
        Header: "Deskripsi",
        accessor: "desc",
        Cell: ({ cell: { value } }) => (
          <p
            className={`lg:max-w-[300px] truncate md:max-w-[180px] max-w-[120px]`}
          >
            {value}
          </p>
        ),
      },
      {
        Header: "Status",
        accessor: "active",
        Cell: ({ cell: { value } }) => (
          <div
            className={`${!value && 'font-base text-gray-500'} text-[13px] py-[2px] flex items-center gap-[6px] px-[10px] font-medium interFonts rounded bg-[#F1F1F2] w-fit`}
          >
            <div
              className={`${
                value ? "bg-green-600" : "bg-gray-500"
              } w-2 h-2 rounded-full`}
            ></div>
            <p>{value ? "Aktif" : "Tidak Aktif"}</p>
          </div>
        ),
      },
      // {
      //   Header: "Pembeli",
      //   accessor: "show.language",
      // },
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
          <h5 className="font-semibold">Total Produk: {dataMemo?.length}</h5>
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

          {/* Kalo Loading */}
          {loading && <div>Loading...</div>}

          {/* Table */}
          {!loading && (
            <>
              {dataMemo ? (
                <Table
                  columns={columns}
                  data={dataMemo}
                  filterInput={filterInput}
                  filterColumn="name"
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

export default Products;
