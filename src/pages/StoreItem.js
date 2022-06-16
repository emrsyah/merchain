import { doc, getDoc } from "firebase/firestore";
import Lottie from "lottie-web";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import lottieJson from "../assets/97110-purple-spinner.json";
import logo from "../assets/merchainIcon.svg";
import { firestoreDb } from "../firebase";
import NotFound from "./NotFound";

function StoreItem() {
  const { productId } = useParams();
  const [status, setStatus] = useState("loading");
  const [product, setProduct] = useState(null)
  
  useEffect(() => {
    const instance = Lottie.loadAnimation({
      container: document.querySelector("#lottie-container"),
      animationData: lottieJson,
    });
    return () => instance.destroy();
  }, []);

  const getProduct = async () =>{
    const docSnap = await(getDoc(doc(firestoreDb, 'products', productId)))
    if(!docSnap.exists()){
      setStatus("not found")
      return
    }
    setProduct(docSnap.data())
    setStatus('finished')
  }

  useEffect(()=>{
    try{
      getProduct()
    } catch(err){
      console.error(err)
    }
  }, [])

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
      <div className="poppins">
        {productId}
        <p>{product.active ? "true" : "false"}</p>
        <p>{product.name}</p>
        <p>{product.price}</p>
      </div>
    );
}

export default StoreItem;
