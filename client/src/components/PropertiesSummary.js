import React from "react";
import "./PropertiesSummary.css";
import { FaBuilding, FaBed } from "react-icons/fa";

const PropertiesSummary = () => {
  return (
    <div className="properties-summary">
      <div>
      <div className="summary-header">
        <FaBed className="icon" />
        <div>
          <h2>20</h2>
          <p>Accommodation</p>
        </div>
      </div>

      <div className="summary-details">
        <div className="summary-box vacant">
          <h3>8</h3>
          <p>Vacant</p>
        </div>
        <div className="summary-box occupied">
          <h3>12</h3>
          <p>Booked</p>
        </div>
      </div>
      </div>

      <div>
      <div className="summary-header">
        <FaBuilding className="icon" />
        <div>
          <h2>100</h2>
          <p>Commercial</p>
        </div>
      </div>

      <div className="summary-details">
        <div className="summary-box vacant">
          <h3>10</h3>
          <p>Vacant</p>
        </div>
        <div className="summary-box occupied">
          <h3>75</h3>
          <p>Occupied</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default PropertiesSummary;