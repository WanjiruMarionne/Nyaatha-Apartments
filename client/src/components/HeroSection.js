import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./HeroSection.css";
import { Link } from 'react-router-dom';

const slides = [
  {
    image: "/images/Mercede/img1.jpg",
    title: "THE PINNACLE OF URBAN LIVING",
    description:
      "Step into refined sophistication with sleek interiors and breathtaking views for a truly urban retreat.",
  },
  {
    image: "/images/Anfo/img1.jpg",
    title: "ELEVATED URBAN LIFESTYLE",
    description: "An exquisite space designed for both relaxation and dynamic city living.",
  },
  {
    image: "/images/Gikondi/img3.jpg",
    title: "DESIGNED FOR CONTEMPORARY LIVING",
    description: "A thoughtfully curated space for everyday comfort, ideal for the modern traveler.",
  },
  {
    image: "/images/Brescia/img3.jpg",
    title: "ELEGANCE IN EVERY DETAIL",
    description: "Every corner exudes charm and sophistication, making it an oasis of style and tranquility.",
  },
  {
    image: "/images/Jacoba/img2.jpg",
    title: "REDEFINING MODERN LIVING",
    description: "A  seamless blend of elegance and comfort, offering the perfect balance for contemporary lifestyles.",
  },
];

const HeroSection = ({ accommodations }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Auto-slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const goNext = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const goPrev = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <header className="hero-section">
      {/* Background Image */}
      <div className="hero-image-container">
        <img src={slides[currentSlide].image} alt="Hero Slide" className="hero-image" />
        <div className="overlay"></div>
      </div>

      {/* Navigation Arrows */}
      <button className="prev-arrow" onClick={goPrev}>
        <FaChevronLeft />
      </button>
      <button className="next-arrow" onClick={goNext}>
        <FaChevronRight />
      </button>

      {/* Dynamic Text Content */}
      <div className="hero-text">
        <h1>{slides[currentSlide].title}</h1>
        <p>{slides[currentSlide].description}</p>
      </div>

      {/* Pagination Dots */}
      <div className="pagination">
        {slides.map((_, index) => (
          <span key={index} className={index === currentSlide ? "dot active" : "dot"}></span>
        ))}
      </div>

      <div className="search-bar">
        <input type="date" className="search-input" placeholder="Check-in" />
        <input type="date" className="search-input" placeholder="Check-out" />
        <select className="search-input">
          <option value="1">1 guest</option>
          <option value="2">2 guests</option>
          <option value="3">3 guests</option>
          <option value="4">4 guests</option>
          <option value="5">5 guests</option>
          <option value="More than 5">More than 5 guests</option>
        </select>
        <Link to={`/accommodations`}>
          <button className="search-button">Search &gt;</button>
        </Link>
      </div>
    </header>
  );
};

export default HeroSection;
