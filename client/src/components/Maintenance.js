import React from "react";
import "../styles.css";

const Maintenance = () => {
  const requests = [
    { id: 1, issue: "Leaking Pipe", priority: "High", status: "In Progress" },
    { id: 2, issue: "Broken Elevator", priority: "Medium", status: "Pending" },
  ];

  return (
    <div className="page">
      <h1>Maintenance Requests</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Issue</th>
            <th>Priority</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.issue}</td>
              <td>{request.priority}</td>
              <td className={request.status === "Pending" ? "pending" : "in-progress"}>{request.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Maintenance;