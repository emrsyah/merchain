import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import NavbarProfile from "./NavbarProfile";

function NavbarAdmin({ user }) {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const now = new Date().getHours();
    if (4 <= now && now <= 10) {
      setGreeting({
        emoji: "🌄",
        greet: "Selamat Pagi, ",
      });
    } else if (11 <= now && now <= 14) {
      setGreeting({
        emoji: "☀️",
        greet: "Selamat Siang, ",
      });
    } else if (15 <= now && now <= 18) {
      setGreeting({
        emoji: "🌆",
        greet: "Selamat Sore, ",
      });
    } else {
      setGreeting({
        emoji: "🌃",
        greet: "Selamat Malam, ",
      });
    }
  }, []);

  return (
    <nav className="hidden md:flex bg-white py-3 px-5 border-b-[1px] border-b-gray-300 items-center justify-between">
      <h5 className="font-medium text-lg">
        <span className="text-3xl">{greeting.emoji}</span>{greeting.greet} {user.displayName}
      </h5>
      <div className="flex items-center gap-6">
        <Icon
          icon="clarity:notification-outline-badged"
          width="22"
          className="text-purple-600 hover:scale-105 transition-all duration-100 ease-out cursor-pointer"
        />
        {/* <img src={user.profileImg} className="w-10 rounded-full" alt="" /> */}
        <NavbarProfile img={user.profileImg} />
      </div>
    </nav>
  );
}

export default NavbarAdmin;
