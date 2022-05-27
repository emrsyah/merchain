import React from "react";
import { Helmet } from "react-helmet-async";
import { useRecoilValue } from "recoil";
import { userState } from "../../atoms/userAtom";
import NavbarAdmin from "../../components/NavbarAdmin";

function Orders() {
  const user = useRecoilValue(userState);

  return (
    <>
      <Helmet>
        <title>Orders | Merchain</title>
      </Helmet>
      <NavbarAdmin user={user} />
      <div>Orders</div>
    </>
  );
}

export default Orders;
