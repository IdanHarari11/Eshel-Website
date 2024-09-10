"use client"

import React from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";

export default function Footer() {

    const scrollToTop = () => {
        document.getElementById('top').scrollIntoView({ behavior: 'smooth' });
      };

  return (
    <div className="scroll-smooth">
      <footer className="text-white h-28 flex flex-col justify-center relative mt-auto" style={{ backgroundColor: '#4E654A' }}>
      <div className="text-center mx-auto px-4 sm:px-6 lg:px-8 max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-7xl">
        <div className="text-sm">
          {/* <strong>
            <span className=""> www.RobertFrost.org</span>
            </strong> */}
           כל הזכויות שמורות לדב ארמוני
            <span className="ml-1">
              ©  
            </span>
        </div>
      </div>
      <a
        href="#"
        className="absolute xs:right-0 xs:px-1 bottom-9 lg:right-20 flex items-center justify-center"
      >
        <FaArrowAltCircleUp className="text-600 text-4xl" />
      </a>
    </footer>
    </div>
  );
}
