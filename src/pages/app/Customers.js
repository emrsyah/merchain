import React from "react";
import { Helmet } from "react-helmet-async";
import { useRecoilValue } from "recoil";
import { userState } from "../../atoms/userAtom";
import NavbarAdmin from "../../components/NavbarAdmin";
import VerificationReminder from "../../components/VerificationReminder";

function Customers() {
  const user = useRecoilValue(userState);

  return (
    <>
      <Helmet>
        <title>Customers | Merchain</title>
      </Helmet>
      <NavbarAdmin user={user} />
      <div className="layoutContainer">
        <h1 className="pageName">Customers</h1>
        {!user.verified && <VerificationReminder />}
      </div>
    </>
  );
}

export default Customers;
