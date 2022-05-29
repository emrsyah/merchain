import { collection, getDocs, query, where } from "firebase/firestore";
import { firestoreDb } from "../firebase";

//   Cek nama toko udh ada atau belum
export default async function checkStoreNameAvailability(storeName) {
  const storeNameLowercase = storeName.toLowerCase()
  const q = query(
    collection(firestoreDb, "stores"),
    where("storeNameLowercase", "==", storeNameLowercase)
  );
  const docSnap = await getDocs(q);
  return docSnap.docs.length;
}
