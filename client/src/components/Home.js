import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import HeroSection from './HeroSection';
import WhyChooseUs from './WhyChooseUs';
import Testimonials from './Testimonials';
import KeyMetrics from './KeyMetrics';

const Home = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const [accommodations, setAccommodations] = useState([]);

  useEffect(() => {
    fetch('/accommodations.json')
      .then((response) => response.json())
      .then((data) => {
        setAccommodations(data.accommodations);
      })
      .catch((error) => console.error('Error fetching accommodations:', error));
  }, []); 

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0; // Ensure it starts from the first item
    }

    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: 2, behavior: 'smooth' }); // Adjust speed
      }
    }, 30);

    return () => clearInterval(interval);
  }, [accommodations]); // Runs again when new properties are added

  return (
    <div className="home-container">
      <div className="full-width-hero">
        <HeroSection />
      </div>

      <div className="content-container">
        <h1 className="home-title new-features-title">Featured Listings</h1>

        {/* Property Cards Carousel */}
        <div className="property-carousel" ref={scrollRef}>
          <div className="property-gallery">
            {accommodations.map((accommodation, index) => (
              <div
                key={index}
                className="property-card"
                onClick={() => navigate(`/accommodation/${accommodation.id}`)}
              >
                <img
                  src={accommodation.cover_image}
                  alt={accommodation.title}
                  className="property-image"
                />
                <div className="property-info">
                  <h3>{accommodation.title}</h3>
                  <p>{accommodation.vibe}</p>
                  <span className="property-price">{accommodation.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <WhyChooseUs />
        <KeyMetrics />
        <Testimonials />
      </div>
    </div>
  );
};

export default Home;
