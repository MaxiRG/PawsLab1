import React from 'react';
import '../styles/RequestCard.css'
import { put } from '../utils/http'
import { FaCheck, FaTimes } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const RequestCard = ({ request, onRequestAnswered }) => { 

  const handleRequestResponse = (answer) => {
    const token = localStorage.getItem('token');
    const config = {
              headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json', 
          }}
    put(`/answerRequest/${request.id}/${answer}`, null, config)
      .then((response)=>{
        console.log(response);
        if (answer){
          toast.success("Request accepted")
        }
        else{
          toast.error("Request denied")
        }
      })
      .catch((error)=>{
        console.error(error);
      })
      
      if (onRequestAnswered){
        setTimeout(() => {
          onRequestAnswered(); // Call the parent's callback function after the delay
        }, 1000);
      }
      
  }

  return (
    <div className="request-card">
      <h3 className='petName'>{request.post.petName}</h3>
      <p>{request.adopter.email} wants to adopt this pet!</p>
      <div className="request-actions">
        <Button id="accept-request" className="request-action" onClick={() => handleRequestResponse(true)}>
          <FaCheck />
        </Button>
        <Button id="deny-request" className="request-action" onClick={() => handleRequestResponse(false)}>
          <FaTimes />
        </Button>
      </div>

    </div>
  );
};

export default RequestCard;
