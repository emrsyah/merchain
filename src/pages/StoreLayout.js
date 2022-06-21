import React, { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import logo from "../assets/merchainIcon.svg";
import NotFound from "./NotFound";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestoreDb } from "../firebase";
import { useState } from "react";
import Lottie from "lottie-web";
import lottieJson from "../assets/97110-purple-spinner.json";
import NavbarStore from "../components/NavbarStore";
import { useSetRecoilState } from "recoil";
import { storeColor } from "../atoms/storeColor";
import { storeNameAtom } from "../atoms/storeName";

function StoreLayout() {
  const [status, setStatus] = useState("loading");
  const { storeName, productId } = useParams();
  const [store, setStore] = useState(null);
  const setStoreColor = useSetRecoilState(storeColor)
  const setStoreName = useSetRecoilState(storeNameAtom)

  const getStore = async (name) => {
    const q = query(
      collection(firestoreDb, "stores"),
      where("storeNameLowercase", "==", name)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs[0]
      ? { ...snapshot.docs[0].data(), id: snapshot.docs[0].id }
      : null;
  };

  const getStoreVerifiedStatus = async (id) => {
    const res = await fetch(
      `https://merchain-api-production.up.railway.app/status/${id}`
    );
    const resJson = await res.json();
    const verifed = resJson.emailVerified;
    return verifed;
  };

  useEffect(() => {
    const lowerName = storeName.toLowerCase();
    try {
      getStore(lowerName).then((data) => {
        if (!data) {
          setStatus("not found");
          return;
        }
        const isVerified = getStoreVerifiedStatus(data.userId);
        isVerified.then((verified) => {
          if (!verified) {
            setStatus("not verified");
            return;
          }
          console.log(data)
          setStore(data);
          setStoreColor(data.colorTheme)
          setStoreName({name: data.storeName, id: data.id})
          setStatus("finished");
        });
        // getProducts(data.id);
      });
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
  } else if (status === "not verified") {
    return <NotFound />;
  } else if (status === "finished") {
    return (
      <>
        {store && (
          <div>
            <NavbarStore />
            <Outlet context={[store, setStore]} />
          </div>
        )}
      </>
    );
  }
}

export default StoreLayout;
