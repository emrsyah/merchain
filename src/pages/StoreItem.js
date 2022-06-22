import { Icon } from "@iconify/react";
import { doc, getDoc } from "firebase/firestore";
import Lottie from "lottie-web";
import React, { useEffect } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import {  useNavigate, useOutletContext, useParams } from "react-router-dom";
import lottieJson from "../assets/97110-purple-spinner.json";
import logo from "../assets/merchainIcon.svg";
import { cartState } from "../atoms/cartAtom";
import { firestoreDb } from "../firebase";
import rupiahConverter from "../helpers/rupiahConverter";
import NotFound from "./NotFound";
import { useRecoilState } from "recoil";
import { addToCart } from "../helpers/helperCart";
import { toast } from "react-toastify";

function StoreItem() {
  const [cart, setCart] = useRecoilState(cartState);
  const { productId } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");
  const [product, setProduct] = useState(null);
  const [store, setStore] = useOutletContext();
  const [quantity, setQuantity] = useState(1);

  const addCartToast = () => (
    <div>
      Produk ditambahkan ke{" "}
      <div
        onClick={()=>navigate("/cart")}
        className={`${store.colorTheme + "Nav"} font-medium hover:font-semibold underline`}
      >
        Keranjang
      </div>
    </div>
  );

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
    setStatus("finished");
  };

  useEffect(() => {
    try {
      getProduct();
    } catch (err) {
      console.error(err);
    }
  }, []);

  const addToCartHandler = () => {
    const newCart = addToCart(cart, { ...product, id: productId }, quantity);
    setCart(newCart);
    setQuantity(1)
    toast.info(addCartToast)
  };

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
          <title>{product.name} - {store.storeName} - Merchain</title>
        </Helmet>
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
              <p className="text-sm">Terjual {product.sold}</p>
              <h6 className="text-xl font-semibold">
                {rupiahConverter(product.price)}
              </h6>
              <p className="text-gray-600 leading-relaxed text-[15px] line-clamp-6">
                {product.desc}
              </p>
              <div className="w-full flex flex-col gap-[10px] mt-4">
                {product.active && (
                  <div className="flex cursor-default items-center justify-between py-[6px] px-5 border-[1.5px] border-gray-200 rounded-full">
                    <button
                      className={`p-2 ${
                        quantity - 1 > 0
                          ? store.colorTheme + "Nav"
                          : "text-gray-400"
                      }`}
                      disabled={!(quantity - 1 > 0)}
                      onClick={() => setQuantity((prev) => prev - 1)}
                    >
                      <Icon icon="fa-solid:minus" />
                    </button>
                    <h6 className="flex-grow text-center font-semibold text-lg">
                      {quantity}
                    </h6>
                    <button
                      className={`p-2 ${store.colorTheme + "Nav"}`}
                      onClick={() => setQuantity((prev) => prev + 1)}
                    >
                      <Icon icon="fa-solid:plus" />
                    </button>
                  </div>
                )}
                <button
                  className={`p-[10px] rounded-full font-semibold text-lg text-white ${
                    store.colorTheme + "-btn"
                  }
                ${
                  !product.active && "!bg-gray-200 text-gray-400 cursor-default"
                }
                `}
                  onClick={() => addToCartHandler()}
                  disabled={!product.active}
                >
                  {product.active ? "Tambah Ke Keranjang" : "Sold Out"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default StoreItem;
