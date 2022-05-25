import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import logo from "../assets/merchainLogo.svg";

function Footer() {
  return (
    <footer className="flex justify-between items-center py-8 px-16 border-t-[1px] border-t-gray-300">
      <div className="flex items-center gap-6 font-semibold">
        <img src={logo} alt="" />
        <Link to="faq" className="hover:text-purple-600">
          FAQ
        </Link>
        <Link to="login" className="hover:text-purple-600">
          Login
        </Link>
      </div>
      <div className="flex items-center gap-6 w-full justify-end">
        <a href="https://instagram.com" className="hover:text-purple-600">
          <Icon icon="akar-icons:instagram-fill" width="24" />
        </a>
        <a href="https://youtube.com" className="hover:text-purple-600">
          <Icon icon="ant-design:youtube-outlined" width="30" />
        </a>
        <a href="https://twitter.com" className="hover:text-purple-600">
          <Icon icon="lucide:twitter" width="26" />
        </a>
        <a href="https://twitter.com" className="hover:text-purple-600">
          <Icon icon="akar-icons:github-fill" width="24" />
        </a>
      </div>
      <div></div>
    </footer>
  );
}

export default Footer;
