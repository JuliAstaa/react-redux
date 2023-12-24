import React from "react";
import { FaPhone, FaEnvelope } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="footer flex flex-col">
      <div className="w-full h-auto lg:h-80 mt-4 bg-white flex flex-col lg:flex-row p-4 gap-4">
        <div className="logo w-full lg:w-1/4 h-full flex justify-start lg:justify-center items-center">
          <h1 className="font-bold text-xl">
            Astacumalaka's <span className="text-[#495E57]">Waroeng</span>
          </h1>
        </div>
        <div className="line hidden lg:block w-[1px] h-full bg-black"></div>
        <div className="footer-menu grid grid-cols-1 lg:grid-cols-3 gap-8 w-3/4 ">
          <div className="about-us lg:p-4">
            <h1 className="font-bold text-lg mb-4">About us</h1>
            <p className="text-slate-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
              voluptas fuga explicabo, neque mollitia eligendi iste debitis
              beatae voluptatum ea.
            </p>
          </div>
          <div className="support lg:p-4">
            <h1 className="font-bold text-lg mb-4">Support</h1>
            <ul>
              <li key={"help"}>
                <a
                  href="#"
                  className="font-semibold text-slate-700 hover:text-[#495E57]"
                >
                  Help
                </a>
              </li>
              <li key={"privacy"}>
                <a
                  href="#"
                  className="font-semibold text-slate-700 hover:text-[#495E57]"
                >
                  Privacy & Policy
                </a>
              </li>
            </ul>
          </div>
          <div className="contact lg:p-4">
            <h1 className="font-bold text-lg mb-4">Contact</h1>
            <ul>
              <li key={"phone"}>
                <a
                  href="#"
                  className="font-semibold text-slate-700 hover:text-[#495E57] flex items-center gap-4"
                >
                  <FaPhone />
                  <span> +62 834 8343 3848</span>
                </a>
              </li>
              <li key={"email"}>
                <a
                  href="#"
                  className="font-semibold text-slate-700 hover:text-[#495E57] flex items-center gap-4"
                >
                  <FaEnvelope />
                  astacumalaka@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="copyright p-4 lg:p-0 w-full h-20 text-center flex justify-center items-center bg-[#495E57]">
        <div>
          <span className="text-white text-sm font-semibold">
            Copyright © 2023 Astacumalaka's Waroeng | Created by{" "}
            <a
              href="https://www.instagram.com/juliasta._"
              target="_blank"
              className="hover:underline underline-offset-2"
            >
              juliasta
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
