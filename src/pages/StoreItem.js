import { Icon } from "@iconify/react";
import { doc, getDoc } from "firebase/firestore";
import Lottie from "lottie-web";
import React, { useEffect } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import lottieJson from "../assets/97110-purple-spinner.json";
import logo from "../assets/merchainIcon.svg";
import NavbarStore from "../components/NavbarStore";
import { firestoreDb } from "../firebase";
import rupiahConverter from "../helpers/rupiahConverter";
import NotFound from "./NotFound";

function StoreItem() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");
  const [product, setProduct] = useState(null);
  const [store, setStore] = useOutletContext();

  useEffect(() => {
    const instance = Lottie.loadAnimation({
      container: document.querySelector("#lottie-container"),
      animationData: lottieJson,
    });
    return () => instance.destroy();
  }, []);

  const getProduct = async () => {
    const docSnap = await getDoc(doc(firestoreDb, "products", productId));
    if (!docSnap.exists()) {
      setStatus("not found");
      return;
    }
    setProduct(docSnap.data());
    console.log(docSnap.data());
    setStatus("finished");
  };

  useEffect(() => {
    try {
      getProduct();
    } catch (err) {
      console.error(err);
    }
  }, []);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-[100vh] flex-col">
        {/* <img src={loading} alt="" /> */}
        <img src={logo} alt="" className="h-14" />
        <div id="lottie-container" className="w-28" />
        {/* <div>loading</div> */}
      </div>
    );
  } else if (status === "not found") {
    return <NotFound />;
  } else
    return (
      <>
        <Helmet>
          <title>{store.storeName} - Merchain</title>
        </Helmet>
        <NavbarStore color={store.colorTheme} />
        <div className="poppins">
          <button
            className={`md:hidden flex gap-1 items-center font-medium cursor-pointer mb-3  ${
              store.colorTheme + "Nav"
            } `}
            onClick={() => navigate(`/${store.storeName}`)}
          >
            <Icon icon="charm:chevron-left" width={20} />
            Kembali Ke Toko
          </button>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 my-6 gap-2 md:gap-6">
            <div className={`col-span-1 ${store.colorTheme + "-pg"}`}>
              <img
                src={product.image}
                className="w-[400px] mx-auto h-[460px] object-cover"
                alt=""
              />
            </div>
            <div className="col-span-1 p-5 flex flex-col gap-2">
              <button
                className={`hidden md:flex gap-1 items-center font-medium cursor-pointer mb-3  ${
                  store.colorTheme + "Nav"
                } `}
                onClick={() => navigate(`/${store.storeName}`)}
              >
                <Icon icon="charm:chevron-left" width={20} />
                Kembali Ke Toko
              </button>
              <h5 className="text-3xl font-semibold">{product.name}</h5>
              <h6 className="text-xl font-medium">
                {rupiahConverter(product.price)}
              </h6>
              <p className="text-gray-600">{product.desc}</p>
              <button
                className={`p-[10px] rounded-full mt-5 font-semibold text-lg text-white ${
                  store.colorTheme + "-btn"
                } `}
              >
                Tambah Ke Keranjang
              </button>
            </div>
          </div>
        </div>
      </>
    );
}

export default StoreItem;
