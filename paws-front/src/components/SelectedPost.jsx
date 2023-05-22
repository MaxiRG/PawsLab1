import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SelectedPost.css';
import Button from 'react-bootstrap/Button';

export default function SelectedPost({ selectedPost, cardShelter, cardPicture }) {
  const navigate = useNavigate();

  const handleNavigateToShelter = () => {
    navigate(`/shelter/${cardShelter.id}`);
  };

  return (
    <div>
      <div className="post-expanded">
        <div className='post-info'>
          <h1 className='post-title'>{selectedPost.petName}</h1>
          <div className='pic-info'>
            <div className='info'>
              <p className='info'><b>Sex:</b> {selectedPost.sex ? 'Male' : 'Female'}</p>
              <p className='info'><b>Age:</b> {selectedPost.age}</p>
              <p className='info'><b>Race:</b> {selectedPost.race}</p>
              <p className='description'><b>Description:</b> {selectedPost.description}</p>
            </div>
            <div className='pic'>
              <img src={cardPicture} alt='imagen' className='dog-pic'/>
            </div>
          </div>
        </div>  
        <div className='shelter-info'>
          <h1 className='shelter-title'>{cardShelter.name}</h1>
          <p className='description'><b>Description:</b> {cardShelter.description}</p>
          <p className='info'><b>Number:</b> {cardShelter.phoneNumber}</p>
          <div>
          <Button className="see-shelter-btn" onClick={handleNavigateToShelter}>
            See Shelter
          </Button>
        </div>
        </div>
        
      </div>     
    </div> 
  );
}
