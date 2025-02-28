import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Booking.css';

function Booking({ accommodation, onBookingConfirm, bookedDates }) {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guestName, setGuestName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const calculateTotal = () => {
    if (checkInDate && checkOutDate && accommodation && accommodation.price) {
      const priceString = accommodation.price;
      const numericPrice = parseFloat(priceString.replace(/[^0-9.-]+/g, '')); // Extract numeric part
      const nights = Math.round((checkOutDate.getTime() - checkInDate.getTime()) / ( 6 * 60 * 24));
      return numericPrice * nights;
    }
    return 0;
  };

  const isDateBooked = (date) => {
    return bookedDates.some(
      (bookedDate) =>
        date.getFullYear() === bookedDate.getFullYear() &&
        date.getMonth() === bookedDate.getMonth() &&
        date.getDate() === bookedDate.getDate()
    );
  };

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
      return (
        <div>
          {day.getDate()}
        </div>
      );
    }
  };

  const handleConfirm = () => {
    if (!checkInDate || !checkOutDate || !guestName || !phoneNumber || !email) {
      alert('Please fill in all details.');
      return;
    }

    // Create a deep copy of checkOutDate
    const copiedCheckOutDate = new Date(checkOutDate.getTime());

    onBookingConfirm({
      accommodationId: accommodation.id,
      checkInDate,
      copiedCheckOutDate, // Pass the copied date
      guestName,
      phoneNumber,
      email,
      totalCost: calculateTotal(),
    });

    setBookingConfirmed(true);
    console.log('WhatsApp message sent to:', phoneNumber);
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
                  filterDate={(date) => !isDateBooked(date)}
                />
              </div>
              <div className="date-picker">
                <label>Check-out</label>
                <DatePicker
                  selected={checkOutDate}
                  onChange={(date) => setCheckOutDate(date)}
                  dayContent={dayContent}
                  minDate={checkInDate ? new Date(checkInDate.getTime() + 86400000) : null}
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
                <p>★5 (3 reviews)</p>
              </div>
              <button className="more-details">More details</button>
            </div>
            <div className="rental-details">
              <p>Rental</p>
              <p>
                KES {accommodation.price} x{' '}
                {checkInDate && checkOutDate
                  ? Math.round((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))
                  : 0}
                nights
              </p>
            </div>
            <div className="total-details">
              <p>
                <strong>Total (KES)</strong>
              </p>
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