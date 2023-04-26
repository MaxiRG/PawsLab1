import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaPencilAlt } from 'react-icons/fa';
import '../styles/ProfileCard.css';
import { put } from "../utils/http";

const ProfileCard = ({ name, number, description, email }) => {
  const [showEditDescription, setShowEditDescription] = useState(false);
  const [showEditNumber, setShowEditNumber] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedNumber, setEditedNumber] = useState(number);
  const navigate = useNavigate();

  const handleEditDescription = () => {
    setShowEditDescription(true);
  };

  const handleEditNumber = () => {
    setShowEditNumber(true);
  };

  const setDescription = (newDescription) => {
    // Update local state for description
    setEditedDescription(newDescription);
  };

  const setNumber = (newNumber) => {
    // Update local state for number
    setEditedNumber(newNumber);
  };

  // Handler for saving edited description
  const handleSaveDescription = () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const body = {
      description: editedDescription
    }

    put("/api/modifyDescription",body, config)
      .then((data) => {
        console.log(data);
        setShowEditDescription(false);
        setDescription(editedDescription)
        navigate('/')
        
        
      })
      .catch((error) => {
        console.log(error);
        // handle error
      });
  };


  const handleSaveNumber = () => {
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`, 
            'Content-Type': 'application/json', 
        },
    };
    const body = {
      phoneNumber: editedNumber
    }

    put(`/api/modifyPhoneNumber`,body, config) 
        .then((data) => {
            console.log(data);
            setShowEditNumber(false);
            setNumber(editedNumber)
            
        })
        .catch((error) => {
            console.log(error);
            // handle error
        });
  };


  return (
    <div className="profile-card">
      <div className="profile-card-header">
        <h2 className="profile-card-name">Name: {name}</h2>
        <p className="profile-card-number">Email: {email}</p>
        {showEditDescription ? (
          <div>
            <input
              type="text"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
            <button onClick={handleSaveDescription}>Save Description</button>
          </div>
        ) : (
          <div>
            <p className="profile-card-number">
              Description: {description}
              <FaPencilAlt className='pencil' onClick={handleEditDescription} />
            </p>
          </div>
        )}
        {showEditNumber ? (
          <div>
            <input
              type="text"
              value={editedNumber}
              onChange={(e) => setEditedNumber(e.target.value)}
            />
            <button onClick={handleSaveNumber}>Save Number</button>
          </div>
        ) : (
          <div>
            <p className="profile-card-number">
              Number: {number}
              <FaPencilAlt className='pencil' onClick={handleEditNumber} />
            </p>
          </div>
        )}
      </div>

    </div>
  );
};

export default ProfileCard;
