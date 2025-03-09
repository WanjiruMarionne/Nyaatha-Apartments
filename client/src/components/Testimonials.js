import React, { useState, useEffect } from 'react';
import './Testimonials.css';

const testimonialsData = [
  {
    name: 'Name 1',
    review: 'Great service by the team at Nyaatha.',
    image: '/assets/testimonials.jpeg',
  },
  {
    name: 'Name 2',
    review: 'Well furnished and great rooms!',
    image: '/assets/testimonials.jpeg',
  },
  {
    name: 'Name 3',
    review: 'Excellent service and support! I highly recommend it.',
    image: '/assets/testimonials.jpeg',
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
    }, 4000); // Auto-slide every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="testimonials-container">
      <h2 className="testimonials-title">What Our Clients Say</h2>
      <div className="testimonial-card">
        <img src={testimonialsData[currentIndex].image} alt={testimonialsData[currentIndex].name} className="testimonial-image" />
        <p className="testimonial-review">"{testimonialsData[currentIndex].review}"</p>
        <h4 className="testimonial-name">- {testimonialsData[currentIndex].name}</h4>
      </div>
    </div>
  );
};

export default Testimonials;
