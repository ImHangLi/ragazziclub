import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CarForSale.css';

const CarCard = ({ id, brand, model, year, price, image }) => (
  <Link to={`/listing/${id}`} className="car-card">
    <div className="car-image-container">
      <img src={image} alt={`${brand} ${model}`} className="car-image" />
    </div>
    <div className="car-info">
      <h2>{`${year} ${brand} ${model}`}</h2>
      <p className="car-price">${price.toLocaleString()}</p>
    </div>
  </Link>
);

const CarForSale = () => {
  const [cars, setCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState('');
  const carsPerPage = 9;

  useEffect(() => {
    fetch('http://localhost:3001/carListings')
      .then(response => response.json())
      .then(data => {
        setCars(data);
        const uniqueBrands = [...new Set(data.map(car => car.brand))];
        setBrands(uniqueBrands);
      })
      .catch(error => console.error('Error fetching car listings:', error));
  }, []);

  const filteredCars = selectedBrand
    ? cars.filter(car => car.brand === selectedBrand)
    : cars;

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="car-for-sale-container">
      <h1>Cars for Sale</h1>
      
      <div className="filter-section">
        <select 
          className="brand-dropdown"
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
        >
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
      </div>

      <div className="car-grid">
        {currentCars.map((car) => (
          <CarCard key={car.id} {...car} />
        ))}
      </div>

      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          ← Previous
        </button>
        {Array(Math.ceil(filteredCars.length / carsPerPage)).fill().map((_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={currentPage === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(filteredCars.length / carsPerPage)}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default CarForSale;
