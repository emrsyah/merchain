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
        console.count(snapshot.docs[0] ? snapshot.docs[0].data() : null);
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
        <div>
          
        </div>
      </>
    );
  }
}

export default Storefront;
