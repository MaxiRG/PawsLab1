import React from "react";
import '../styles/CommentsContainer.css'
import { FaUser, FaArrowRight } from 'react-icons/fa';

const CommentsContainer = ({ comments, commentResponses }) => {
  return (
    <div className='comments-container'>
      {comments.map((comment) => (
        <div className='comment-box' key={comment.id}>
          <FaUser className='user-icon'/>{comment.text}
          {commentResponses[comment.id] && commentResponses[comment.id].map((response) => (
            <div className='response-box' key={response.id}>
              <FaArrowRight className="arrow-icon"/>
              {response.text}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CommentsContainer;
