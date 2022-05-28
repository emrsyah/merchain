import React from "react";
import { Helmet } from "react-helmet-async";
import { useRecoilValue } from "recoil";
import { userState } from "../../atoms/userAtom";
import NavbarAdmin from "../../components/NavbarAdmin";
import VerificationReminder from "../../components/VerificationReminder";

function Setting() {
  const user = useRecoilValue(userState);

  return (
    <>
      <Helmet>
        <title>Setting | Merchain</title>
      </Helmet>
      <NavbarAdmin user={user} />
      <div className="layoutContainer">
        <h1 className="pageName">Settings</h1>
        {!user.verified && <VerificationReminder />}
      </div>
    </>
  );
}

export default Setting;
