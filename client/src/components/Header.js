import React, { useState } from "react";
import Calendar from "react-calendar"; // Install using: yarn add react-calendar
import "react-calendar/dist/Calendar.css";
import "./Header.css";

const Header = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <header className="header-container">
      <div className="user-profile">
        <span>Welcome User 1</span>
      </div>

      <div className="date-container" onClick={toggleCalendar}>
        <span className="date-display">
          {selectedDate.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </span>
        {showCalendar && (
          <div className="calendar-popup">
            <Calendar onChange={setSelectedDate} value={selectedDate} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;