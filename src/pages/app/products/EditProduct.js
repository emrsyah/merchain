import { Icon } from "@iconify/react";
import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../../atoms/userAtom";
import NavbarAdmin from "../../../components/NavbarAdmin";
import ProductSwitch from "../../../components/ProductSwitch";
import { useForm } from "react-hook-form";
import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { firestoreDb, storage } from "../../../firebase";
import { toast } from "react-toastify";
import setFirestoreStorage from "../../../helpers/setFirestoreStorage";
import { deleteObject, ref } from "firebase/storage";

function EditProduct() {
  let { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [store, setStore] = useOutletContext();
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const imgRef = useRef("");
  const [selectedImage, setSelectedImage] = useState();
  const [enabled, setEnabled] = useState(null);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [firstLoading, setFirstLoading] = useState(true);
  const [isChange, setIsChange] = useState(false)

  const getProduct = async () => {
    const docRef = doc(firestoreDb, "products", id);
    const docSnap = await getDoc(docRef);

    // Handling error dan exception hehehe
    if (!docSnap.exists()) {
      console.error("Product doesnt exist");
      navigate("/app/products");
      return;
    }
    if (docSnap.data().storeId !== store.id) {
      console.error("Product doesnt exist");
      navigate("/app/products");
      return;
    }
    return ({...docSnap.data(), id:docSnap.id});
  };

  const changeHandler = () => {
    if (isChange === true) return;
    setIsChange(true);
  };
 
  useEffect(() => {
    setFirstLoading(true);
    try {
      getProduct().then(data =>{
        setProduct(data)
        setEnabled(data.active)
        setFirstLoading(false);
      })
    } catch (err) {
      console.error(err);
    } finally{
      setFirstLoading(false);
    }
  }, []);


  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const submitHandler = async (data) => {
    setLoading(true);
    const id = toast.loading("Menyimpan Produk...");
    try {

      // Update gambar kalo ada
      if(selectedImage){
        const imgRef = ref(storage, `product-images/${product.id}`)
        await deleteObject(imgRef)
        await setFirestoreStorage(selectedImage, product.id, "product-images")
      }

      await updateDoc(doc(firestoreDb, "products", product.id), {
        active: enabled,
        name: data.nama,
        desc: data.deskripsi,
        price: data.harga,
      });

      toast.update(id, {
        render: "Produk Berhasil Disimpan!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      // navigate("/app/products");
    } catch (err) {
      toast.update(id, {
        render: "Terjadi Kesalahan",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      console.error(err);
    } finally {
      setIsChange(false)
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Edit Product | Merchain</title>
      </Helmet>
      <NavbarAdmin user={user} />

      <div className="layoutContainer">
        <button
          onClick={()=>navigate("/app/products")}
          className="py-1 px-3 text-sm my-3 bg-white border-[1px] border-gray-300 hover:bg-gray-50 rounded font-medium flex items-center w-fit gap-1"
        >
          <Icon icon="akar-icons:chevron-left" className="inline" />
          Kembali
        </button>

        <div className="contentContainer">
          {!firstLoading && product ? (
            <>
              <h1 className="pageName mb-6">Edit Produk</h1>
              <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(submitHandler)}
                onChange={changeHandler}
              >
                <div className="flex flex-col">
                  <label htmlFor="switch" className="font-medium">
                    Produk Aktif
                  </label>
                  <ProductSwitch enabled={enabled} setEnabled={setEnabled} />
                </div>
                <div>
                  <label htmlFor="produk" className="font-medium">
                    Nama Produk<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="produk"
                    className="addInput"
                    placeholder="Sunflower Bouquet"
                    {...register("nama", { required: true })}
                    defaultValue={product?.name}
                  />
                  {errors.nama && (
                    <span className="text-[13px] ml-1 text-red-500">
                      nama produk harus diisi
                    </span>
                  )}
                </div>
                <div>
                  <label htmlFor="desc" className="font-medium">
                    Deskripsi<span className="text-red-600">*</span>
                  </label>
                  <textarea
                    // type="text"
                    id="desc"
                    className="addInput"
                    placeholder="Deskripsi"
                    cols="30"
                    {...register("deskripsi", { required: true })}
                    defaultValue={product?.desc}
                  />
                  {errors.deskripsi && (
                    <span className="text-[13px] ml-1 text-red-500">
                      deskripsi harus diisi
                    </span>
                  )}
                </div>
                <div>
                  <label htmlFor="harga" className="font-medium">
                    Harga (Rupiah)<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="number"
                    id="harga"
                    className="addInput"
                    placeholder="Harga"
                    min={0}
                    {...register("harga", { required: true })}
                    defaultValue={product?.price}
                  />
                  {errors.harga ? (
                    <span className="text-[13px] ml-1 text-red-500">
                      harga harus diisi
                    </span>
                  ) : (
                    <p className="text-xs font-medium text-purple-500">
                      perhatian jangan menggunakan titik (.)
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="gambar" className="font-medium">
                    Gambar<span className="text-red-600">*</span>
                  </label>
                  <div
                    className="border-gray-300 border-[1px] w-fit hover:border-purple-600 p-4 items-center my-2 rounded flex flex-col gap-4 cursor-pointer"
                    onClick={() => imgRef.current.click()}
                  >
                    {selectedImage ? (
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        className="w-56 h-56 object-cover"
                        alt="Thumb"
                      />
                    ) : (
                      <>
                        <img
                          src={product?.image}
                          alt="img placeholder"
                          className="w-32"
                        />
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    name="gambar"
                    accept="image/*"
                    className="opacity-0"
                    ref={imgRef}
                    onChange={imageChange}
                  />
                  <div className="my-1 justify-end flex gap-3 md:">
                    <button
                      type="button"
                      disabled={loading || !isChange}
                      onClick={() => navigate("/app/products")}
                      className={`batalkanBtn ${
                        (loading || !isChange) && "opacity-75 hover:bg-white"
                      } `}
                    >
                      Batalkan
                    </button>
                    <button
                      type="submit"
                      disabled={loading || !isChange}
                      className={`simpanBtn ${
                        (loading || !isChange) && "opacity-75 hover:bg-purple-600"
                      }`}
                    >
                      Simpan Produk
                    </button>
                  </div>
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

export default EditProduct;
