import React, { useState } from "react";
import "./StartRating.css"; // Import CSS file

export default function StarRating({ totalStars = 5 }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="star-rating">
      {Array.from({ length: totalStars }, (_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={index}
            className={`star ${starValue <= (hover || rating) ? "filled" : ""}`}
            onClick={() => setRating(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
          >
            {starValue <= (hover || rating) ? (
              <span className="filled-star">&#9733;</span>
            ) : (
              <span className="empty-star">&#9734;</span>
            )}
          </span>
        );
      })}
    </div>
  );
}
