import React, { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import Default from "../../assets/Default.png";
import axios from "axios";

const AddWork = () => {
  const [artName, setArtName] = useState("");
  const [artType, setArtType] = useState("");
  const [artSize, setArtSize] = useState("");
  const [medium, setMedium] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [exhibition, setExhibition] = useState("");
  const [location, setLocation] = useState("");
  const [files, setFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [vedio, setVedio] = useState("");

  const handleFileChange = (files) => {
    const previews = Array.from(files).map((file) => URL.createObjectURL(file));
    setFiles((prevFiles) => [...prevFiles, ...files]);
    setFilePreviews((prevPreviews) => [...prevPreviews, ...previews]);
  };

  const handleFileInputChange = (e) => {
    handleFileChange(e.target.files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFileChange(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const formData = new FormData();
    formData.append("artname", artName);
    formData.append("arttype", artType);
    formData.append("artsize", artSize);
    formData.append("medium", medium);
    formData.append("year", year);
    formData.append("description", description);
    formData.append("exhibition", exhibition);
    formData.append("location", location);
    formData.append("artvedio", vedio);

    files.forEach((file) => {
      formData.append("artImage", file);
    });

    try {
      const response = await axios.post(
        "http://localhost:3000/postart",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Form submitted successfully:", response.data);
      setSuccessMessage("Artwork submitted successfully!");
      // Clear form fields after successful submission
      setArtName("");
      setArtType("");
      setArtSize("");
      setMedium("");
      setYear("");
      setVedio("");
      setDescription("");
      setExhibition("");
      setLocation("");
      setFiles([]);
      setFilePreviews([]);
    } catch (error) {
      console.error("Error uploading the form:", error);
      setErrorMessage("Failed to submit artwork. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="flex justify-center">
        <div className="flex-1 flex justify-center items-center my-16">
          <form className="w-full max-w-4xl" onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-3 mb-6 gap-y-8">
              {/* Writing Part */}
              <div className="w-full md:w-1/2 px-3 gap-y-8">
                <div className="w-full px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                    htmlFor="grid-art-name"
                  >
                    Art Name
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-art-name"
                    type="text"
                    placeholder="Title"
                    value={artName}
                    onChange={(e) => setArtName(e.target.value)}
                  />
                </div>
                <div className="w-full px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                    htmlFor="grid-art-type"
                  >
                    Art Type
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-art-type"
                    type="text"
                    placeholder="Type"
                    value={artType}
                    onChange={(e) => setArtType(e.target.value)}
                  />
                </div>
                <div className="w-full px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                    htmlFor="grid-art-size"
                  >
                    Art Size
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-art-size"
                    type="text"
                    placeholder="Size"
                    value={artSize}
                    onChange={(e) => setArtSize(e.target.value)}
                  />
                </div>
                <div className="w-full px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                    htmlFor="grid-medium"
                  >
                    Medium
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-medium"
                    type="text"
                    placeholder="Medium"
                    value={medium}
                    onChange={(e) => setMedium(e.target.value)}
                  />
                </div>
                <div className="w-full px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                    htmlFor="grid-year"
                  >
                    Year
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-year"
                    type="text"
                    placeholder="Year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                </div>
                <div className="w-full px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                    htmlFor="grid-description"
                  >
                    Description
                  </label>
                  <textarea
                    className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-description"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="w-full px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                    htmlFor="grid-exhibition"
                  >
                    Exhibition
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-exhibition"
                    type="text"
                    placeholder="Exhibition"
                    value={exhibition}
                    onChange={(e) => setExhibition(e.target.value)}
                  />
                  {/* artvediolink */}
                  <label
                    className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                    htmlFor="grid-videolink"
                  >
                    videolink
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-videolink"
                    type="text"
                    placeholder="videolink"
                    value={vedio}
                    onChange={(e) => setVedio(e.target.value)}
                  />
                </div>
                <div className="w-full px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                    htmlFor="grid-location"
                  >
                    Location
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-location"
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>

              {/* Image Part */}
              <div className="w-full md:w-1/2 px-3 gap-y-8">
                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
                  Product Gallery
                </label>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <i className="fa-solid fa-image text-4xl text-gray-400 mb-4"></i>
                  <img src={Default} alt="" />
                  <input
                    type="file"
                    className="hidden"
                    id="upload-images"
                    name="artImage"
                    onChange={handleFileInputChange}
                    multiple
                  />
                  <label
                    htmlFor="upload-images"
                    className="cursor-pointer text-blue-600 mt-4 inline-block"
                  >
                    Browse
                    <br />
                    <span className=" text-red-600 font-cs ">Max-size 2MB</span>
                  </label>
                </div>
                <div className="mt-4">
                  {filePreviews.map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      alt={`Preview ${index}`}
                      className="w-20 h-20 object-cover m-2"
                    />
                  ))}
                </div>
              </div>
            </div>
            {loading && <p className="text-yellow-500">Loading...</p>}
            {successMessage && (
              <p className="text-green-500">{successMessage}</p>
            )}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

            <div className="flex items-center justify-between mt-8">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
                disabled={loading}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddWork;
