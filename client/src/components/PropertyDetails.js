import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PropertyDetails.css";

function PropertyDetails() {
  const { id } = useParams();
  const [accommodation, setAccommodation] = useState(null);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    fetch("/accommodations.json")
      .then((response) => response.json())
      .then((data) => {
        const foundAccommodation = data.accommodations.find(
          (acc) => acc.id === Number(id) // Ensure proper number comparison
        );
        setAccommodation(foundAccommodation);
      })
      .catch((error) => console.error("Error fetching accommodations:", error));
  }, [id]);

  if (!accommodation) {
    return <div>Loading...</div>;
  }

  return (
    <div className="accommodation-details">
      <img
        src={accommodation.cover_image}
        alt={accommodation.title}
        className="cover-imageA"
      />
      <div className="detailsP">
        <h2 className="title">{accommodation.title}</h2>
        <p className="vibe">{accommodation.vibe}</p>
        <p className="price">
          <strong>Beds:</strong> {accommodation.beds}
       </p>

        <button className="book-now">Book Now</button>
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
            <h3>Photo Gallery</h3>
            {accommodation.images?.length > 0 ? (
              accommodation.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`gallery-${index}`}
                  className="gallery-image"
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
    </div>
  );
}

export default PropertyDetails;