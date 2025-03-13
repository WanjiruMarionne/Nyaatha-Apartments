import React from 'react';
import './ResidentLeaderboard.css';

const ResidentLeaderboard = ({ residents }) => {
  return (
    <div className="leaderboard-container">
      <h2 className="recent-listing-title">Upcoming Bookings</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th className="table-header">Name</th>
            <th className="table-header">Date</th>
            <th className="table-header">Phone Number</th>
            <th className="table-header">Bedrooms</th>
          </tr>
        </thead>
        <tbody>
          {residents.map(resident => (
            <tr key={resident.name}>
              <td className="table-cell">{resident.name}</td>
              <td className="table-cell">{resident.lastActive}</td>
              <td className="table-cell">{resident.scoring}</td>
              <td className="table-cell">{resident.scoring}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResidentLeaderboard;