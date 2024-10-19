import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./slider.css"
const Collections = () => {
  const [artworks, setArtworks] = useState([]);
  const [filter, setFilter] = useState("all"); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await fetch("http://13.233.51.183:3000/getallart");
        const data = await response.json();
       
        
        setArtworks(data);
      } catch (error) {
        console.error("Error fetching artworks:", error);
      }
    };

    fetchArtworks();
  }, []);

  const handleArtworkClick = (artwork) => {
    navigate(`/artwork/${artwork._id}`, { state: { artwork } });
  };

  const filteredArtworks =
    filter === "all"
      ? artworks
      : artworks.filter((artwork) => artwork.arttype.toLowerCase() === filter);

  return (
    <>
      <div className="w-1/6 p-5 rounded-lg shadow-md hover:bg-black hover:text-white transition duration-300 animate-fade-in">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="select-filter  p-2 border rounded text-black bg-gray-200 hover:bg-black hover:text-white focus:outline-none focus:bg-black focus:text-white transition duration-300 "
        >
          <option value="all">All</option>
          <option value="painting">Painting</option>
          <option value="sculpture">Sculpture</option>
          <option value="installation">Installation</option>
          <option value="sketches">Sketches</option>
          <option value="public art">Public Art</option>
        </select>
      </div>
      <div className="flex justify-between ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 p-5 flex-1 lg:gap-y-20 ">
          {filteredArtworks.length > 0 ? (
            filteredArtworks.map((artwork, index) => (
              <div
                key={artwork._id}
                className="works_img cursor-pointer transform hover:scale-105 transition duration-500 ease-in-out animate-slide-up"
                onClick={() => handleArtworkClick(artwork)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={artwork.artimage[0]}
                  className="w-full h-80 object-cover rounded-2xl"
                  alt={artwork.artname}
                />
                <div className="text-content">
                  <p className="text-white py-2">{artwork.artname}</p>
                  <p className="text-white">{artwork.arttype}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white animate-fade-in">No artworks available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Collections;
