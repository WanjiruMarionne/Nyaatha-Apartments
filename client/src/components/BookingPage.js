import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Booking from './Booking';

function BookingPage() {
  const { id } = useParams();
  const [accommodation, setAccommodation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookedDates, setBookedDates] = useState({});

  useEffect(() => {
    fetch('/accommodations.json')
      .then((response) => response.json())
      .then((data) => {
        const foundAccommodation = data.accommodations.find(
          (acc) => acc.id === parseInt(id)
        );
        setAccommodation(foundAccommodation);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching accommodation:', error);
        setLoading(false);
      });
  }, [id]);

  const handleBookingConfirm = (bookingDetails) => {
    console.log('Booking confirmed:', bookingDetails);
    // Update booked dates
    const accommodationId = bookingDetails.accommodationId;
    const newBookedDates = { ...bookedDates };
    if (!newBookedDates[accommodationId]) {
      newBookedDates[accommodationId] = [];
    }
    const dates = [];
    let currentDate = bookingDetails.checkInDate;
    while (currentDate <= bookingDetails.checkOutDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    newBookedDates[accommodationId] = [...newBookedDates[accommodationId], ...dates];
    setBookedDates(newBookedDates);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!accommodation) {
    return <div>Accommodation not found.</div>;
  }

  return (
    <Booking
      accommodation={accommodation}
      onBookingConfirm={handleBookingConfirm}
      bookedDates={bookedDates[accommodation.id] || []}
    />
  );
}

export default BookingPage;