// import React, { useState, useEffect } from "react";
// import downloadicon from "../../assets/downloadicon.png";
// import downloadwhite from "../../assets/downloadwhite.png";
// import axios from "axios";
// const Aboutadmin = () => {
//   const [artistData, setArtistData] = useState({
//     artimage: "",
//     about: "",
//     resume: "",
//     portfolio: "",
//   });
//   const [fileData, setFileData] = useState({
//     artimage: null,
//     resume: null,
//     portfolio: null,
//     about: "",
//   });
//   const [action, setAction] = useState("add");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   useEffect(() => {
//     const fetchArtistData = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/art/artist`);
//         setArtistData(response.data);
//       } catch (error) {
//         console.error("Error fetching :", error);
//       }
      
//     };
//     fetchArtistData();
//   }, []);
//   const validateForm = () => {
//     if (action === "add") {
//       if (
//         !fileData.about ||
//         !fileData.artimage ||
//         !fileData.resume ||
//         !fileData.portfolio
//       ) {
//         setErrorMessage("Please fill in all fields before adding.");
//         return false;
//       }
//     }
//     return true;
//   };
//   const handleAction = async () => {
//     if (!validateForm()) return;
//     const formData = new FormData();
//     if (action === "add") {
//       formData.append("about", fileData.about);
//       formData.append("artimage", fileData.artimage);
//       formData.append("resume", fileData.resume);
//       formData.append("portfolio", fileData.portfolio);
//       setLoading(true);
//       try {
//         await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/art/artist`, formData);
//         setSuccessMessage("Data added successfully!");
//         setErrorMessage("");
//         setFileData({
//           artimage: null,
//           resume: null,
//           portfolio: null,
//           about: "",
//         });
//       } catch (error) {
//         console.error("Error adding data:", error);
//         setErrorMessage("Failed to add data.");
//       }
      
//       setLoading(false);
//     } else {
//       setLoading(true);
//       try {
//         await axios.delete(`${import.meta.env.VITE_BACKEND_BASE_URL}/art/artist`, {
//           data: fileData,
//         });
//         setSuccessMessage("Data deleted successfully!");
//         setFileData({
//           artimage: null,
//           resume: null,
//           portfolio: null,
//           about: "",
//         });
//         setErrorMessage("");
//       } catch (error) {
//         console.error("Error deleting data:", error);
//         setErrorMessage("Failed to delete data.");
//       }
      
//       setLoading(false);
//     }
//     const fetchArtistData = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/art/artist`);
//         setArtistData(response.data);
//       } catch (error) {
//         console.error("Error fetching artist data:", error);
//       }
      
//     };
//     await fetchArtistData();
//     setTimeout(() => {
//       setSuccessMessage("");
//     }, 3000);
//   };
//   return (
//     <div className="bg-gray-800 p-8 rounded-lg">
//       <h1 className="text-white my-10 text-center text-4xl font-bold">
//         ABIJITH E A
//       </h1>
//       <div className="flex flex-col md:flex-row gap-x-10 justify-center">
//         <div className="text-center flex-shrink-0">
//           {artistData.artimage && (
//             <img
//               src={`${import.meta.env.VITE_BACKEND_BASE_URL}/Uploads/${artistData.artimage.split("/").pop()}`} 
//               className="w-40 h-40 md:w-72 md:h-72 lg:w-96 lg:h-96 mx-auto rounded-xl object-cover"
//               alt="Artist"
//             />
//           )}
//         </div>
//         <div className="max-w-2xl flex-grow">
//           <p className="text-white">{artistData.about}</p>
//         </div>
//       </div>
//       <div className="flex items-center justify-center gap-4 mt-10 flex-col md:flex-row">
//         <button className="mt-6 py-2 px-4 border border-white rounded-full text-white flex items-center justify-center hover:text-black transition-colors">
//           <a
//             href={`${import.meta.env.VITE_BACKEND_BASE_URL}/Uploads/${artistData.portfolio.split("/").pop()}`} 
//             target="_blank"
//             rel="noopener noreferrer"
//             download
//             className="text-white mr-2"
//           >
//             Portfolio
//           </a>
//           <img src={downloadwhite} alt="Right arrow" className="w-6" />
//         </button>
//         <button className="mt-6 py-2 px-4 border border-white rounded-full text-white flex items-center justify-center bg-white hover:text-black transition-colors">
//           <a
//             href={`${import.meta.env.VITE_BACKEND_BASE_URL}/Uploads/${artistData.resume.split("/").pop()}`} 
//             target="_blank"
//             rel="noopener noreferrer"
//             download
//             className="text-black mr-2"
//           >
//             Resume
//           </a>
//           <img src={downloadicon} alt="Download icon" className="w-4" />
//         </button>
//       </div>
//       <div className="mt-10 flex justify-center items-center flex-col">
//         <h2 className="text-white text-2xl mb-4 text-center">
//           Manage Artist Data
//         </h2>
//         {successMessage && (
//           <div className="bg-green-500 text-white p-2 rounded mb-4 text-center">
//             {successMessage}
//           </div>
//         )}
//         {errorMessage && (
//           <div className="bg-red-500 text-white p-2 rounded mb-4 text-center">
//             {errorMessage}
//           </div>
//         )}
//         <div className="flex justify-center gap-4 mb-4">
//           <button
//             onClick={() => setAction("add")}
//             className={`py-2 px-4 ${
//               action === "add" ? "bg-blue-500" : "bg-gray-500"
//             } text-white rounded-full transition-all`}
//           >
//             Add
//           </button>
//           <button
//             onClick={() => setAction("delete")}
//             className={`py-2 px-4 ${
//               action === "delete" ? "bg-red-500" : "bg-gray-500"
//             } text-white rounded-full transition-all`}
//           >
//             Delete
//           </button>
//         </div>
//         <div className="flex flex-col md:flex-row justify-center items-center gap-5">
//           <div className="flex justify-center items-center ">
//             <div className="bg-gray-700 p-6 rounded-lg shadow-lg w-full md:w-auto  ">
//               <input
//                 type="file"
//                 onChange={(e) =>
//                   setFileData((prev) => ({
//                     ...prev,
//                     artimage: e.target.files[0],
//                   }))
//                 }
//                 className="mt-4 block w-full text-white"
//               />
//               <textarea
//                 placeholder="Add About"
//                 rows="4"
//                 className="w-full p-2 mt-4 bg-gray-800 rounded text-white"
//                 onChange={(e) =>
//                   setFileData((prev) => ({ ...prev, about: e.target.value }))
//                 }
//               />
//               <input
//                 type="file"
//                 onChange={(e) =>
//                   setFileData((prev) => ({
//                     ...prev,
//                     resume: e.target.files[0],
//                   }))
//                 }
//                 className="mt-4 block w-full text-white"
//               />
//               <input
//                 type="file"
//                 onChange={(e) =>
//                   setFileData((prev) => ({
//                     ...prev,
//                     portfolio: e.target.files[0],
//                   }))
//                 }
//                 className="mt-4 block w-full text-white"
//               />
//               <button
//                 onClick={handleAction}
//                 className={`mt-4 py-2 px-4 ${
//                   action === "add" ? "bg-green-500" : "bg-red-500"
//                 } text-white rounded-full w-full`}
//               >
//                 {loading
//                   ? "Processing..."
//                   : action === "add"
//                   ? "Add Data"
//                   : "Delete Data"}
//               </button>
//             </div>
//           </div>
//           <div className="flex flex-col gap-5">
//             {fileData.artimage && (
//               <div>
//                 <h3 className="text-white">Image Preview:</h3>
//                 <img
//                   src={URL.createObjectURL(fileData.artimage)}
//                   alt="Preview"
//                   className="w-48 h-48 object-cover rounded-md"
//                 />
//               </div>
//             )}
//             {fileData.resume && (
//               <div>
//                 <h3 className="text-white">Resume Preview:</h3>
//                 <a
//                   href={URL.createObjectURL(fileData.resume)}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-white underline"
//                 >
//                   View Portfolio
//                 </a>
//               </div>
//             )}
//             {fileData.portfolio && (
//               <div>
//                 <h3 className="text-white"> Portfolio Preview:</h3>
//                 <a
//                   href={URL.createObjectURL(fileData. portfolio)}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-white underline"
//                 >
//                   View Resume
//                 </a>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Aboutadmin;

// Aboutadmin.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import downloadicon from "../../assets/downloadicon.png";
import downloadwhite from "../../assets/downloadwhite.png";
import AddArtistForm from "./AddArtistForm"; // Import the AddArtistForm component

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

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/art/artist`);
        setArtistData(response.data);
      } catch (error) {
        console.error("Error fetching artist data:", error);
      }
    };
    fetchArtistData();
  }, []);


  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_BASE_URL}/art/artist`);
      setArtistData({ artimage: "", about: "Empty", resume: "No resume", portfolio: "No Portfolio" });
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
          {/* Delete button triggers the popup */}
          <button
            className="py-2 px-4 bg-red-500 text-white rounded-full"
            onClick={() => setShowDeletePopup(true)}
          >
            Delete
          </button>
          {/* Add button triggers the add popup */}
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
          />
        </div>
      )}
    </div>
  );
};

export default Aboutadmin;
