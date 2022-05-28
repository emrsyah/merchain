import React from "react";
import { Helmet } from "react-helmet-async";
import { useRecoilValue } from "recoil";
import { userState } from "../../atoms/userAtom";
import NavbarAdmin from "../../components/NavbarAdmin";
import VerificationReminder from "../../components/VerificationReminder";

function Orders() {
  const user = useRecoilValue(userState);

  return (
    <>
      <Helmet>
        <title>Orders | Merchain</title>
      </Helmet>
      <NavbarAdmin user={user} />
      <div className="layoutContainer">
        <h1 className="pageName">Orders</h1>
        {!user.verified && <VerificationReminder />}
        
      </div>
    </>
  );
}

export default Orders;
