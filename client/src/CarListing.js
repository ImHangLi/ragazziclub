import React, { useState, useEffect } from "react";
import "./CarListing.css"; // Add a new CSS file for specific styles

export default function CarListing() {
    const [activeSlide, setActiveSlide] = useState(0);

    // Replace these URLs with actual car image URLs
    const images = [
        "/listing/image1.jpg",
        "/listing/image2.jpg",
        "/listing/image3.jpg",
        "/listing/image4.jpg",
        "/listing/image5.jpg"
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

    // Reinitialize tiles when returning from another page
    useEffect(() => {
        setActiveSlide(0);  // Reset active slide on component mount
    }, []);

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

                {/* Moved specifications to the left-side below images */}
                <div className="specifications">
                    <h2>Specifications</h2>
                    <hr /> {/* Added dividing line below the header */}
                    <ul>
                        <li>Engine: 4.0L V8</li>
                        <li>Power: 496 hp</li>
                        <li>Transmission: 9-speed automatic</li>
                        <li>0-60 mph: 3.7 seconds</li>
                    </ul>
                </div>
            </div>

            <div className="right-side">
                <h1>2024 Mercedes S-Class</h1>
                <h2>Sydney, Australia</h2>
                <p className="description">The 2024 Merceds S-Class is a luxury sedan that combines cutting-edge technology with elegant design.
                    It features a 4.0L V8 engine that produces 496 hp and can accelerate from 0-60 mph in just 3.7 seconds. The interior is
                    equipped with the latest MBUX infotainment system and a 12.8-inch OLED touchscreen display. The S-Class also offers
                    advanced safety features such as adaptive cruise control and lane-keeping
                    assist.
                </p>
                <p className="description">
                    The 2024 Mercedes S-Class is available in a range of colors and trims to suit your style. Contact us today to schedule a test drive!
                </p>
                <p className="description2">Starting at $110,000</p>

                <div className="contact-info">
                    <h2>Contact Us</h2>
                    <p><span role="img" aria-label="phone">📞</span> +1 (800) 123-4567</p>
                    <p><span role="img" aria-label="email">✉️</span> contact@RAGAZZICLUB.com</p>
                </div>
            </div>
        </main>
    );
}