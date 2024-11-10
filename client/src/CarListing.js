// CarListing.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./CarListing.css";

export default function CarListing({ carId }) {
  const [car, setCar] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [defaultContact, setDefaultContact] = useState(null); // State for default contact

  const navigate = useNavigate(); // Initialize useNavigate

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };



  useEffect(() => {
    // Fetch car details
    fetch(`http://localhost:3001/carListings/${carId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setCar(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
        console.error("Fetch error for car: ", err);
      });


    // Fetch Default Contact information
    fetch('http://localhost:3001/default_contact')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok for Default Contact')
        }
        return response.json();
    })
    .then(defaultContactData => {
        setDefaultContact(defaultContactData[0]); // Assuming default_contact is an array with one object
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation for Default Contact:', error);
        // Handle the error, e.g., set an error state
    });


  }, [carId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!car) return <div>Car not found.</div>;
  if (!defaultContact) return <div>Loading Default Contacts...</div>  //If Default contact is not loaded yet


  const images = car.images || [];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const selectSlide = (index) => {
    setActiveSlide(index);
  };

  const contact = car.alt_contact || defaultContact || {};  //Now corrected to use defaultContact


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
                className={index === activeSlide ? "active" : ""}
                style={{display: index === activeSlide ? 'block' : 'none'}} // Fix for slideshow
              />
            ))}
          </div>
          <div className="slide-nav"> {/* Add navigation buttons */}
                <button onClick={prevSlide} disabled={images.length <= 1}>❮</button>
                <button onClick={nextSlide} disabled={images.length <= 1}>❯</button>
          </div>
          <div className="dots">
            {images.map((_, index) => (
              <span
                key={index}
                className={index === activeSlide ? "dot active" : "dot"}
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
              className={index === activeSlide ? "selected" : ""}
            />
          ))}
        </div>

        <div className="specifications">
          <h2>Specifications</h2>
          <hr />
          <ul>
            {car.specifications &&
              Object.entries(car.specifications).map(([key, value]) => (
                <li key={key}>
                  {key}: {value}
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div className="right-side">
      <button className="back-button" onClick={handleGoBack}>
          ← Back to Listings{" "}
        </button>
      <h1>
          {car.year} {car.brand} {car.model}
        </h1>
        <h2>{car.location}</h2>
        <p className="description">{car.description}</p>

        <p className="description2">Starting at ${car.price.toLocaleString()}</p>

        <div className="contact-info">
          <h2>Contact {contact.name}</h2>

          <div className="contact-details"> {/* Added wrapper for better styling */}
            <img src={contact.photo} alt={contact.name} className="contact-photo" />
            {contact.phone && <p><span role="img" aria-label="phone">📞</span> {contact.phone}</p>} {/* Conditional rendering & phone icon */}
            {contact.email && <p><span role="img" aria-label="email">✉️</span> {contact.email}</p>} {/* Conditional rendering & email icon */}
          </div>

        </div>
      </div>
    </main>
  );
}