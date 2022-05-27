import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";
import { userState } from "../../atoms/userAtom";
import Sidebar from "../../components/Sidebar";
import { auth, firestoreDb } from "../../firebase";

function Layout() {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);
  const [store, setStore] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchAndSetStore = (uid) => {
    onSnapshot(
      query(collection(firestoreDb, "stores"), where("userId", "==", uid)),
      (snapshot) => {
        setStore(snapshot.docs[0].data());
      }
    );
  };

  useEffect(() => {
    setLoading(true);
    try {
      onAuthStateChanged(auth, (user) => {
        if (!user) {
          navigate("/login");
        }
        console.log(user)
        fetchAndSetStore(user.uid);
        setUser({ uid: user.uid, displayName: user.displayName, profileImg: user.photoURL, verified: user.emailVerified, email: user.email });
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col  md:grid md:grid-cols-11 bg-[#F4F4F5]">
      <nav className="md:col-span-2 md:col-start-1 md:col-end-3 bg-white">
        <Sidebar store={store} />
      </nav>
      <main className="md:col-span-9 mt-24 md:mt-0 md:col-start-3">
        <Outlet context={[store, setStore]} />
      </main>
    </div>
  );
}

export default Layout;
