import React from "react";
import rightarrowwhite from "../../assets/rightarrowwhite.png";

const Hero = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with blur */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat filter blur-sm"
        style={{ backgroundImage: "url('/background.png')" }}
      ></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white p-4">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light animate-slide-up">
          ABIJITH EA
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm md:text-lg mt-2 sm:mt-4 animate-fade-in">
          Exploring the Space Between Thought and Form
        </p>

        {/* Button */}
        <div className="flex items-center justify-center">
          <button className="mt-4 sm:mt-6 py-2 px-4 border border-white rounded-full text-white flex items-center justify-center transition-colors animate-fade-in">
            <a href="/Collections" className="flex flex-row items-center">
              Works
              <img
                src={rightarrowwhite}
                alt="Right arrow"
                className="w-4 h-4 sm:w-6 sm:h-6 ml-2"
              />
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;

