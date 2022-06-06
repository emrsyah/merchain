import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";

export default async function setFirestoreStorage(img, id, col){
  const storageRef = ref(storage, `${col}/${id}`);
  const uploadTask = await uploadBytesResumable(storageRef, img);
  const url = await getDownloadURL(uploadTask.ref);
  return url;
};
