import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, serverTimestamp, where } from "firebase/firestore";
import Lottie from "lottie-web";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../../atoms/userAtom";
import Sidebar from "../../components/Sidebar";
import { auth, firestoreDb } from "../../firebase";
import lottieJson from '../../assets/97110-purple-spinner.json'
import logo from '../../assets/merchainIcon.svg'
import MobileAdminModal from "../../components/MobileAdminModal";

function Layout() {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAndSetStore = (uid) => {
    // console.log('fetching store')
    // ?? Unsubscribe itu buat clear memory mislanya componentnya udah unmount
    const unsubscribe = onSnapshot(
      query(collection(firestoreDb, "stores"), where("userId", "==", uid)),
      (snapshot) => {
        if(snapshot.docs[0]){
          setStore({ ...snapshot.docs[0].data(), id: snapshot.docs[0].id });
        } else{
          navigate('/login')
          throw new Error("Terjadi kesalahan, kemungkinan user belum membuat toko")
        }
      }
    );
    return unsubscribe;
  };

  useEffect(() => {
    setLoading(true);
    try {
      onAuthStateChanged(auth, (user) => {
        if (!user) {
          navigate("/login");
          return;
        }

        fetchAndSetStore(user.uid);

        setUser({
          uid: user.uid,
          displayName: user.displayName,
          profileImg: user.photoURL,
          verified: user.emailVerified,
          email: user.email,
        });
      });
    } catch (err) {
      console.error(err);
      navigate('/login')
    } finally{
      setLoading(false)
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

  if (loading || !store) {
    return (
      <div className="flex justify-center items-center h-[100vh] flex-col">
        {/* <img src={loading} alt="" /> */}
        <img src={logo} alt="" className="h-14" />
        <div id="lottie-container" className="w-28" />
        {/* <div>loading</div> */}
      </div>
    );
  } else {
    return (
      <>
      <MobileAdminModal store={store} />      
      <div className="flex flex-col  md:grid md:grid-cols-11 bg-[#F4F4F5]">
        <nav className="md:col-span-2 bg-white">
          <Sidebar store={store} />
        </nav>
        <main className="md:col-span-9 mt-24 md:mt-0">
          <Outlet context={[store, setStore]} />
        </main>
      </div>
      </>
    );
  }
}

export default Layout;
