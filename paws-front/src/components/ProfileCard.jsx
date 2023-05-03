import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaPencilAlt } from 'react-icons/fa';
import '../styles/ProfileCard.css';
import { put } from "../utils/http";

const ProfileCard = ({ name, number, description, email }) => {
  const [showEditDescription, setShowEditDescription] = useState(false);
  const [showEditNumber, setShowEditNumber] = useState(false);
  const [showEditName, setShowEditName] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedNumber, setEditedNumber] = useState(number);
  const [editedName, setEditedName] = useState(name);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

  const handleEditDescription = () => {
    setShowEditDescription(true);
  };
  const handleEditNumber = () => {
    setShowEditNumber(true);
  };
  const handleEditName = () => {
    setShowEditName(true)
  }
  const setName = (newName) => {
    setEditedName(newName);
  }
  const setDescription = (newDescription) => {
    setEditedDescription(newDescription);
  };
  const setNumber = (newNumber) => {
    setEditedNumber(newNumber);
  };

  const handleSaveDescription = () => {
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
    const body = {
      phoneNumber: editedNumber
    }

    put(`/api/modifyPhoneNumber`,body, config) 
        .then((data) => {
            console.log(data);
            setShowEditNumber(false);
            setNumber(editedNumber)
            navigate('/')
        })
        .catch((error) => {
            console.log(error);
            // handle error
        });
  };
  const handleSaveName = () => {
    const body = {
      name: editedName
    }

    put(`/api/modifyName`,body, config) 
        .then((data) => {
            console.log(data);
            setShowEditName(false);
            setName(editedName)
            navigate('/')
        })
        .catch((error) => {
            console.log(error);
            // handle error
        });
  }
 

  return (
    <div className="profile-card">
      <div className="profile-card-header">
        {showEditName ? (
          <div>
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
            <button onClick={handleSaveName}>Save Name</button>
          </div>
          ) : (
          <div>  
            <h2 className="profile-card-name">
              Name: {name} 
              <FaPencilAlt className='pencil' onClick={handleEditName} /></h2>  
          </div>
          )}
          <p className="profile-card-email">
            Email: {email}
          </p> 
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
            <p className="profile-card-description">
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
