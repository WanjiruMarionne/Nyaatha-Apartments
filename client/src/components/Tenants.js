import React from "react";
import "../styles.css";

const Tenants = () => {
  const tenants = [
    { id: 1, name: "Alice Johnson", unit: "A-101", rentDue: "$1200", status: "Paid" },
    { id: 2, name: "Mark Smith", unit: "B-205", rentDue: "$1500", status: "Overdue" },
    { id: 3, name: "Lucy Adams", unit: "C-307", rentDue: "$1300", status: "Paid" },
  ];

  return (
    <div className="page">
      <h1>Tenants</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Unit</th>
            <th>Rent Due</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tenants.map((tenant) => (
            <tr key={tenant.id}>
              <td>{tenant.name}</td>
              <td>{tenant.unit}</td>
              <td>{tenant.rentDue}</td>
              <td className={tenant.status === "Overdue" ? "overdue" : "paid"}>{tenant.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tenants;