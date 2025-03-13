import React from "react";
import "../styles.css";

const Properties = () => {
  const properties = [
    { id: 1, name: "Ocean View Apartments", type: "Residential", status: "Occupied" },
    { id: 2, name: "Sunrise Commercial Plaza", type: "Commercial", status: "Vacant" },
    { id: 3, name: "Downtown Condo", type: "Residential", status: "Occupied" },
  ];

  return (
    <div className="page">
      <h1>Properties</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.id}>
              <td>{property.name}</td>
              <td>{property.type}</td>
              <td>{property.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Properties;