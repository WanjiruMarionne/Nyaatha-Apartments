import React from "react";
import "./CommercialSpacesList.css";
import { FaMapMarkerAlt, FaBuilding, FaUsers, FaPhone } from "react-icons/fa";
import ScheduleViewing from "./ScheduleViewing";
import Footer from "./Footer";

// Dummy tenant data
const tenants = [
  { id: 1, name: "Pacis Insurance", industry: "Insurance", logo: "https://via.placeholder.com/80" },
  { id: 2, name: "Caritas", industry: "Banking", logo: "https://via.placeholder.com/80" },
  { id: 3, name: "I&M", industry: "Banking", logo: "https://via.placeholder.com/80" }
];

function CommercialSpaces () {
  return (
    <div>
    <div className="commercial-spaces">
      <section className="hero">
        <h1>Where Businesses Thrive</h1>
        <p>Secure Your Ideal Commercial Space Today!</p>
        <ScheduleViewing />
      </section>

      {/* About Section */}
      <section className="about">
        <h2>About Our Commercial Spaces</h2>
        <div className="features">
          <div className="feature"><FaBuilding /> <p>Modern Infrastructure</p></div>
          <div className="feature"><FaUsers /> <p>Thriving Business Community</p></div>
          <div className="feature"><FaMapMarkerAlt /> <p>Prime Location</p></div>
        </div>
      </section>

      {/* Existing Tenants */}
      <section className="tenants">
        <h2>Our Existing Tenants</h2>
        <div className="tenants-grid">
          {tenants.map((tenant) => (
            <div key={tenant.id} className="tenant-card">
              <img src={tenant.logo} alt={tenant.name} />
              <h3>{tenant.name}</h3>
              <p>{tenant.industry}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
    <Footer />
    </div>
  );
};

export default CommercialSpaces;
