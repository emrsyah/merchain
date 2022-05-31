import { Icon } from "@iconify/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, {  useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { userState } from "../../../atoms/userAtom";
import NavbarAdmin from "../../../components/NavbarAdmin";
import { firestoreDb } from "../../../firebase";

function NewCustomer() {
  const navigate = useNavigate()
  const [store, setStore] = useOutletContext();
  const [loading, setLoading] = useState(false)
  const user = useRecoilValue(userState);
  const namaRef = useRef("");
  const emailRef = useRef("");
  const nomorRef = useRef("");
  const domisiliRef = useRef("");
  const jumlahRef = useRef("");


  const submitHandler = async (ev) => {
    ev.preventDefault();
    setLoading(true)
    try{
      await addDoc(collection(firestoreDb, "customers"), {
        storeId: store.id,
        nama: namaRef.current.value,
        email: emailRef.current.value,
        nomor: nomorRef.current.value,
        domisili: domisiliRef.current.value,
        jumlahOrder: jumlahRef.current.value,
        createdAt: serverTimestamp(),
      });
      toast.success("Data Berhasil Ditambahkan")
      navigate('/app/customers')
    } catch (err) {
      console.log(err)
    } finally{
      setLoading(false)
    }
  };

  return (
    <>
      <Helmet>
        <title>Create Customer | Merchain</title>
      </Helmet>
      <NavbarAdmin user={user} />

      <div className="layoutContainer">
        <Link
          to="/app/customers"
          className="py-1 px-3 text-sm my-3 bg-white border-[1px] border-gray-300 hover:bg-gray-50 rounded font-medium flex items-center w-fit gap-1"
        >
          <Icon icon="akar-icons:chevron-left" className="inline" />
          Kembali
        </Link>

        <div className="contentContainer">
          <h1 className="pageName mb-6">Kustomer Baru</h1>
          <form className="flex flex-col gap-4" onSubmit={submitHandler}>
            <div>
              <label htmlFor="nama" className="font-medium">
                Nama<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="nama"
                className="addInput"
                placeholder="John Doe"
                required
                ref={namaRef}
              />
            </div>
            <div>
              <label htmlFor="email" className="font-medium">
                Email
              </label>
              <input
                type="text"
                id="email"
                className="addInput"
                placeholder="johndoe@gmail.com"
                ref={emailRef}
                // required
              />
            </div>
            {/* <div>
              <label htmlFor="desc" className="font-medium">
                Deskripsi<span className="text-red-600">*</span>
              </label>
              <textarea
                // type="text"
                id="desc"
                className="addInput"
                placeholder="Deskripsi"
                required
                cols="30"
              />
            </div> */}
            <div>
              <label htmlFor="telepon" className="font-medium">
                Nomor Telepon
                {/* <span className="text-red-600">*</span> */}
              </label>
              <input
                type="number"
                id="telepon"
                className="addInput"
                placeholder="+62"
                ref={nomorRef}
                // required
              />
            </div>
            <div>
              <label htmlFor="domisili" className="font-medium">
                Domisili
              </label>
              <input
                type="text"
                id="domisili"
                className="addInput"
                placeholder="Kota Bandung, Jawa Barat"
                ref={domisiliRef}
              />
            </div>
            <div>
              <label htmlFor="jumlah" className="font-medium">
                Jumlah Order
              </label>
              <input
                type="number"
                id="jumlah"
                className="addInput"
                placeholder="3"
                ref={jumlahRef}
              />
            </div>
            <div className="my-1 justify-end flex gap-3 md:">
              <button
                className={`rounded py-3 hover:bg-purple-100 font-semibold text-sm px-6 text-purple-600 border-2 border-purple-600 ${loading && 'opacity-75'}`}
                onClick={()=>navigate('/app/customers')}
                disabled={loading}
              >
                Batalkan
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`bg-purple-600 py-3 hover:bg-purple-700 px-6 font-semibold text-white rounded text-sm ${loading && "opacity-75 hover:bg-purple-600"}`}
              >
                Simpan Kustomer
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default NewCustomer;
