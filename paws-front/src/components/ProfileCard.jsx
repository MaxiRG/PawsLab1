import React, { useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import '../styles/ProfileCard.css';
import { put } from "../utils/http";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfileCard = ({ name, number, description, email }) => {
  const [showEditDescription, setShowEditDescription] = useState(false);
  const [showEditNumber, setShowEditNumber] = useState(false);
  const [showEditName, setShowEditName] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedNumber, setEditedNumber] = useState(number);
  const [editedName, setEditedName] = useState(name);
  const MAX_DESCRIPTION_LENGTH = 250;
  const [rows, setRows] = useState(1);
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const handleEditDescription = () => {
    setEditedDescription(description);
    setShowEditDescription(true);
  };

  const handleEditNumber = () => {
    setShowEditNumber(true);
  };

  const handleEditName = () => {
    setShowEditName(true);
  };

  const setName = (newName) => {
    setEditedName(newName);
  };

  const setDescription = (newDescription) => {
    setEditedDescription(newDescription);
  };

  const setNumber = (newNumber) => {
    setEditedNumber(newNumber);
  };

  const handleSaveDescription = () => {
    let truncatedDescription = editedDescription;

    if (editedDescription.length > MAX_DESCRIPTION_LENGTH) {
      truncatedDescription = editedDescription.substring(0, MAX_DESCRIPTION_LENGTH);
    }

    const body = {
      description: truncatedDescription
    };

    put("/api/modifyDescription", body, config)
      .then((data) => {
        console.log(data);
        setShowEditDescription(false);
        setDescription(editedDescription);
        toast.success("Description modified successfully!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSaveNumber = () => {
    const body = {
      phoneNumber: editedNumber
    };

    put(`/api/modifyPhoneNumber`, body, config)
      .then((data) => {
        console.log(data);
        setShowEditNumber(false);
        setNumber(editedNumber);
        toast.success("Phone number modified successfully!");
      })
      .catch((error) => {
        console.log(error);
        // handle error
      });
  };

  const handleSaveName = () => {
    const body = {
      name: editedName
    };

    put(`/api/modifyName`, body, config)
      .then((data) => {
        console.log(data);
        setShowEditName(false);
        setName(editedName);
        toast.success("Name modified successfully!");
      })
      .catch((error) => {
        console.log(error);
        // handle error
      });
  };

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
              Username: {editedName}
              <FaPencilAlt className='pencil' onClick={handleEditName} />
            </h2>
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
              rows={rows}
              onChange={(e) => {
                setEditedDescription(e.target.value);
                setRows(Math.ceil(e.target.value.length / 50)); // Adjust the number 50 according to your preference
              }}
            />
            <button onClick={handleSaveDescription}>Save Description</button>
          </div>
        ) : (
          <div>
            <p className="profile-card-description">
              Description: {editedDescription}
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
              Number: {editedNumber}
              <FaPencilAlt className='pencil' onClick={handleEditNumber} />
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
