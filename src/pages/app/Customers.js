import React from "react";
import { Helmet } from "react-helmet-async";
import { useRecoilValue } from "recoil";
import { userState } from "../../atoms/userAtom";
import NavbarAdmin from "../../components/NavbarAdmin";

function Customers() {
  const user = useRecoilValue(userState);

  return (
    <>
      <Helmet>
        <title>Customers | Merchain</title>
      </Helmet>
      <NavbarAdmin user={user} />
      Customers
    </>
  );
}

export default Customers;
