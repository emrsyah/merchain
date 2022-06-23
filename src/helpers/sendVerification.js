import { sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase";

export default async function sendVerification() {
  try {
    await sendEmailVerification(auth.currentUser);
  } catch (err) {
    console.error(err);
    return err
  }
}
