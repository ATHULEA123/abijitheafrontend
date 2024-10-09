
import React, { useMemo, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Iframe from 'react-iframe';

const DebouncedIframe = ({ src, debounceTime = 300, ...props }) => {
  const [iframeSrc, setIframeSrc] = useState(src); 

  useEffect(() => {
    const handler = setTimeout(() => {
      setIframeSrc(src);
    }, debounceTime);

    return () => {
      clearTimeout(handler);
    };
  }, [src, debounceTime]);

  return <Iframe url={iframeSrc} {...props} />; // Use iframeSrc for the Iframe URL
};

const ArtworkPage = React.memo(() => {
  const location = useLocation();
  const artwork = location.state.artwork;
  const images = artwork.artimage;

  const getYoutubeEmbedUrl = (url) => {
    const youtubeRegex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(youtubeRegex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  const youtubeEmbedUrl = useMemo(() => getYoutubeEmbedUrl(artwork.artvedio), [artwork.artvedio]);

  return (
    <div className="container mx-auto px-8 py-0">
      <div className="flex justify-center">
        <div className="w-full md:w-3/4">
          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation={true}
            className="rounded-lg shadow-md custom-swiper"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`Artwork ${index + 1}`}
                  className="w-full h-64 sm:h-80 md:h-screen object-cover rounded-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="mt-8 flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3 p-4 bg-gray-100 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Details</h2>
          <p className="text-gray-600">{artwork.description}</p>
        </div>
        <div className="md:w-1/3 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
           Art
          </h2>
          <div className="text-gray-700 space-y-3">
            <p><strong>Title:</strong> {artwork.artname}</p>
            <p><strong>Art Type:</strong> {artwork.arttype}</p>
            <p><strong>Art Size:</strong> {artwork.artsize}</p>
            <p><strong>Medium:</strong> {artwork.medium}</p>
            <p><strong>Year:</strong> {artwork.year}</p>
            <p><strong>Exhibition:</strong> {artwork.exhibition}</p>
            <p><strong>Location:</strong> {artwork.location}</p>
          </div>
        </div>
      </div>
      <div className="mt-4 mb-0 md:mt-9 md:mb-16 flex flex-col justify-center items-center ">
        <h2 className=" font-medium mb-4 md:mb-9 text-white">Watch the Artist in Action</h2>
        <DebouncedIframe
          src={youtubeEmbedUrl}
          width="100%"
          height="100%"
          display="initial"
          position="relative"
          className="w-full max-w-full h-auto md:h-screen object-fit rounded-lg"
          allowFullScreen
        />
      </div>
    </div>
  );
});

export default ArtworkPage;
