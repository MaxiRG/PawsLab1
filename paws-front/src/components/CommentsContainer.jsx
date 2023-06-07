import React, { useState, useEffect } from "react";
import '../styles/CommentsContainer.css'
import { FaUser, FaArrowRight, FaReply } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { post } from '../utils/http'

const CommentsContainer = ({ comments, commentResponses }) => {
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [response, setResponse] = useState("");
  const [responses, setResponses] = useState(commentResponses);
  const token = localStorage.getItem('token')
  const config = {
    headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json', 
}}

useEffect(() => {
  setResponses(commentResponses);
}, [commentResponses]);

  const handleReplyClick = (commentId) => {
    setActiveCommentId(commentId);
  };

  const handleResponseSubmit = (commentId) => {
    if (!token){
      toast.warn("Log in to add a comment")
      return
    }
    const body = {
      text : response,
      type : "COMMENT",
      subjectId : commentId
    }
    post('/createComment', body, config)
    .then((response) => {
      console.log(response);
        // Update commentResponses state with the new response
        const newResponse = {
          id: response.id, // Assuming the API returns the ID of the new response
          text: response.text,
        };
        const updatedResponses = {
          ...responses,
          [commentId]: [...(responses[commentId] || []), newResponse],
        };
        setResponse("");
        setActiveCommentId(null); // Reset active comment
        // Update the commentResponses state
        setResponses(updatedResponses);
        toast.success("Response added successfully!");
    })
    .catch((error) => {
      console.error(error);
      toast.error("Failed to submit response. Please try again later!");
    });
  }
  return (
    <div className='comments-container'>
      {comments.map((comment) => (
        <div className='comment-box' key={comment.id}>
          <FaUser className='user-icon'/>
          {comment.text}
          <FaReply className="reply-icon"  onClick={() => handleReplyClick(comment.id)} />
          {responses[comment.id] && responses[comment.id].map((response) => (
            <div className='response-box' key={response.id}>
              <FaArrowRight className="arrow-icon"/>
              {response.text}
            </div>
          ))}
           {activeCommentId === comment.id && (
            <div className="response-input">
              <input
                type="text"
                placeholder="Enter your response..."
                value={response}
                onChange={(e) => setResponse(e.target.value)}
              />
              <button onClick={() => handleResponseSubmit(comment.id)}>
                Submit
              </button>
            </div>
          )}
        </div>
      ))}
      
      <ToastContainer position='top-center' />
    </div>
  );
};

export default CommentsContainer;
