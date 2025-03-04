import {React, useState} from "react";
import "./ContactUs.css";
import Footer from "./Footer";

const ContactUs = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const recipientPhone = "254727662910";

    const whatsappURL = `https://wa.me/${recipientPhone}?text=${encodeURIComponent(
      `Phone Number: ${phoneNumber}\nMessage: ${message}`
    )}`;

    window.open(whatsappURL, "_blank");
  };

  return (
    <div>
    <div className="contact-container">
      <div className="contact-content">
        {/* Contact Form */}
        <div className="contact-form">
          <h3>Send us a Message</h3>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Your Name" required />
            <input type="phone number" placeholder="Your Phone Number" required value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <textarea placeholder="Your Message" rows="5" required value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>

        {/* Contact Details */}          
          {/* Google Maps Embed */}
          <div className="map-container">
            <iframe
              title="Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.101442146243!2d36.9482799!3d-0.4214739!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x18285fbc256cb23f%3A0xc09e1cf2ca5d9be!2sNyaatha%20Plaza%20%26%20Apartments!5e0!3m2!1sen!2ske!4v1698947308294"
              width="100%"
              height="250"
              style={{ border: "0" }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
