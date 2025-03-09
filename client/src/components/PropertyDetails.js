import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./PropertyDetails.css";
import Footer from "./Footer";

function PropertyDetails() {
  const { id } = useParams();
  const [accommodation, setAccommodation] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedImage, setSelectedImage] = useState(null);
const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetch("/accommodations.json")
      .then((response) => response.json())
      .then((data) => {
        const foundAccommodation = data.accommodations.find(
          (acc) => acc.id === Number(id) 
        );
        setAccommodation(foundAccommodation);
      })
      .catch((error) => console.error("Error fetching accommodations:", error));
  }, [id]);

  if (!accommodation) {
    return <div>Loading...</div>;
  }

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setSelectedImage(accommodation.images[index]);
  };
  
  /*const closeLightbox = (e) => {
    if (e.target.classList.contains("lightbox")) {
      setSelectedImage(null);
    }
  };*/

  const closeLightbox = () => {
    setSelectedImage(null);
  };
  
  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? accommodation.images.length - 1 : prevIndex - 1
    );
    setSelectedImage(accommodation.images[currentImageIndex]);
  };
  
  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) =>
      prevIndex === accommodation.images.length - 1 ? 0 : prevIndex + 1
    );
    setSelectedImage(accommodation.images[currentImageIndex]);
  };

  return (
    <div className="accommodation-booking">
      <div className="property-details">
      <img className="cover-image-property"
        src={accommodation.cover_image}
        alt={accommodation.title}
      />
      <div className="detailsP">
        <h2 className="title">{accommodation.title}</h2>
        <p className="vibe">{accommodation.vibe}</p>
        <p className="price">
          <strong>Beds:</strong> {accommodation.beds}
       </p>
       <Link to={`/booking/${accommodation.id}`}>
          <button className="bookA">Book Now</button>
        </Link>
      </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={activeTab === "description" ? "active" : ""}
          onClick={() => setActiveTab("description")}
        >
          Description
        </button>
        <button
          className={activeTab === "gallery" ? "active" : ""}
          onClick={() => setActiveTab("gallery")}
        >
          Gallery
        </button>
        <button
          className={activeTab === "price" ? "active" : ""}
          onClick={() => setActiveTab("price")}
        >
          Price
        </button>
        <button
          className={activeTab === "reviews" ? "active" : ""}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>

      {selectedImage !== null && (
      <div className="lightbox" onClick={closeLightbox}>
        <div className="lightbox-content">
          <span className="close" onClick={closeLightbox}>&times;</span>
          <button className="prev" onClick={prevImage}>&#10094;</button>
          <img src={accommodation.images[currentImageIndex]} alt="Expanded View" />
         <button className="next" onClick={nextImage}>&#10095;</button>
       </div>
      </div>
)}

      {/* Active Tab Content */}
      <div className="tab-content">
        {activeTab === "description" && (
          <div className="description">
            <h3>About {accommodation.title}</h3>
            <p>{accommodation.description}</p>
          </div>
        )}

        {activeTab === "gallery" && (
          <div className="gallery">
            {accommodation.images?.length > 0 ? (
              accommodation.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`gallery-${index}`}
                  className="gallery-image"
                  onClick={() => openLightbox(index)}
                />
                ))
                ) : (
                <p>No images available.</p>
             )}
           </div>
        )}

        {activeTab === "price" && (
          <div className="price">
            <p>{accommodation.price}</p>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="reviews">
            <h3>Customer Reviews</h3>
            {accommodation.reviews?.length > 0 ? (
              accommodation.reviews.map((review, index) => (
                <div key={index} className="review">
                  <p>
                    <strong>User {review.user_id}</strong> rated {review.rating} stars
                  </p>
                  <p>{review.comment}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default PropertyDetails;