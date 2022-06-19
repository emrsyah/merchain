import React from "react";
import { useEffect } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      navigate("/");
    }
  }, []);
  return <div>Checkout</div>;
}

export default Checkout;
