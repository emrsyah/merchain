import React from "react";
import { Helmet } from "react-helmet-async";
import { useRecoilValue } from "recoil";
import { userState } from "../../atoms/userAtom";
import NavbarAdmin from "../../components/NavbarAdmin";

function Setting() {
  const user = useRecoilValue(userState);

  return (
    <>
      <Helmet>
        <title>Setting | Merchain</title>
      </Helmet>
      <NavbarAdmin user={user} />
      Setting
    </>
  );
}

export default Setting;
