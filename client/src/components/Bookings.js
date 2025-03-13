import React from "react";
import "../styles.css";

const Bookings = () => {
  const bookings = [
    { id: 1, guest: "John Doe", checkIn: "2025-03-10", checkOut: "2025-03-15", status: "Confirmed" },
    { id: 2, guest: "Jane Smith", checkIn: "2025-03-20", checkOut: "2025-03-25", status: "Pending" },
  ];

  return (
    <div className="page">
      <h1>Bookings</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Guest</th>
            <th>Check-In</th>
            <th>Check-Out</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.guest}</td>
              <td>{booking.checkIn}</td>
              <td>{booking.checkOut}</td>
              <td className={booking.status === "Pending" ? "pending" : "confirmed"}>{booking.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bookings;