import React, { useState } from "react";
import "../styles/StarRating.css";
import { post } from "../utils/http"


const StarRating = ({ value, rate, shelterId, config}) => {
  const [hoverValue, setHoverValue] = useState(0);

  const handleStarHover = (hoveredValue) => {
    if (rate) {
      setHoverValue(hoveredValue);
    }
  };

  const handleStarClick = (clickedValue) => {
    if (rate) {
      console.log(`Submitted rating: ${clickedValue}`);
      const body = {
        value : clickedValue,
        subjectId : shelterId
      }
      post('/createReview', body, config)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        
      });
    }
  };

  const handleStarLeave = () => {
    if (rate && hoverValue === 0) {
      setHoverValue(0);
    }
  };

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <span
            key={index}
            className={index <= (hoverValue || value) ? "on" : "off"}
            onMouseEnter={() => handleStarHover(index)}
            onMouseLeave={handleStarLeave}
            onClick={() => handleStarClick(index)}
          >
            &#9733;
          </span>
        );
      })}
    </div>
    
  );
};

export default StarRating;
