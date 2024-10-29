

import React, { useState, useEffect } from "react";
import axios from "axios";
import rightarrowwhite from "../../assets/rightarrowwhite.png";

const Hero = () => {
  const [backgroundUrl, setBackgroundUrl] = useState("");
  const [fileType, setFileType] = useState("");
  const [isImageLoaded, setIsImageLoaded] = useState(true); 
  const [theme, setTheme] = useState("white");
  useEffect(() => {
    const fetchBackgroundMedia = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/upload-background");
        if (response.data.success && response.data.data) {
          setBackgroundUrl(response.data.data.fileUrl);
          console.log(response.data.data.fileUrl);
          setTheme(response.data.data.theme );
          setFileType(response.data.data.fileType);
        }
      } catch (error) {
        console.error("Error fetching background media:", error);
      }
    };

    fetchBackgroundMedia();
  }, []);

  const textColor = theme === "black" ? "text-black" : "text-white";
  const buttonBorderColor = theme === "black" ? "border-black" : "border-white";
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background media handling */}
      {fileType === "video" && backgroundUrl ? (
        <video
          className="absolute inset-0 object-cover w-full h-full filter blur-sm"
          src={backgroundUrl}
          autoPlay
          loop
          muted
        />
      ) : fileType === "image" && backgroundUrl ? (
        <div
          className="absolute inset-0 bg-cover bg-no-repeat filter blur-sm"
          style={{
            backgroundImage: isImageLoaded ? `url(${backgroundUrl})` : `url('/background.png')`, 
          }}
          onError={() => setIsImageLoaded(false)} 
        ></div>
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-no-repeat filter blur-sm"
          style={{ backgroundImage: "url('/background.png')" }}
        ></div>
      )}

      {/* Content */}
      <div className={`relative z-10 text-center ${textColor} p-4`}>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light animate-slide-up">
          ABIJITH EA
        </h2>
        <p className="text-xs sm:text-sm md:text-lg mt-2 sm:mt-4 animate-fade-in">
          Exploring the Space Between Thought and Form
        </p>
        <div className="flex items-center justify-center">
          <button className={`mt-4 sm:mt-6 py-2 px-4 border ${buttonBorderColor} rounded-full ${textColor} flex items-center justify-center transition-colors animate-fade-in`}>
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
