
import React, { useState, useEffect } from "react";
import axios from "axios";
 import AdminNavbar from "./AdminNavbar";
import rightarrowwhite from "../../assets/rightarrowwhite.png";

const AdminPanel = () => {
  const [backgroundUrl, setBackgroundUrl] = useState("");
  const [fileType, setFileType] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const fetchBackgroundMedia = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/upload-background");
      if (response.data.success && response.data.data) {
        setBackgroundUrl(response.data.data.fileUrl);
        setFileType(response.data.data.fileType);
      }
    } catch (error) {
      console.error("Error fetching background media:", error);
    }
  };

  useEffect(() => {
    fetchBackgroundMedia();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.put("http://localhost:3000/api/upload-background", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess(response.data.success);
      fetchBackgroundMedia();
    } catch (error) {
      setError("Error uploading the file.");
      console.error(error);
    } finally {
      setLoading(false);
      setShowForm(false);
    }
  };

  return (
    <>
    <AdminNavbar/>
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
    
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
      <div className="relative z-10 text-center text-white p-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light animate-slide-up">
          ABIJITH EA
        </h2>
        <p className="text-xs sm:text-sm md:text-lg mt-2 sm:mt-4 animate-fade-in">
          Exploring the Space Between Thought and Form
        </p>
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

        {/* Upload Button */}
        <button
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setShowForm(!showForm)}
        >
          Update Background
        </button>

        {/* Conditional Form for Upload */}
        {showForm && (
          <form onSubmit={handleUpload} className="mt-4">
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              required
            />
            <button
              type="submit"
              className="ml-2 px-4 py-2 bg-green-500 text-white rounded"
              disabled={loading}
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
            <button
              type="button"
              className="ml-2 px-4 py-2 bg-red-500 text-white rounded"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </form>
        )}

        {/* Success or Error Message */}
        {success && <p className="mt-4 text-green-500">File uploaded successfully!</p>}
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </div>
    </>
  );
};

export default AdminPanel;
