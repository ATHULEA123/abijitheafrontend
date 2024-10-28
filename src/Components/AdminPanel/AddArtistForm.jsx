import React, { useState } from "react";
import axios from "axios";

const AddArtistForm = ({ setShowAddPopup, setArtistData,fetchArtistData }) => {
  const [formData, setFormData] = useState({
    artimage: null,
    about: "",
    resume: null,
    portfolio: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "artimage" || name === "resume" || name === "portfolio") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAdd = async () => {
    const form = new FormData();
    form.append("artimage", formData.artimage);
    form.append("about", formData.about);
    form.append("resume", formData.resume);
    form.append("portfolio", formData.portfolio);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/art/artist`, form);
      setArtistData(response.data);
      fetchArtistData();
      setShowAddPopup(false); 
     
      alert("Artist data added successfully!");
     
    } catch (error) {
      console.error("Error adding artist data:", error);
      alert("Failed to add artist data.");
    }
  };
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <h2 className="text-lg font-semibold mb-4">Add Artist Data</h2>
      <label className="block mb-2 font-semibold">Add Image:</label>
      <input
        type="file"
        name="artimage"
        onChange={handleChange}
        className="mb-4"
      />
      <label className="block mb-2 font-semibold">Description:</label>
      <textarea
        name="about"
        placeholder="Description"
        onChange={handleChange}
        className="mb-4 w-full p-2 border rounded"
      />
      <label className="block mb-2 font-semibold">Add Resume:</label>
      <input
        type="file"
        name="resume"
        onChange={handleChange}
        className="mb-4"
      />
      <label className="block mb-2 font-semibold">Add Portfolio:</label>
      <input
        type="file"
        name="portfolio"
        onChange={handleChange}
        className="mb-4"
      />
      <button
        onClick={handleAdd}
        className="py-2 px-4 bg-green-500 text-white rounded-full"
      >
        Add
      </button>
      <button
        onClick={() => setShowAddPopup(false)}
        className="ml-4 py-2 px-4 bg-gray-300 text-black rounded-full"
      >
        Cancel
      </button>
    </div>
  );
};

export default AddArtistForm;


