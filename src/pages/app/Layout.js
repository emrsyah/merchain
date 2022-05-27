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
          // toast.info("Tolong login dahulu");
        }
        fetchAndSetStore(user.uid);
        setUser({ uid: user.uid });
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
    <div className="grid grid-cols-11">
      <nav className="col-span-2">
        <Sidebar store={store} />
      </nav>
      <main className="col-span-9">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
