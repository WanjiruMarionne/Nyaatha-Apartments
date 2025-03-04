import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import HeroSection from './HeroSection';
import WhyChooseUs from './WhyChooseUs';
import Testimonials from './Testimonials';
import KeyMetrics from './KeyMetrics';  // Import KeyMetrics Component

const Home = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const [accommodations, setAccommodations] = useState();

  useEffect(() => {
    fetch('/accommodations.json')
      .then((response) => response.json())
      .then((data) => setAccommodations(data.accommodations))
      .catch((error) => {
        console.error('Error fetching accommodations:', error);
      });
  },);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += 1;
      }
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      {/* Full-width Hero Section */}
      <div className="full-width-hero">
        <HeroSection />
      </div>

      {/* Content Section */}
      <div className="content-container">
        <h1 className="home-title new-features-title">Featured Listings</h1>

        {/* Property Cards Carousel */}
        <div className="property-carousel" ref={scrollRef}>
          <div className="property-gallery">
          {accommodations && accommodations.map((accommodation, index) => ( // Conditional rendering here
              <div
                key={index}
                className="property-card"
                onClick={() => navigate(`/accommodation/${accommodation.id}`)}
              >
                <img
                  src={accommodation.cover_image} // Use cover_image
                  alt={accommodation.title}
                  className="property-image"
                />
                <div className="property-info">
                  <h3>{accommodation.title}</h3>
                  <p>{accommodation.vibe}</p> {/* Use vibe */}
                  <span className="property-price">{accommodation.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us Section */}
        <WhyChooseUs />

        {/* Key Metrics Section (Added Below Why Choose Us) */}
        <KeyMetrics />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Slideshow Component */}
        <div className="slideshow-wrapper">
          {/* Add Slideshow component if needed */}
        </div>
      </div>
    </div>
  );
};

export default Home;
