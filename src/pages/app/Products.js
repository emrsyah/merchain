import React from "react";
import { Helmet } from "react-helmet-async";
import { useRecoilValue } from "recoil";
import { userState } from "../../atoms/userAtom";
import NavbarAdmin from "../../components/NavbarAdmin";

function Products() {
  const user = useRecoilValue(userState);

  return (
    <>
      <Helmet>
        <title>Products | Merchain</title>
      </Helmet>
      <NavbarAdmin user={user} />
      <div>
        Products
      </div>
    </>
  );
}

export default Products;
