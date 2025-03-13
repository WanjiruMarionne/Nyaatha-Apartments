import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarComponent.css';

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());

  const onChange = date => {
    setDate(date);
  };

  return (
    <div className="calendar-container">
      <Calendar
        onChange={onChange}
        value={date}
      />
    </div>
  );
};

export default CalendarComponent;