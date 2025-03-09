import React from 'react';
import './WhyChooseUs.css';

const WhyChooseUs = () => {
  const features = [
    {
      icon: '🏠',
      title: 'Modern & Spacious Apartments',
      description: 'Enjoy stylish, well-furnished apartments with top-tier amenities.',
    },
    {
      icon: '🔒',
      title: 'Secure & Safe Environment',
      description: '24/7 security with CCTV monitoring and controlled access.',
    },
    {
      icon: '⚡',
      title: 'Reliable Utilities',
      description: 'Uninterrupted water, electricity, and high-speed internet.',
    },
    {
      icon: '📍',
      title: 'Prime Location',
      description: 'At the heart of Nyeri close to supermarkets and transport links.',
    },
    {
      icon: '⭐',
      title: 'Excellent Customer Support',
      description: 'Our dedicated team ensures you have a smooth living experience.',
    },
  ];

  return (
    <div className="why-choose-us">
      <h2 className="section-title">Why Choose Us</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
