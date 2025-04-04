import React, { useEffect, useState } from 'react';
import './Accommodations.css';
import { Link } from 'react-router-dom';
import Footer from "./Footer";

function Accommodations() {
  const [accommodations, setAccommodations] = useState([]);

  useEffect(() => {
    fetch('/accommodations.json')
      .then((response) => response.json())
      .then((data) => setAccommodations(data.accommodations))
      .catch((error) => {
        console.error('Error fetching accommodations:', error);
      });
  }, []);

  return (
    <div>
    <div className="accommodations">
      {accommodations.map((accommodation) => (
        <div key={accommodation.id} className="accommodation-card">
          <div className="image-section">
            <img
              src={accommodation.cover_image}
              alt={accommodation.title}
              className="cover-imageA"
            />
          </div>
          <div className="details-section">
            <h2 className="title">{accommodation.title}</h2>
            <p className="vibe"> | {accommodation.vibe}</p>
            <div className="property-info">
              <p>
                <strong>BEDS:</strong> {accommodation.beds}
              </p>
              <p>
                <strong>PRICE:</strong> {accommodation.price}
              </p>
            </div>
            <div className="buttons">
              <Link to={`/accommodation/${accommodation.id}`}>
                <button className="detailsA">Details</button>
              </Link>
              <Link to={`/booking/${accommodation.id}`}>
                <button className="bookA">Book Now</button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
    <Footer />
    </div>
  );
}

export default Accommodations;