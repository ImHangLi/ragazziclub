import React, { useState } from 'react';
import './Post.css';

export default function Post({ title, image }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const images = [
    image, // The post image is the first image in the slideshow
    '/listing/image2.jpg',
    '/listing/image3.jpg',
    '/listing/image4.jpg',
    '/listing/image5.jpg',
  ];

  const nextSlide = (e) => {
    e.stopPropagation(); // Prevent the popup from opening
    setActiveSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    setActiveSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handlePopupClick = (e) => {
    if (e.target.classList.contains('popup')) {
      closePopup();
    }
  };

  return (
    <div className="post">
      <div className="image" onClick={openPopup}>
        <img src={images[activeSlide]} alt={title} className="post-image" />
        <div className="arrows">
          <span className="left-arrow" onClick={prevSlide}>&#9664;</span>
          <span className="right-arrow" onClick={nextSlide}>&#9654;</span>
        </div>
      </div>
      <div className="text">
        <h2>
          <a href="/listing" className="titleLink">
            {title}
          </a>
        </h2>
        <a href="/listing" className="readMore">
          read more
        </a>
      </div>

      {isPopupOpen && (
        <div className="popup" onClick={handlePopupClick}>
          <div className="popup-content">
            <span className="close" onClick={closePopup}>&times;</span>
            <img src={images[activeSlide]} alt="Slideshow" className="large-image" />
            <div className="popup-arrows">
              <span className="left-arrow" onClick={prevSlide}>&#9664;</span>
              <span className="right-arrow" onClick={nextSlide}>&#9654;</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}