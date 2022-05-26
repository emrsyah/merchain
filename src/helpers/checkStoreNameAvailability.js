import { collection, getDocs, query, where } from "firebase/firestore";
import { firestoreDb } from "../firebase";

//   Cek nama toko udh ada atau belum
export default async function checkStoreNameAvailability(storeName) {
  const q = query(
    collection(firestoreDb, "stores"),
    where("storeName", "==", storeName)
  );
  const docSnap = await getDocs(q);
  return docSnap.docs.length;
}
