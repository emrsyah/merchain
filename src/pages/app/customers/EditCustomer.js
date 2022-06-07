import { Icon } from "@iconify/react";
import {
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { userState } from "../../../atoms/userAtom";
import NavbarAdmin from "../../../components/NavbarAdmin";
import { firestoreDb } from "../../../firebase";

function EditCustomer() {
  let { id } = useParams();
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [store, setStore] = useOutletContext();
  const [loading, setLoading] = useState(false);
  const [firstLoading, setFirstLoading] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [isChange, setIsChange] = useState(false);

  useEffect(() => {
    setFirstLoading(true);
    try {
      getCustomer();
      setFirstLoading(false);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const getCustomer = async () => {
    const docRef = doc(firestoreDb, "customers", id);
    const docSnap = await getDoc(docRef);

    // Handling error dan exception hehehe
    if (!docSnap.exists()) {
      navigate("/app/customers");
      return;
    }
    if (docSnap.data().storeId !== store.id) {
      navigate("/app/customers");
      return;
    }
    console.log(docSnap.data());
    setCustomer(docSnap.data());
  };

  const changeHandler = () => {
    if (isChange === true) return;
    setIsChange(true);
  };

  const submitHandler = async (data) => {
    setLoading(true);
    try {
      await updateDoc(doc(firestoreDb, "customers", id), {
        storeId: store.id,
        nama: data.nama,
        email: data.email,
        nomor: data.telepon,
        domisili: data.domisili,
        jumlahOrder: data.jumlah,
        createdAt: serverTimestamp(),
      });
      toast.success("Data Berhasil Disimpan");
      // navigate("/app/customers");
    } catch (err) {
      console.error(err);
      toast.error("Terjadi Kesalahan");
    } finally {
      setIsChange(false)
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Edit Customer | Merchain</title>
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
          {!firstLoading && customer ? (
            <>
              <h1 className="pageName mb-6">Edit Customer</h1>
              <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(submitHandler)}
                onChange={changeHandler}
              >
                <div>
                  <label htmlFor="nama" className="font-medium">
                    Nama<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="nama"
                    className="addInput"
                    placeholder="John Doe"
                    {...register("nama", { required: true })}
                    defaultValue={customer?.nama}
                  />
                  {errors.nama && (
                    <span className="text-[13px] ml-1 text-red-500">
                      nama harus diisi
                    </span>
                  )}
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
                    {...register("email", { required: false })}
                    defaultValue={customer?.email}
                  />
                </div>
                <div>
                  <label htmlFor="telepon" className="font-medium">
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    id="telepon"
                    className="addInput"
                    placeholder="+62"
                    {...register("telepon", { required: false })}
                    defaultValue={customer?.nomor}
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
                    {...register("domisili", { required: false })}
                    defaultValue={customer?.domisili}
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
                    {...register("jumlah", { required: false })}
                    defaultValue={customer?.jumlahOrder}
                  />
                </div>
                <div className="my-1 justify-end flex gap-3 md:">
                  <button
                    type="button"
                    className={`batalkanBtn ${
                      (loading || !isChange) && "opacity-75"
                    }`}
                    onClick={() => navigate("/app/customers")}
                    disabled={loading || !isChange}
                  >
                    Batalkan
                  </button>
                  <button
                  // ! Evaluasi lagi ini kondisi disabled yg loading ama !isChange, udh betul belum, kemaren malem jadi ngantuk
                    type="submit"
                    disabled={loading || !isChange}
                    className={`simpanBtn ${
                      (loading || !isChange) && "opacity-75 hover:bg-purple-600"
                    }`}
                  >
                    Simpan Kustomer
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div>Harap Tunggu...</div>
          )}
        </div>
      </div>
    </>
  );
}

export default EditCustomer;
