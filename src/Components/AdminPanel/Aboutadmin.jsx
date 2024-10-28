import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import downloadicon from "../../assets/downloadicon.png";
import downloadwhite from "../../assets/downloadwhite.png";
import AddArtistForm from "./AddArtistForm";

const Aboutadmin = () => {
  const [artistData, setArtistData] = useState({
    artimage: "",
    about: "",
    resume: "",
    portfolio: "",
  });
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const firstRequest = useRef(true);

  const fetchArtistData = async () => {
    try {
      if (firstRequest.current) {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/art/artist`);
        setArtistData(response.data);
        firstRequest.current = false;
      }
    } catch (error) {
      console.error("Error fetching artist data:", error);
    }
  };

  useEffect(() => {
    fetchArtistData();
  }, []);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_BASE_URL}/art/artist`);
      setArtistData({ artimage: "", about: "", resume: "", portfolio: "" });
      setShowDeletePopup(false);
      alert("Artist data deleted successfully!");
    } catch (error) {
      console.error("Error deleting artist data:", error);
      alert("Failed to delete artist data.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddArtist = () => {
    if (artistData.artimage || artistData.about || artistData.resume || artistData.portfolio) {
      alert("Already have artist data.");
    } else {
      setShowAddPopup(true);
    }
  };

  const hasArtistData = artistData.artimage || artistData.about || artistData.resume || artistData.portfolio;

  return (
    <div className="px-4 md:px-8 lg:px-16">
      <h1 className="text-white my-10 text-center text-4xl font-bold">ABIJITH E A</h1>
      <div className="flex flex-col md:flex-row gap-10 justify-center">
        <div className="text-center flex-shrink-0">
          {artistData.artimage && (
            <img
              src={`${import.meta.env.VITE_BACKEND_BASE_URL}/Uploads/${artistData.artimage}`}
              className="w-40 h-40 md:w-72 md:h-72 lg:w-96 lg:h-96 mx-auto rounded-xl object-cover"
              alt="Artist"
            />
          )}
        </div>
        <div className="max-w-2xl flex-grow">
          <p className="text-white">{artistData.about}</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mt-10">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <button className="mt-6 py-2 px-4 border border-white rounded-full text-white flex items-center justify-center hover:text-black transition-colors">
            <a
              href={`${import.meta.env.VITE_BACKEND_BASE_URL}/Uploads/${artistData.portfolio}`}
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
              href={`${import.meta.env.VITE_BACKEND_BASE_URL}/Uploads/${artistData.resume}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black mr-2"
            >
              Resume
            </a>
            <img src={downloadicon} alt="Download icon" className="w-4" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-4 mt-8">
          {hasArtistData && (
            <button
              className="py-2 px-4 bg-red-500 text-white rounded-full"
              onClick={() => setShowDeletePopup(true)}
            >
              Delete
            </button>
          )}
          <button
            className="py-2 px-4 bg-green-500 text-white rounded-full"
            onClick={handleAddArtist}
          >
            Add
          </button>
        </div>
      </div> 

      {showDeletePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete the artist data?</h2>
            <div className="flex gap-4">
              <button
                className="py-2 px-4 bg-red-500 text-white rounded-full"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
              <button
                className="py-2 px-4 bg-gray-300 text-black rounded-full"
                onClick={() => setShowDeletePopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <AddArtistForm
            setShowAddPopup={setShowAddPopup}
            setArtistData={setArtistData}
            fetchArtistData={fetchArtistData}
          />
        </div>
      )}
    </div>
  );
};

export default Aboutadmin;
