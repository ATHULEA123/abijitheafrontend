import React, { useState } from "react";
import listicon from "../../assets/listicon.png";
import returnarrow from "../../assets/returnarrow.png";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="flex justify-between items-center py-6 px-8">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-white">ABIJITH EA</h1>
      </div>
      <div className="flex">
        <ul className=" hidden md:flex gap-6">
          <li>
            <a
              href="/"
              className="text-white text-md font-medium hover:underline"
            >
              HOME
            </a>
          </li>
          <li>
            <a
              href="/Collections"
              className="text-white text-md font-medium hover:underline"
            >
              WORKS
            </a>
          </li>
          <li>
            <a
              href="/about"
              className="text-white text-md font-medium hover:underline"
            >
              ABOUT
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className="text-white text-md font-medium hover:underline"
            >
              GET IN TOUCH
            </a>
          </li>
        </ul>
        <img
          onClick={() => {
            setIsVisible(true);
          }}
          src={listicon}
          className="w-9 sm:hidden absolute right-5 top-5 "
          alt=""
        />
      </div>
      <div
        className={`fixed h-full bottom-0 right-0 top-0 overflow-hidden bg-white  transition-all duration-700 ease-in-out  z-40 ${
          isVisible ? "w-full" : "w-0"
        } `}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => {
              setIsVisible(false);
            }}
            className="flex items-center p-3"
          >
            <img src={returnarrow} alt="" className="w-5" />
            <p>Back</p>
          </div>
          <ul className="flex flex-col gap-2">
            <li>
              <a href="/" className="text-black text-sm  py-2 pl-6 ">
                HOME
              </a>
            </li>
            <li>
              <a href="/Collections" className="text-black text-sm  py-2 pl-6 ">
                WORKS
              </a>
            </li>
            <li>
              <a href="/about" className="text-black text-sm  py-2 pl-6 ">
                ABOUT
              </a>
            </li>
            <li>
              <a href="/contact" className="text-black text-sm  py-2 pl-6 ">
                GET IN TOUCH
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
