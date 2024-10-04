import React, { useState, useEffect } from 'react';
import downloadicon from '../../assets/downloadicon.png';
import downloadwhite from '../../assets/downloadwhite.png';
import axios from 'axios';

const Aboutadmin = () => {
    const [artistData, setArtistData] = useState({
        artimage: '',
        about: '',
        resume: '',
        portfolio: ''
    });

    const [fileData, setFileData] = useState({
        artimage: null,
        resume: null,
        portfolio: null,
        about: ''
    });

    const [action, setAction] = useState('add'); // Tracks whether to add or delete
    const [successMessage, setSuccessMessage] = useState(''); // Success message state

    useEffect(() => {
        const fetchArtistData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/art/artist');
                setArtistData(response.data);
            } catch (error) {
                console.error('Error fetching artist data:', error);
            }
        };

        fetchArtistData();
    }, []);

    const handleAction = async () => {
        const formData = new FormData();
        if (action === 'add') {
            // Add logic
            if (fileData.about) {
                formData.append('about', fileData.about);
            }
            if (fileData.artimage) {
                formData.append('artimage', fileData.artimage);
            }
            if (fileData.resume) {
                formData.append('resume', fileData.resume);
            }
            if (fileData.portfolio) {
                formData.append('portfolio', fileData.portfolio);
            }

            try {
                await axios.post(`http://localhost:3000/art/artist`, formData);
                setSuccessMessage('Data added successfully!'); // Success message for add
            } catch (error) {
                console.error('Error adding data:', error);
            }
        } else {
            // Delete logic
            try {
                await axios.delete(`http://localhost:3000/art/artist`, {
                    data: fileData // send the relevant data to delete
                });
                setSuccessMessage('Data deleted successfully!'); // Success message for delete
            } catch (error) {
                console.error('Error deleting data:', error);
            }
        }

        // Refetch the data after action
        const response = await axios.get('http://localhost:3000/art/artist');
        setArtistData(response.data);
    };

    return (
        <div>
            <h1 className='text-white my-10 text-center text-4xl font-bold'>ABIJITH E A</h1>
            <div className='flex gap-x-10 justify-center'>
                {/* Image Section */}
                <div className='text-center'>
                    {artistData.artimage && (
                        <img src={`http://localhost:3000/Uploads/${artistData.artimage.split('/').pop()}`} className='w-full h-96 mx-auto' alt="Artist" />
                    )}
                </div>
                {/* Text Section */}
                <div className='max-w-2xl'>
                    <p className='text-white'>
                        {artistData.about}
                    </p>
                </div>
            </div>
            <div className='flex items-center justify-center gap-4 mt-10'>
                <button className='mt-6 py-2 px-4 border border-white rounded-full text-white flex items-center justify-center hover:text-black transition-colors'>
                    <a href={`http://localhost:3000/Uploads/${artistData.portfolio.split('/').pop()}`} target="_blank" rel="noopener noreferrer" download className='text-white mr-2'>Portfolio</a>
                    <img src={downloadwhite} alt="Right arrow" className='w-6' />
                </button>
                <button className='mt-6 py-2 px-4 border border-white rounded-full text-white flex items-center justify-center bg-white hover:text-black transition-colors'>
                    <a href={`http://localhost:3000/Uploads/${artistData.resume.split('/').pop()}`} target="_blank" rel="noopener noreferrer" download className='text-black mr-2'>Resume</a>
                    <img src={downloadicon} alt="Download icon" className='w-4' />
                </button>
            </div>

            {/* Add/Delete Buttons Section */}
            <div className='flex flex-col items-center mt-10'>
                {/* Success Message */}
                {successMessage && (
                    <div className='bg-green-500 text-white p-2 rounded mb-4'>
                        {successMessage}
                    </div>
                )}

                {/* Toggle Action */}
                <div className='flex gap-4 mb-4'>
                    <button onClick={() => setAction('add')} className={`py-2 px-4 ${action === 'add' ? 'bg-blue-500' : 'bg-gray-500'} text-white rounded-full`}>
                        Add
                    </button>
                    <button onClick={() => setAction('delete')} className={`py-2 px-4 ${action === 'delete' ? 'bg-red-500' : 'bg-gray-500'} text-white rounded-full`}>
                        Delete
                    </button>
                </div>

                {/* Art Image Upload */}
                <input
                    type="file"
                    onChange={(e) => setFileData(prev => ({ ...prev, artimage: e.target.files[0] }))} 
                    className='mt-4'
                />
                {/* About Text Upload */}
                <textarea
                    placeholder="Add About"
                    rows="4"
                    className="w-full p-2 mt-4"
                    onChange={(e) => setFileData(prev => ({ ...prev, about: e.target.value }))} 
                />
                {/* Resume Upload */}
                <input
                    type="file"
                    onChange={(e) => setFileData(prev => ({ ...prev, resume: e.target.files[0] }))} 
                    className='mt-4'
                />
                {/* Portfolio Upload */}
                <input
                    type="file"
                    onChange={(e) => setFileData(prev => ({ ...prev, portfolio: e.target.files[0] }))} 
                    className='mt-4'
                />

                {/* Preview Section */}
                <div className='mt-4'>
                    {fileData.artimage && (
                        <div>
                            <h3 className='text-white'>Image Preview:</h3>
                            <img src={URL.createObjectURL(fileData.artimage)} alt="Preview" className='w-48 h-48' />
                        </div>
                    )}
                    {fileData.resume && (
                        <div>
                            <h3 className='text-white'>Resume Preview:</h3>
                            <a href={URL.createObjectURL(fileData.resume)} target="_blank" rel="noopener noreferrer" className='text-white underline'>
                                View Resume
                            </a>
                        </div>
                    )}
                    {fileData.portfolio && (
                        <div>
                            <h3 className='text-white'>Portfolio Preview:</h3>
                            <a href={URL.createObjectURL(fileData.portfolio)} target="_blank" rel="noopener noreferrer" className='text-white underline'>
                                View Portfolio
                            </a>
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <button onClick={handleAction} className={`mt-4 py-2 px-4 ${action === 'add' ? 'bg-green-500' : 'bg-red-500'} text-white rounded-full`}>
                    {action === 'add' ? 'Add Data' : 'Delete Data'}
                </button>
            </div>
        </div>
    );
};

export default Aboutadmin;



