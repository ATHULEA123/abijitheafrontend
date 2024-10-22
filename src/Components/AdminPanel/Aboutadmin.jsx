import React, { useState, useEffect } from "react";
import downloadicon from "../../assets/downloadicon.png";
import downloadwhite from "../../assets/downloadwhite.png";
import axios from "axios";
const Aboutadmin = () => {
  const [artistData, setArtistData] = useState({
    artimage: "",
    about: "",
    resume: "",
    portfolio: "",
  });
  const [fileData, setFileData] = useState({
    artimage: null,
    resume: null,
    portfolio: null,
    about: "",
  });
  const [action, setAction] = useState("add");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
  const validateForm = () => {
    if (action === "add") {
      if (
        !fileData.about ||
        !fileData.artimage ||
        !fileData.resume ||
        !fileData.portfolio
      ) {
        setErrorMessage("Please fill in all fields before adding.");
        return false;
      }
    }
    return true;
  };
  const handleAction = async () => {
    if (!validateForm()) return;
    const formData = new FormData();
    if (action === "add") {
      formData.append("about", fileData.about);
      formData.append("artimage", fileData.artimage);
      formData.append("resume", fileData.resume);
      formData.append("portfolio", fileData.portfolio);
      setLoading(true);
      try {
        await axios.post(`http://localhost:3000/art/artist`, formData);
        setSuccessMessage("Data added successfully!");
        setErrorMessage("");
        setFileData({
          artimage: null,
          resume: null,
          portfolio: null,
          about: "",
        });
      } catch (error) {
        console.error("Error adding data:", error);
        setErrorMessage("Failed to add data.");
      }
      setLoading(false);
    } else {
      setLoading(true);
      try {
        await axios.delete(`http://localhost:3000/art/artist`, {
          data: fileData,
        });
        setSuccessMessage("Data deleted successfully!");
        setFileData({
          artimage: null,
          resume: null,
          portfolio: null,
          about: "",
        });
        setErrorMessage("");
      } catch (error) {
        console.error("Error deleting data:", error);
        setErrorMessage("Failed to delete data.");
      }
      setLoading(false);
    }
    const fetchArtistData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/art/artist");
        setArtistData(response.data);
      } catch (error) {
        console.error("Error fetching artist data:", error);
      }
    };
    await fetchArtistData();
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };
  return (
    <div className="bg-gray-800 p-8 rounded-lg">
      <h1 className="text-white my-10 text-center text-4xl font-bold">
        ABIJITH E A
      </h1>
      <div className="flex flex-col md:flex-row gap-x-10 justify-center">
        <div className="text-center flex-shrink-0">
          {artistData.artimage && (
            <img
              src={`http://localhost:3000/Uploads/${artistData.artimage
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
      <div className="flex items-center justify-center gap-4 mt-10 flex-col md:flex-row">
        <button className="mt-6 py-2 px-4 border border-white rounded-full text-white flex items-center justify-center hover:text-black transition-colors">
          <a
            href={`http://localhost:3000/Uploads/${artistData.portfolio
              .split("/")
              .pop()}`}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="text-white mr-2"
          >
            Portfolio
          </a>
          <img src={downloadwhite} alt="Right arrow" className="w-6" />
        </button>
        <button className="mt-6 py-2 px-4 border border-white rounded-full text-white flex items-center justify-center bg-white hover:text-black transition-colors">
          <a
            href={`http://localhost:3000/Uploads/${artistData.resume
              .split("/")
              .pop()}`}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="text-black mr-2"
          >
            Resume
          </a>
          <img src={downloadicon} alt="Download icon" className="w-4" />
        </button>
      </div>
      <div className="mt-10 flex justify-center items-center flex-col">
        <h2 className="text-white text-2xl mb-4 text-center">
          Manage Artist Data
        </h2>
        {successMessage && (
          <div className="bg-green-500 text-white p-2 rounded mb-4 text-center">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="bg-red-500 text-white p-2 rounded mb-4 text-center">
            {errorMessage}
          </div>
        )}
        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={() => setAction("add")}
            className={`py-2 px-4 ${
              action === "add" ? "bg-blue-500" : "bg-gray-500"
            } text-white rounded-full transition-all`}
          >
            Add
          </button>
          <button
            onClick={() => setAction("delete")}
            className={`py-2 px-4 ${
              action === "delete" ? "bg-red-500" : "bg-gray-500"
            } text-white rounded-full transition-all`}
          >
            Delete
          </button>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-5">
          <div className="flex justify-center items-center ">
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg w-full md:w-auto">
              <input
                type="file"
                onChange={(e) =>
                  setFileData((prev) => ({
                    ...prev,
                    artimage: e.target.files[0],
                  }))
                }
                className="mt-4 block w-full text-white"
              />
              <textarea
                placeholder="Add About"
                rows="4"
                className="w-full p-2 mt-4 bg-gray-800 rounded text-white"
                onChange={(e) =>
                  setFileData((prev) => ({ ...prev, about: e.target.value }))
                }
              />
              <input
                type="file"
                onChange={(e) =>
                  setFileData((prev) => ({
                    ...prev,
                    resume: e.target.files[0],
                  }))
                }
                className="mt-4 block w-full text-white"
              />
              <input
                type="file"
                onChange={(e) =>
                  setFileData((prev) => ({
                    ...prev,
                    portfolio: e.target.files[0],
                  }))
                }
                className="mt-4 block w-full text-white"
              />
              <button
                onClick={handleAction}
                className={`mt-4 py-2 px-4 ${
                  action === "add" ? "bg-green-500" : "bg-red-500"
                } text-white rounded-full w-full`}
              >
                {loading
                  ? "Processing..."
                  : action === "add"
                  ? "Add Data"
                  : "Delete Data"}
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            {fileData.artimage && (
              <div>
                <h3 className="text-white">Image Preview:</h3>
                <img
                  src={URL.createObjectURL(fileData.artimage)}
                  alt="Preview"
                  className="w-48 h-48 object-cover rounded-md"
                />
              </div>
            )}
            {fileData.resume && (
              <div>
                <h3 className="text-white">Resume Preview:</h3>
                <a
                  href={URL.createObjectURL(fileData.resume)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline"
                >
                  View Portfolio
                </a>
              </div>
            )}
            {fileData.portfolio && (
              <div>
                <h3 className="text-white"> Portfolio Preview:</h3>
                <a
                  href={URL.createObjectURL(fileData. portfolio)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline"
                >
                  View Resume
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Aboutadmin;
