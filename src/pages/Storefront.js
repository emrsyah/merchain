import { collection, onSnapshot, query, where } from "firebase/firestore";
import Lottie from "lottie-web";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firestoreDb } from "../firebase";
import NotFound from "./NotFound";
import lottieJson from "../assets/97110-purple-spinner.json";
import logo from "../assets/merchainIcon.svg";
import { Helmet } from "react-helmet-async";
import NavbarStore from "../components/NavbarStore";
import cover from "../assets/coverImg2.jpg";
import profile from "../assets/profileImg.jpg";
import { Icon } from "@iconify/react";
import dayjs from "dayjs";
import shopee from "../assets/shopee.svg";
import tokopedia from "../assets/tokopedia.svg";

function Storefront() {
  const { storeName } = useParams();
  const [store, setStore] = useState(false);

  const getStore = (name) => {
    const unsubscribe = onSnapshot(
      query(
        collection(firestoreDb, "stores"),
        where("storeNameLowercase", "==", name)
      ),
      (snapshot) => {
        setStore(snapshot.docs[0] ? snapshot.docs[0].data() : null);
        console.log(snapshot.docs[0] ? snapshot.docs[0].data() : null);
      }
    );
    return unsubscribe;
  };

  useEffect(() => {
    const lowerName = storeName.toLowerCase();
    try {
      getStore(lowerName);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    // console.count("loaded")
    const instance = Lottie.loadAnimation({
      container: document.querySelector("#lottie-container"),
      animationData: lottieJson,
    });
    return () => instance.destroy();
  }, []);

  if (store === false) {
    return (
      <div className="flex justify-center items-center h-[100vh] flex-col">
        {/* <img src={loading} alt="" /> */}
        <img src={logo} alt="" className="h-14" />
        <div id="lottie-container" className="w-28" />
        {/* <div>loading</div> */}
      </div>
    );
  } else if (store === null) {
    return <NotFound />;
  } else {
    return (
      <>
        <Helmet>
          <title>{store.storeName} - Merchain</title>
        </Helmet>
        <NavbarStore />
        <div className="h-[140vh] poppins">
          {/* Cover Img */}
          <div className="mx-0 lg:mx-20 xl:mx-36">
            {true ? (
              <img
                src={cover}
                className="w-full h-44 lg:h-60 m-auto object-cover rounded-b-xl"
                alt=""
              />
            ) : (
              <div className="w-full h-44 lg:h-60 m-auto object-cover rounded-b-xl bg-purple-200"></div>
            )}
          </div>

          {/* Header Profile */}
          <div className="shadow">
            <div className="-translate-y-20 px-2 md:px-4 gap-1 flex flex-col mx-0 lg:mx-20 xl:mx-36">
              <div className="flex items-end justify-between">
                <img
                  src={profile}
                  className="md:w-32 md:h-32 w-28 h-28 shadow border-4 border-white rounded-full object-cover "
                  alt="store img"
                />
                <div className="col-span-2 ml-auto translate-y-1 md:translate-y-0">
                  <div className="flex items-center w-fit gap-3 py-2 text-white cursor-pointer hover:bg-purple-700 font-medium rounded-md px-3 bg-purple-600">
                    <Icon icon="bi:share-fill" />
                    <h6 className="hidden md:inline  text-sm ">Bagikan Toko</h6>
                  </div>
                </div>
              </div>
              <h5 className="font-semibold col-span-4 text-2xl">
                {store.storeName}
              </h5>
              <div className="flex sm:flex-row items-start sm:items-center flex-col gap-1 sm:gap-5 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Icon icon="akar-icons:link-on" width={18} />
                  <p>merchain.com/Mindrown</p>
                </div>
                <div className="flex items-center gap-1">
                  <Icon icon="ic:round-access-time" width={18} />
                  <p>
                    Buka: {store.storeTime[0] ? store.storeTime[0] : "00:00"} -{" "}
                    {store.storeTime[1] ? store.storeTime[1] : "00:00"}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Icon icon="ant-design:calendar-outlined" width={18} />
                  <p>
                    Bergabung {dayjs(store.createdAt?.toDate()).format("MMM YYYY")}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-900 my-[6px] max-w-2xl">
                {store.storeBio}
              </p>
              {/* Link2 */}
              <div className="flex items-center flex-wrap gap-2 text-sm font-medium">
                <div className="linkItem">
                  <Icon icon="logos:whatsapp" width={24} />
                  <p>+6282115023866</p>
                </div>
                <div className="linkItem">
                  <Icon icon="logos:telegram" width={24} />
                  <p>+6282115023866</p>
                </div>
                <div className="linkItem">
                  {/* <Icon icon="logos:whatsapp" width={22} /> */}
                  <img src={shopee} className="w-6 h-6" alt="" />
                  <p>mantaptoko</p>
                </div>
                <div className="linkItem">
                  {/* <Icon icon="logos:whatsapp" width={22} /> */}
                  <img
                    src={tokopedia}
                    className="w-6 h-6 text-green-600"
                    alt=""
                  />
                  <p>mantaptoko</p>
                </div>
              </div>
            </div>
          </div>

          <div></div>
        </div>
      </>
    );
  }
}

export default Storefront;
