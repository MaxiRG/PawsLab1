import "../styles/StarRating.css";
import React from "react";

const StarRating = ({ value }) => {

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <span
            key={index}
            className={index <= value ? "on" : "off"}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
};

export default StarRating