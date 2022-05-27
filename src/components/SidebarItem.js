import { Icon } from "@iconify/react";
import React from "react";
import { Link } from "react-router-dom";

function SidebarItem({locationNow, itemPath, itemName}) {
  return (
    <Link
      to="/app/home"
      className={`sidebarItem ${
        locationNow.pathname.includes(itemPath) && "sidebarActive"
      } `}
    >
      <Icon icon="bxs:dashboard" width="22" />
      <p className="font-medium">{itemName}</p>
    </Link>
  );
}

export default SidebarItem;
