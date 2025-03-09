import React from 'react';
import './KeyMetrics.css'; // Create a CSS file for styling

const KeyMetrics = () => {
  const metrics = [
    { title: 'Number of Businesses', value: 'Over 20 businesses' },
    { title: 'Daily visitors', value: 'Over 200' },
    { title: 'Residential Bookings This Month', value: 235},
    { title: 'Customer Satisfaction', value: '96%' },
  ];

  return (
    <div className="key-metrics-container">
      <h2 className="metrics-title">Key Metrics</h2>
      <div className="metrics-grid">
        {metrics.map((metric, index) => (
          <div key={index} className="metric-card">
            <h3>{metric.value}</h3>
            <p>{metric.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyMetrics;
