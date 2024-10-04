import React from "react";
import rightarrowwhite from "../../assets/rightarrowwhite.png";

const Hero = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-no-repeat filter blur-sm"
        style={{ backgroundImage: "url('/background.png')" }}
      ></div>
      <div className="relative z-10 text-center text-white">
        <h2 className="text-5xl md:text-7xl font-light animate-slide-up">
          ABIJITH EA
        </h2>
        <p className="text-sm md:text-lg mt-4 animate-fade-in">
          Exploring the Space Between Thought and Form
        </p>
        <div className="flex items-center justify-center">
          <button className="mt-6 py-2 px-4 border border-white rounded-full text-white flex items-center justify-center transition-colors animate-fade-in">
            <a href="/Collections" className="flex flex-row">
              Works
              <img
                src={rightarrowwhite}
                alt="Right arrow"
                className="w-6 ml-2"
              />
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
