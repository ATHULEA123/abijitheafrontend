import React, { useState, useEffect } from 'react';
import axios from 'axios';
import downloadicon from '../../assets/downloadicon.png';
import downloadwhite from '../../assets/downloadwhite.png';

const About = () => {
    const [artistData, setArtistData] = useState({
        artimage: '',
        about: '',
        resume: '',
        portfolio: ''
    });

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
        </div>
    );
};

export default About;

