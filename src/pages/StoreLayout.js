import React, { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { statusState } from "../atoms/statusStoreAtom";
import logo from "../assets/merchainIcon.svg";
import NotFound from "./NotFound";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestoreDb } from "../firebase";
import { useState } from "react";
import Lottie from "lottie-web";
import lottieJson from "../assets/97110-purple-spinner.json";


function StoreLayout() {
  // const [status, setStatus] = useRecoilState(statusState);
  const [status, setStatus] = useState('loading');
  const { storeName, productId } = useParams();
  const [store, setStore] = useState(null);

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
  
  const getStoreVerifiedStatus = async (id) =>{
    const res = await fetch(`https://merchain-api-production.up.railway.app/status/${id}`)
    const resJson = await res.json()
    return (resJson.emailVerified)
  }

  useEffect(() => {
    const lowerName = storeName.toLowerCase();
    try {
      getStore(lowerName).then((data) => {
        if (!data) {
          setStatus("not found");
          return;
        }
        const isVerified = getStoreVerifiedStatus(data.userId)
        if(!isVerified){
          setStatus('not verified')
          return
        }
        setStore(data);
        setStatus("finished");
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
    return(
      <div>Account Not Verified</div>
    )
  } else if (status === "finished") {
    return (
      <>
        {store && (
          <div>
            <Outlet context={[store, setStore]} />
          </div>
        )}
      </>
    );
  }
}

export default StoreLayout;
