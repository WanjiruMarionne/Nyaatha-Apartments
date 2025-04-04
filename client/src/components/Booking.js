import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Booking.css';

function Booking({ accommodation, onBookingConfirm }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guestName, setGuestName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookedDates, setBookedDates] = useState([]);

  // Load booked dates from local storage on component mount
  useEffect(() => {
    const storedBookings = localStorage.getItem('bookedDates');
    if (storedBookings) {
      setBookedDates(JSON.parse(storedBookings));
    }
  }, []);

  // Function to check if a date is already booked
  const isDateBooked = (date) => {
    return bookedDates.some(
      (bookedDate) =>
        date.getFullYear() === new Date(bookedDate).getFullYear() &&
        date.getMonth() === new Date(bookedDate).getMonth() &&
        date.getDate() === new Date(bookedDate).getDate()
    );
  };

  // Custom day content styling for booked dates
  const dayContent = (day) => {
    const date = day.toDate();
    if (isDateBooked(date)) {
      return (
        <div style={{ position: 'relative' }}>
          <span style={{ color: "gold", textDecoration: "line-through", position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', textAlign: 'center' }}>
            {day.getDate()}
          </span>
          <span style={{ color: "transparent" }}>
            {day.getDate()}
          </span>
        </div>
      );
    } else {
      return <div>{day.getDate()}</div>;
    }
  };

  // Get all dates in range (check-in to check-out)
  const getDatesInRange = (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  // Confirm booking and store in local storage
  const handleConfirm = () => {
    if (!checkInDate || !checkOutDate || !guestName || !phoneNumber || !email) {
        alert('Please fill in all details.');
        return;
    }

    const copiedCheckOutDate = new Date(checkOutDate.getTime());

    const newBooking = {
        accommodationId: accommodation.id,
        checkInDate,
        copiedCheckOutDate,
        guestName,
        phoneNumber,
        email,
        totalCost: calculateTotal(),
    };

    // Update booked dates list and save to local storage
    const updatedBookedDates = [
        ...bookedDates,
        ...getDatesInRange(checkInDate, copiedCheckOutDate),
    ];
    setBookedDates(updatedBookedDates);
    localStorage.setItem('bookedDates', JSON.stringify(updatedBookedDates));

    onBookingConfirm(newBooking);

    setBookingConfirmed(true);

    // Generate WhatsApp message link with Mercedes Suite details
    const whatsappNumber = "254727662910"; // Kenya country code (254) included
    const suiteLink = `https://yourwebsite.com/accommodation/${accommodation.id}`; // Replace with actual suite URL
    const reservationSummary = `*Booking Confirmed!* 🎉

🏨 *Accommodation:* ${accommodation.title}
📅 *Check-in:* ${checkInDate.toLocaleDateString()}
📅 *Check-out:* ${checkOutDate.toLocaleDateString()}
👤 *Guest Name:* ${guestName}
📞 *Phone:* ${phoneNumber}
✉️ *Email:* ${email}
💰 *Total Cost:* KES ${calculateTotal()}

🔗 *View Details:* ${suiteLink}

Click below to confirm:
${window.location.href}`;

    const whatsappLink = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(reservationSummary)}`;

    // Open WhatsApp in a new tab
    window.open(whatsappLink, "_blank");
};


  // Total Calculation (UNCHANGED)
  const calculateTotal = () => {
    if (checkInDate && checkOutDate && accommodation && accommodation.price) {
      const priceString = accommodation.price;
      const numericPrice = parseFloat(priceString.replace(/[^0-9.-]+/g, '')); // Extract numeric part
      const nights = Math.round((checkOutDate.getTime() - checkInDate.getTime()) / (6 * 60 * 24));
      return numericPrice * nights;
    }
    return 0;
  };

  return (
    <div className="booking-link">
      {accommodation && (
        <>
          <div className="booking-form">
            <div className="date-pickers">
              <div className="date-picker">
                <label>Check-in</label>
                <DatePicker
                  selected={checkInDate}
                  onChange={(date) => setCheckInDate(date)}
                  dayContent={dayContent}
                  filterDate={(date) => date >= today && !isDateBooked(date)}
                />
              </div>
              <div className="date-picker">
                <label>Check-out</label>
                <DatePicker
                  selected={checkOutDate}
                  onChange={(date) => setCheckOutDate(date)}
                  dayContent={dayContent}
                  minDate={checkInDate ? new Date(checkInDate.getTime() + 86400000) : null}
                  filterDate={(date) => date > checkInDate && !isDateBooked(date)}
                />
              </div>
            </div>
            <div className="form-inputs">
              <input type="text" placeholder="Name" value={guestName} onChange={(e) => setGuestName(e.target.value)} />
              <input type="tel" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <div className="reservation-summary">
            <h3>Reservation Summary</h3>
            <div className="accommodation-details">
              <img src={accommodation.cover_image} alt={accommodation.title} />
              <div className="details">
                <h4>{accommodation.title}</h4>
              </div>
            </div>
            <div className="rental-details">
              <p>Price: </p>
              <p>
                {accommodation.price} x{' '}
                {checkInDate && checkOutDate
                  ? Math.round((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))
                  : 0}
                nights
              </p>
            </div>
            <div className="total-details">
              <p>
                <strong>KES {calculateTotal()}</strong>
              </p>
            </div>
            <div className="guest-details">
              <p><strong>Name:</strong> {guestName}</p>
              <p><strong>Phone:</strong> {phoneNumber}</p>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>From:</strong> {checkInDate ? checkInDate.toLocaleDateString() : 'Not Selected'} </p>
              <p><strong>To:</strong> {checkOutDate ? checkOutDate.toLocaleDateString() : 'Not Selected'}</p>
            </div>
            <button className="confirm-booking" onClick={handleConfirm}>
              Confirm Booking
            </button>
            {bookingConfirmed && (
              <div className="confirmation-message">
                Booking confirmed! Confirmation message sent to WhatsApp.
              </div>
            )}
          </div>
        </>
      )}
      {!accommodation && <div>Loading Accommodation data...</div>}
    </div>
  );
}

export default Booking;
