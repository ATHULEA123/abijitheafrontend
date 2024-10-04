
import React, { useEffect, useState } from "react";
import rightarrowwhite from "../../assets/rightarrowwhite.png";
import AdminNavbar from "./AdminNavbar";
import ConfirmationModal from "../AdminPanel/ConfirmationModal "; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 import {faEllipsisVertical} from "@fortawesome/free-solid-svg-icons";

const AllWork = () => {
  const [artworks, setArtworks] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); 
  const [artworkToDelete, setArtworkToDelete] = useState(null); 
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await fetch("http://localhost:3000/getallart");
        const data = await response.json();
        setArtworks(data);
      } catch (error) {
        console.error("Error fetching artworks:", error);
      }
    };

    fetchArtworks();
  }, []);

  const handleEdit = (id) => {
    console.log("Editing artwork with id:", id);
  };

  const handleDelete = async (id) => {
    setModalOpen(true);
    setArtworkToDelete(id);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/deleteart/${artworkToDelete}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setArtworks(
          artworks.filter((artwork) => artwork._id !== artworkToDelete)
        );
        console.log("Artwork deleted successfully");
      } else {
        console.error("Failed to delete artwork");
      }
    } catch (error) {
      console.error("Error deleting artwork:", error);
    } finally {
      setModalOpen(false); 
      setArtworkToDelete(null);
    }
  };

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const filteredArtworks = filter === "all" 
    ? artworks 
    : artworks.filter(artwork => artwork.arttype === filter);

  return (
    <>
      <AdminNavbar />
      <div className="flex mx-5">
        {/* Filter Section */}
        <div className="w-1/4 p-5 rounded-lg shadow-md mr-5">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)} 
            className="w-full p-2 border border-gray-400 rounded"
          >
            <option value="all">All</option>
            <option value="painting">Painting</option>
            <option value="sculpture">Sculpture</option>
            <option value="installation">Installation</option>
            <option value="sketches">Sketches</option>
            <option value="publicart">Public Art</option>
          </select>
        </div>

        {/* Add Work Button */}
        <div className="flex items-center justify-end w-full">
          <button className="mt-6 py-2 px-4 border border-white rounded-full text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors">
            <a href="/AddWork">Add Work</a>
          
            <img src={rightarrowwhite} alt="Right arrow" className="w-6" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-24 p-10">
        {filteredArtworks.length > 0 ? (
          filteredArtworks.map((artwork) => (
            <div key={artwork._id} className="works_img relative">
              <img
                src={artwork.artimage[0]}
                className="w-full h-80 object-cover"
                alt={artwork.artname}
              />
              <div className="text-content">
                <p className="text-white py-2">{artwork.artname}</p>
                <p className="text-white">{artwork.arttype}</p>
              </div>

              <div className="absolute top-2 right-0">
                <div className="dropdown inline-block relative">
                  <button
                    onClick={() => toggleDropdown(artwork._id)}
                    className="text-slate-500 py-2 px-4 rounded inline-flex items-center"
                  >
                    <FontAwesomeIcon icon={faEllipsisVertical} className="text-black font-bold text-2xl" />
                  </button>
                  {dropdownOpen === artwork._id && (
                    <ul className="dropdown-menu absolute right-0 rounded-md shadow-lg text-white flex flex-col bg-white p-2">
                      
                      <li>
                        <button
                          onClick={() => handleDelete(artwork._id)}
                          className="block hover:bg-gray-200 py-1 p-2 text-black text-center text-xs font-bold w-full rounded-md"
                        >
                          Delete
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white">No artworks available</p>
        )}
      </div>

      <ConfirmationModal
        isOpen={modalOpen}
        onConfirm={confirmDelete}
        onCancel={() => setModalOpen(false)}
      />
    </>
  );
};

export default AllWork;




