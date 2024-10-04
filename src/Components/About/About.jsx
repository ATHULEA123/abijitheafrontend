import React, { useState, useEffect } from "react";
import axios from "axios";
import downloadicon from "../../assets/downloadicon.png";
import downloadwhite from "../../assets/downloadwhite.png";
const About = () => {
  const [artistData, setArtistData] = useState({
    artimage: "",
    about: "",
    resume: "",
    portfolio: "",
  });
  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const response = await axios.get("http://13.233.51.183:3000/art/artist");
        setArtistData(response.data);
      } catch (error) {
        console.error("Error fetching artist data:", error);
      }
    };
    fetchArtistData();
  }, []);
  return (
    <div className="px-4 md:px-8 lg:px-16">
      <h1 className="text-white my-10 text-center text-4xl font-bold">
        ABIJITH E A
      </h1>
      <div className="flex flex-col md:flex-row gap-10 justify-center">
        <div className="text-center flex-shrink-0">
          {artistData.artimage && (
            <img
              src={`http://13.233.51.183:3000/Uploads/${artistData.artimage
                .split("/")
                .pop()}`}
              className="w-40 h-40 md:w-72 md:h-72 lg:w-96 lg:h-96 mx-auto rounded-xl object-cover"
              alt="Artist"
            />
          )}
        </div>
        <div className="max-w-2xl flex-grow">
          <p className="text-white">{artistData.about}</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-10">
        <button className="mt-6 py-2 px-4 border border-white rounded-full text-white flex items-center justify-center hover:text-black transition-colors">
          <a
            href={`http://13.233.51.183:3000/Uploads/${artistData.portfolio
              .split("/")
              .pop()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white mr-2"
          >
            Portfolio
          </a>
          <img src={downloadwhite} alt="Right arrow" className="w-6" />
        </button>
        <button className="mt-6 py-2 px-4 border border-white rounded-full text-white flex items-center justify-center bg-white hover:text-black transition-colors">
          <a
            href={`http://13.233.51.183:3000/Uploads/${artistData.resume
              .split("/")
              .pop()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black mr-2"
          >
            Resume
          </a>
          <img src={downloadicon} alt="Download icon" className="w-4" />
        </button>
      </div>
    </div>
  );
};
export default About;
