import React, { useState } from "react";
import "./CarListing.css"; // Add a new CSS file for specific styles

export default function CarListing() {
    const [activeSlide, setActiveSlide] = useState(0);

    // Replace these URLs with actual car image URLs
    const images = [
        "https://hips.hearstapps.com/hmg-prod/images/2022-mercedes-benz-s500-4matic-109-1642184016.jpg?crop=0.647xw:0.548xh;0.116xw,0.313xh&resize=2048:*",
        "https://hips.hearstapps.com/hmg-prod/images/2022-mercedes-benz-s500-4matic-102-1642184016.jpg?crop=1xw:1xh;center,top&resize=980:*",
        "https://hips.hearstapps.com/hmg-prod/images/2022-mercedes-benz-s500-4matic-101-1642184014.jpg?crop=1xw:1xh;center,top&resize=980:*",
        "https://hips.hearstapps.com/hmg-prod/images/2022-mercedes-benz-s500-4matic-103-1642184013.jpg?crop=1xw:1xh;center,top&resize=980:*",
        "https://hips.hearstapps.com/hmg-prod/images/2022-mercedes-benz-s500-4matic-104-1642184013.jpg?crop=1xw:1xh;center,top&resize=980:*"
    ];

    const nextSlide = () => {
        setActiveSlide((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setActiveSlide((prev) => (prev - 1 + images.length) % images.length);
    };

    const selectSlide = (index) => {
        setActiveSlide(index);
    };

    return (
        <main className="listing-container">
            <div className="left-side">
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
                    <div className="dots">
                        {images.map((_, index) => (
                            <span
                                key={index}
                                className={index === activeSlide ? 'dot active' : 'dot'}
                                onClick={() => selectSlide(index)}
                            ></span>
                        ))}
                    </div>
                </div>

                <div className="tiled-images">
                    {images.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`Tile ${index}`}
                            onClick={() => selectSlide(index)}
                            className={index === activeSlide ? 'selected' : ''}
                        />
                    ))}
                </div>
            </div>

            <div className="right-side">
                <h1>2024 Mercedes S-Class</h1>
                <p className="description">Luxury redefined. The ultimate driving experience.</p>

                <div className="specifications">
                    <h2>Specifications</h2>
                    <ul>
                        <li>Engine: 4.0L V8</li>
                        <li>Power: 496 hp</li>
                        <li>Transmission: 9-speed automatic</li>
                        <li>0-60 mph: 3.7 seconds</li>
                    </ul>
                </div>

                <div className="contact-info">
                    <h2>Contact Us</h2>
                    <p><span role="img" aria-label="phone">📞</span> +1 (800) 123-4567</p>
                    <p><span role="img" aria-label="email">✉️</span> contact@luxurycars.com</p>
                </div>
            </div>
        </main>
    );
}