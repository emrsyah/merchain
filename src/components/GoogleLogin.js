import { Icon } from "@iconify/react";
import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";
import { onboardingState } from "../atoms/onboardingAtom";
import { auth, firestoreDb, googleProvider } from "../firebase";

function GoogleLogin() {
  const navigate = useNavigate()
  const setOnboarding = useSetRecoilState(onboardingState)
  const loginHandler = async () =>{
    try{
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user
      const docSnap = await getDoc(doc(firestoreDb, "users", user.uid))

      //check if user already added in database or not, if not add user to database
      if(docSnap.exists()){
        navigate("/app/home")
      }else{
        setOnboarding(true)
        navigate("/onboarding")
      }
    }
    catch(error){
      console.log(error)
      toast.error(error)
    }
  }

  return (
    <button onClick={loginHandler} className="border-2 border-gray-300 gap-4 rounded-full p-3 font-semibold items-center flex justify-center transition-all duration-300 hover:border-purple-600 cursor-pointer">
      <Icon icon="flat-color-icons:google" width="28" />
      <p>Lanjutkan dengan Google</p>
    </button>
  );
}

export default GoogleLogin;
