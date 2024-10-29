import React, { useState, useEffect ,useRef } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import rightarrowwhite from "../../assets/rightarrowwhite.png";

const AdminPanel = ({isDarkMode}) => {
  const [backgroundUrl, setBackgroundUrl] = useState("");
  const [fileType, setFileType] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const firstRequest = useRef(true);
  const [hasData, setHasData] = useState(false); 
  const [theme, setTheme] = useState("white"); // Default theme is white

  const fetchBackgroundMedia = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/upload-background");
      if (response.data.success && response.data.data) {
        setBackgroundUrl(response.data.data.fileUrl);
        setFileType(response.data.data.fileType);
        setTheme(response.data.data.theme || "white"); // Set theme from response
        setHasData(true);  
      } else {
        setBackgroundUrl("");
        setFileType("");
        setHasData(false);  
      }
      firstRequest.current = false;
    } catch (error) {
      console.error("Error fetching background media:", error);
    }
  };

  useEffect(() => {
    if (firstRequest.current) {
      fetchBackgroundMedia();
    }
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("theme", theme); // Add theme to form data

    try {
      const response = await axios.post("http://localhost:3000/api/upload-background", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess("Background uploaded successfully!");
      fetchBackgroundMedia(); 
      setFile(null); 
    } catch (error) {
      setError("Error uploading the background.");
      console.error(error);
    } finally {
      setLoading(false);
      setShowForm(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete("http://localhost:3000/api/upload-background");
      setSuccess("Background deleted successfully!");
      setBackgroundUrl("");
      setFileType(""); 
    } catch (error) {
      setError("Error deleting the background.");
      console.error(error);
    }
  };
  
  const textColor = theme === "white" ? "text-white" : "text-black";
  const buttonBorderColor = theme === "white" ? "border-white" : "border-black";

  return (
    <>
      <AdminNavbar />
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
        <div className={`relative z-10 text-center ${textColor} p-4`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold animate-slide-up">
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

          {!backgroundUrl && (
            <button
              className="mt-6 px-4 py-2 bg-blue-500 {`${isDarkMode ? 'text-black':'text-white'}  rounded"
              onClick={() => setShowForm(true)}
            >
              Add Background
            </button>
          )}

          {showForm && (
            <form onSubmit={handleUpload} className="mt-4">
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                required
              />
              <div className="mt-2 flex space-x-4 justify-center">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="white"
                    checked={theme === "white"}
                    onChange={handleThemeChange}
                    className="form-radio h-5 w-5 text-blue-500 transition duration-150 ease-in-out"
                  />
                  <span>White </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="black"
                    checked={theme === "black"}
                    onChange={handleThemeChange}
                    className="form-radio h-5 w-5 text-blue-500 transition duration-150 ease-in-out"
                  />
                  <span>Black</span>
                </label>
              </div>
              <button
                type="submit"
                className="ml-2 px-4 py-2 bg-green-500 {`${isDarkMode ? 'text-black':'text-white'}  rounded"
                disabled={loading}
              >
                {loading ? "Uploading..." : "Upload"}
              </button>
              <button
                type="button"
                className="ml-2 px-4 py-2 bg-red-500 {`${isDarkMode ? 'text-black':'text-white'}  rounded"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </form>
          )}

          {/* Delete Button */}
          {backgroundUrl && (
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
              onClick={handleDelete}
            >
              Delete Background
            </button>
          )}

          {/* Success or Error Message */}
          {success && <p className="mt-4 text-green-500">{success}</p>}
          {error && <p className="mt-4 text-red-500">{error}</p>}
          {!backgroundUrl && <p className="mt-4 text-red-500">No background media found.</p>}
        </div>
      </div>
    </>
  );
};

export default AdminPanel;


