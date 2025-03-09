import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaCalendarAlt } from "react-icons/fa";
import "./ScheduleViewing.css";

const ScheduleViewing = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const toggleCalendar = () => setShowCalendar(!showCalendar);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const confirmAppointment = () => {
    if (selectedDate) {
      alert(`Appointment confirmed for ${selectedDate.toDateString()}`);
      setShowCalendar(false);
    } else {
      alert("Please select a date first.");
    }
  };

  return (
    <div className="schedule-container">
      <button className="schedule-btn" onClick={toggleCalendar}>
        <FaCalendarAlt className="icon" size={18} />
        Schedule Appointment
      </button>

      {showCalendar && (
        <div className="calendar-container">
          <Calendar onChange={handleDateChange} value={selectedDate} />

          {/* Always Show Confirm Button */}
          <button className="confirm-btn" onClick={confirmAppointment}>
            Confirm Appointment
          </button>
        </div>
      )}
    </div>
  );
};

export default ScheduleViewing;
