"use client"

import React from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";

export default function Footer() {

    const scrollToTop = () => {
        document.getElementById('top').scrollIntoView({ behavior: 'smooth' });
      };

  return (
    <div className="scroll-smooth">
      <footer className="bg-gray-800 text-white h-28 flex flex-col justify-center relative mt-auto">
      <div className="text-center mx-auto px-4 sm:px-6 lg:px-8 max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-7xl">
        <div className="text-sm">
          © Copyright
          <strong>
            <span className=""> www.RobertFrost.org</span>
          </strong>
          . All Rights Reserved
        </div>
        <div className="text-xs">
          <span>Designed by </span>
          <a 
              href="#top"
              onClick={scrollToTop}
              className="text-orange-600">
              Synergy - D&D
          </a>
        </div>
      </div>
      <a
        href="#"
        className="absolute xs:right-0 xs:px-1 bottom-9 lg:right-20 flex items-center justify-center"
      >
        <FaArrowAltCircleUp className="text-orange-600 text-4xl" />
      </a>
    </footer>
    </div>
  );
}
