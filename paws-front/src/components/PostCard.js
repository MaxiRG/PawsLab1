import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Form } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import '../styles/PostCard.css'


function PostCard(props) {
  const { post, picture, handleSelectedPost, handleMarkAsAdopted, clickable, handleFavourite } = props;
  const [isFavorite, setIsFavorite] = useState(false);

  const handleCheckboxChange = (postId, checked) => {
    if (handleMarkAsAdopted) {
      handleMarkAsAdopted(postId, checked);
    }
  };

  const handleClick = () => {
    if (clickable && handleSelectedPost) {
      handleSelectedPost(post);
    }
  };

  const handleStarClick = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Card className="custom-card" onClick={handleClick} style={clickable ? { cursor: 'pointer' } : {}}>
      <Card.Img className='card-img' variant="top" src={picture} alt={post.petName} />
      <Card.Body>
      <div className="card-title-container">
        <Card.Title className='card-title'>{post.petName}</Card.Title>
        {handleFavourite && (<FaStar
          className={`favorite-star ${isFavorite ? 'favorite' : ''}`}
          onClick={handleStarClick}
        />
        )}
      </div>
        <Card.Text className='card-text'>
          SEX: {post.sex ? 'Male' : 'Female'}<br />
          AGE: {post.age}<br />
          RACE: {post.race.replace(/([a-z])([A-Z])/g, '$1 $2')}<br />
        </Card.Text>
        {handleMarkAsAdopted && (
          <Form.Check
            type="checkbox"
            label="Adopted"
            className="check"
            checked={post.adopted}
            onChange={(e) => handleCheckboxChange(post.id, e.target.checked)}
            onClick={(e) => e.stopPropagation()}
          />
        )}
        
      </Card.Body>
    </Card>
  );
}

export default PostCard;
