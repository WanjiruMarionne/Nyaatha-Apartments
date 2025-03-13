import React from 'react';
import './RecentListing.css';

const RecentListing = ({ listings }) => {
  return (
    <div className="recent-listing-container">
      <h2 className="recent-listing-title">Recent Ratings</h2>
      <div className="recent-listing-list">
        {listings.map(listing => (
          <div key={listing.id} className="recent-listing-item">
            <div className="recent-listing-details">
              <h3 className="recent-listing-item-title">{listing.title}</h3>
              <p className="recent-listing-item-location">{listing.location}</p>
              <p className="recent-listing-item-price">{listing.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentListing;