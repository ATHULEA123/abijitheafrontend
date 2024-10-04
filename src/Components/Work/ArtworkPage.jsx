import React from "react";
import { useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const ArtworkPage = () => {
  const location = useLocation();
  const artwork = location.state.artwork;
  const images = artwork.artimage;

  const getYoutubeEmbedUrl = (url) => {
    const youtubeRegex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(youtubeRegex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  return (
    <div className="container mx-auto p-8">
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
                  className="w-full h-auto rounded-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <style jsx>{`
          .custom-swiper .swiper-button-next,
          .custom-swiper .swiper-button-prev {
            width: 40px;
            height: 40px;
            color: #333;
          }
          @media (max-width: 500px) {
            .custom-swiper .swiper-button-next,
            .custom-swiper .swiper-button-prev {
              width: 25px;
              height: 25px;
            }
            .custom-swiper .swiper-button-next::after,
            .custom-swiper .swiper-button-prev::after {
              font-size: 12px; /* Reduce arrow size for smaller screens */
            }
          }
        `}</style>
      </div>
      <div className="mt-8 flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3 p-4 bg-gray-100 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          <p className="text-gray-600">{artwork.description}</p>
        </div>
        <div className="md:w-1/3 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
            Art Details
          </h2>
          <div className="text-gray-700 space-y-3">
            <p>
              <strong>Title:</strong> {artwork.artname}
            </p>
            <p>
              <strong>Art Type:</strong> {artwork.arttype}
            </p>
            <p>
              <strong>Art Size:</strong> {artwork.artsize}
            </p>
            <p>
              <strong>Medium:</strong> {artwork.medium}
            </p>
            <p>
              <strong>Year:</strong> {artwork.year}
            </p>
            <p>
              <strong>Exhibition:</strong> {artwork.exhibition}
            </p>
            <p>
              <strong>Location:</strong> {artwork.location}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-24 mb-24 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-semibold mb-4">
          Watch the Artist in Action
        </h2>
        <div className="flex justify-center"></div>
        <iframe
          className="w-full md:w-2/3 h-64 md:h-96 rounded-lg"
          src={getYoutubeEmbedUrl(artwork.artvedio)}
          title="Artist Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default ArtworkPage;
