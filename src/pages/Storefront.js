import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import Lottie from "lottie-web";
import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { firestoreDb } from "../firebase";
import NotFound from "./NotFound";
import lottieJson from "../assets/97110-purple-spinner.json";
import logo from "../assets/merchainIcon.svg";
import { Helmet } from "react-helmet-async";
import cover from "../assets/coverImg2.jpg";
import { Icon } from "@iconify/react";
import dayjs from "dayjs";
import shopee from "../assets/shopee.svg";
import tokopedia from "../assets/tokopedia.svg";
import sadFace from "../assets/sadFace.svg";
import ShopItem from "../components/ShopItem";
import rupiahConverter from "../helpers/rupiahConverter";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";

function Storefront() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");
  const [products, setProducts] = useState(null);
  const [store, setStore] = useOutletContext();

  const getProducts = async (id) => {
    const q = query(
      collection(firestoreDb, "products"),
      where("storeId", "==", id),
      orderBy('active', "desc")
    );
    const snapshot = await getDocs(q);
    setProducts(snapshot.docs.length > 0 ? snapshot.docs : null);
    setStatus("finished");
  };

  useEffect(() => {
    // console.log(storeKu)
    // setStore(storeKu);
    try {
      getProducts(store.id);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    console.count("loaded");
    const instance = Lottie.loadAnimation({
      container: document.querySelector("#lottie-container"),
      animationData: lottieJson,
    });
    return () => instance.destroy();
  }, []);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-[100vh] flex-col">
        <img src={logo} alt="" className="h-14" />
        <div id="lottie-container" className="w-28" />
      </div>
    );
  } else if (status === "not found") {
    return <NotFound />;
  } else {
    return (
      <>
        <Helmet>
          <title>{store.storeName} - Merchain</title>
        </Helmet>
        <div className=" poppins">
          {/* Cover Img */}
          <div className="mx-0 lg:mx-20 max-w-7xl 2xl:mx-auto xl:mx-36">
            {store.coverImg ? (
              <img
                src={store.coverImg}
                className="w-full h-44 lg:h-60 m-auto object-cover rounded-b-xl"
                alt=""
              />
            ) : (
              <div
                className={`w-full h-44 lg:h-60 m-auto object-cover rounded-b-xl ${
                  store.colorTheme + "-tag"
                }`}
              ></div>
            )}
          </div>

          {/* Header Profile */}
          <div className="-translate-y-20 xl:px-[152px] xl:mx-auto max-w-7xl 2xl:mx-auto 2xl:px-2 px-2 md:px-6 gap-1 flex flex-col lg:px-[84px] pb-2">
            <div className="flex items-end justify-between">
              <img
                src={store.profileImg}
                className="md:w-32 bg-white md:h-32 w-28 h-28 shadow border-4 border-white rounded-full object-cover "
                alt="store img"
              />
              <div className="col-span-2 ml-auto translate-y-1 md:translate-y-0">
                <CopyToClipboard
                  text={`https://merchain.com/${store.storeName}`}
                  className="cursor-pointer"
                  onCopy={() => toast.success("Copied!")}
                >
                  <span>
                    <div
                      className={`flex items-center w-fit gap-3 py-2 text-white cursor-pointer font-medium rounded-md px-3 ${
                        store.colorTheme + "-btn"
                      }`}
                    >
                      <Icon icon="bi:share-fill" />
                      <h6 className="hidden md:inline  text-sm">
                        Bagikan Toko
                      </h6>
                    </div>
                  </span>
                </CopyToClipboard>
              </div>
            </div>

            <h5 className="font-semibold col-span-4 text-2xl">
              {store.storeName}
            </h5>

            <div className="flex sm:flex-row items-start sm:items-center flex-col gap-1 sm:gap-5 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Icon icon="akar-icons:link-chain" width={18} />
                <p>merchain.com/{store.storeName}</p>
              </div>
              <div className="flex items-center gap-1">
                <Icon icon="ic:outline-access-time" width={18} />
                <p>
                  Buka: {store.storeTime ? store.storeTime[0] : "00:00"} -{" "}
                  {store.storeTime ? store.storeTime[1] : "00:00"}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Icon icon="ic:baseline-calendar-month" width={18} />
                <p>
                  Bergabung{" "}
                  {dayjs(store.createdAt?.toDate()).format("MMM YYYY")}
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-900 my-[6px] max-w-2xl">
              {store.storeBio}
            </p>

            {/* Link2 */}
            <div className="flex items-center flex-wrap gap-2 text-sm font-medium">
              {store.links.whatsapp && (
                <div className={`linkItem ${store.colorTheme + "link"}`}>
                  <Icon icon="logos:whatsapp" width={24} />
                  <p>{store.links.whatsapp}</p>
                </div>
              )}
              {store.links.telegram && (
                <div className={`linkItem ${store.colorTheme + "link"}`}>
                  <Icon icon="logos:telegram" width={24} />
                  <p>{store.links.telegram}</p>
                </div>
              )}
              {store.links.shopee && (
                <a
                  className={`linkItem ${store.colorTheme + "link"}`}
                  href={store.links.shopee}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={shopee} className="w-6 h-6" alt="" />
                  <p>{store.storeName}</p>
                </a>
              )}
              {store.links.tokopedia && (
                <a
                  className={`linkItem ${store.colorTheme + "link"}`}
                  href={store.links.tokopedia}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={tokopedia}
                    className="w-6 h-6 text-green-600"
                    alt=""
                  />
                  <p>{store.storeName}</p>
                </a>
              )}
              {store.links.instagram && (
                <a
                  className={`linkItem ${store.colorTheme + "link"}`}
                  href={store.links.instagram}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon
                    icon="akar-icons:instagram-fill"
                    className="text-pink-600"
                    width={24}
                  />
                  <p>{store.storeName}</p>
                </a>
              )}
              {store.links.facebook && (
                <a
                  className={`linkItem ${store.colorTheme + "link"}`}
                  href={store.links.facebook}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon
                    icon="akar-icons:facebook-fill"
                    className="text-blue-600"
                    width={24}
                  />
                  <p>{store.storeName}</p>
                </a>
              )}
            </div>
          </div>

          {/* Line Break */}
          <div className="shadow w-full -translate-y-20">
            <p className="opacity-0 cursor-default">Line Breaker</p>
          </div>

          {/* Shop Container */}
          <div className="-translate-y-20 max-w-7xl 2xl:mx-auto 2xl:grid-cols-4 mt-6 md:mt-10 mx-2 lg:mx-20 xl:mx-36 px-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-x-8 md:gap-y-6">
            {/* Shop Item */}
            {products ? (
              <>
                {products.map((product) => (
                  <ShopItem
                    key={product.id}
                    slug={product.id}
                    name={product.data().name}
                    price={rupiahConverter(product.data().price)}
                    img={product.data().image}
                    desc={product.data().desc}
                    active={product.data().active}
                    color={store.colorTheme}
                  />
                ))}
              </>
            ) : (
              <div className="flex flex-col items-center text-center gap-2 col-span-3 justify-center">
                <img src={sadFace} alt="no data img" className="w-24" />
                <div>
                  <h6 className="font-medium">Belum Ada Produk</h6>
                  <p className="text-sm text-gray-600">
                    Pemilik toko belum menambahkan produk, mohon kembali nanti.
                  </p>
                </div>
              </div>
            )}
            {/* <ShopItem
              price="Rp 36.000"
              name="Novel Milk & Honey"
              img={product1}
            />
            <ShopItem price="Rp 48.000" name="The Black Arts" img={product2} />
            <ShopItem
              price="Rp 60.000"
              name="The Art Of Making Memories"
              img={product4}
            />
            <ShopItem
              price="Rp 52.000"
              name="The Golem and The Jinni"
              img={product3}
            /> */}
          </div>

          <div className="mb-10 text-center flex items-center justify-center text-sm">
            <p>
              Powered by <br />{" "}
              <span
                className="text-2xl font-semibold cursor-pointer text-purple-600"
                onClick={() => navigate("/")}
              >
                Merchain
              </span>
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default Storefront;
