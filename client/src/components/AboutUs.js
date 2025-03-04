import React from 'react';
import './AboutUs.css'; 
import Footer from "./Footer";

const AboutUs = () => {
  return ( 
    <div id="about-us" className="about-us-container">
      <div className="about-us-content">
          <div
            className='about-cover'
            style={{ backgroundImage: `url(/assets/about1.jpg)` }}
            >
            <div className='cover-p'>
              <h1>Discover Nyaatha Plaza </h1>
            </div>
          </div>
        <div className='about-body'>
          <div className='about-title'>
            <h1 className="title">About Nyaatha Plaza</h1>
            <p>Nyaatha plaza stands as a symbol of compassion, excellence, and progress. It was inspired by the legacy of Blessed Irene Stefani, affectionately known as Nyaatha—a Kikuyu word meaning “mother of mercy”.</p>
            <p>It embodies the spirit of care and hospitality that defined Blessed Irene's life and is rooted in a tradition of service and community upliftment.</p>
          </div>
        <h2 className="subtitle">A Vision of Growth and Community</h2>
        <div className='description-about'>
          <img src="/assets/about1.jpg" alt="Mission" />
          <div>
            <p>Nyaatha Plaza is owned by the Archdiocese of Nyeri. It is a vibrant hub designed to meet the diverse needs of businesses, residents, and visitors. </p>
            <p>The 10-level mixed-use development seamlessly blends commerce, luxury, and hospitality, offering a dynamic mix of retail shops, professional offices, and premium accommodations in the heart of Nyeri town. With state-of-the-art amenities, secure facilities, and a commitment to excellence, it is a testament to the growth and transformation of Nyeri as a commercial and cultural epicenter.</p>
            <p>At Nyaatha Plaza, we are committed to creating an exceptional experience for everyone who walks through our doors.</p>
          </div>
        </div>
        <h2 className="subtitle">A Space for Every Need</h2>
        <div className='values'>
          <ul className="feature-list">
            <li className="feature-item"><strong>Premium Commercial Spaces:</strong> A dynamic business environment with anchor tenants such as I&M Bank and Caritas Microfinance Bank, alongside a variety of retail and office spaces.</li>
            <li className="feature-item"><strong>Luxury Residences:</strong> Stylish, modern apartments designed for comfort and convenience in the heart of Nyeri. Our well-furnished short-term stays offer travelers a true home away from home.</li>
          </ul>
          <img src="/assets/about4.jpg" alt="Values" />
        </div>
        <h2 className="subtitle">Our Story</h2>
        <div className='vision'>
          <img src="/assets/about3.jpg" alt="Vision" />
          <div>
            <p>The journey of Nyaatha Plaza began with a bold vision—to create a modern, multi-purpose space that fosters business growth, hospitality, and community development in Nyeri. The project was spearheaded by Archbishop Anthony Muheria, whose leadership and dedication to sustainable development have been instrumental in bringing this vision to life.</p>
            <p>Construction commenced in December 2022, under the expert hands of Endeavours Construction Company Ltd, with architectural design by Skan Consult. In just 17 months, the project was completed, and on May 1, 2024, Nyaatha Plaza was officially inaugurated by Archbishop Hubertus van Megen, the Apostolic Nuncio to Kenya and South Sudan.</p>
            <p>Named in honor of Blessed Irene Stefani (Nyaatha), this plaza stands as a beacon of progress, service, and excellence, reflecting the compassionate legacy of the beloved missionary who dedicated her life to the people of Nyeri.</p>
            </div>
        </div>
        <h2 className="subtitle">Our Commitment to Nyeri</h2>
        <div className='commitment'>
          <p>We are proud to be a part of the vibrant Nyeri community. We are dedicated to contributing to the town's economic growth and providing a valuable resource for residents and visitors alike.</p>
          <img src="/assets/about0.jpeg" alt="Vision" />
        </div>
        <h2 className="subtitle">Visit Us</h2>
        <div className='visit-us'>
          <p>Whether you're looking for a prime business location, a luxurious residence, or a short-term stay, Nyaatha Plaza is the place to be. Step into a space where tradition meets modernity, and experience the heartbeat of Nyeri’s progress.</p>
          <div className="visit-us-details">
            <div className="contact-info">
              <p> 📍 Location: Nyeri Town, Kenya</p>
              <p> 📞 Contact Us: +254705690135</p>
              <p> 📧 Email: info@nyaathaplaza.com</p>
            </div>
            <div className="visit-map">
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
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default AboutUs;
