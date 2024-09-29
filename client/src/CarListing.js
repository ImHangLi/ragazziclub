import React, { useState } from 'react';
import './App.css'; // Reuse the styles from App.css

export default function CarListing() {
    const [activeSlide, setActiveSlide] = useState(0);
    const images = [
        "https://example.com/image1.jpg",
        "https://example.com/image2.jpg",
        "https://example.com/image3.jpg"
    ];

    const nextSlide = () => {
        setActiveSlide((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setActiveSlide((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <main className="listing-page">
            <div className="listing-header">
                <h1>2024 Mercedes S-Class</h1>
                <p className="subheader">Redefining Luxury and Comfort</p>
            </div>

            <div className="slideshow">
                <div className="slides">
                    {images.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`Slide ${index}`}
                            className={index === activeSlide ? 'active' : ''}
                        />
                    ))}
                </div>
                <div className="slide-nav">
                    <button onClick={prevSlide}>❮</button>
                    <button onClick={nextSlide}>❯</button>
                </div>
            </div>

            <div className="listing-description">
                <h2>Experience Pure Excellence</h2>
                <p>
                    The 2024 Mercedes S-Class offers unparalleled luxury with state-of-the-art technology,
                    premium materials, and cutting-edge performance. The perfect blend of power and
                    elegance, this car takes your driving experience to a new level.
                </p>
                <p>
                    With advanced safety features, a meticulously crafted interior, and superior
                    handling, the S-Class is in a class of its own.
                </p>
            </div>
        </main>
    );
}