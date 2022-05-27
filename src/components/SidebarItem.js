import { Icon } from "@iconify/react";
import React from "react";
import { Link } from "react-router-dom";

function SidebarItem({locationNow, itemPath, itemName, icon}) {
  return (
    <Link
      to={itemPath}
      className={`sidebarItem ${
        locationNow.pathname.includes(itemPath) && "sidebarActive"
      } `}
    >
      <Icon icon={icon} width="22" />
      <p className="font-medium text-[15px] transition-all duration-300 ease-out">{itemName}</p>
    </Link>
  );
}

export default SidebarItem;
