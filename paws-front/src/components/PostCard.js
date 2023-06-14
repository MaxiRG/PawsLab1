import React, { useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import { Form } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import '../styles/PostCard.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { post, del } from "../utils/http";



function PostCard(props) {
  const { post: thisPost, picture, handleSelectedPost,
     handleMarkAsAdopted, clickable,
      handleFavourite, favPosts } = props;
  const [isFavorite, setIsFavorite] = useState(false);
  const token = localStorage.getItem('token')
  const config = {
    headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json', 
}}
  useEffect(() => {
    if (favPosts){
      if (favPosts.some(item => item.post.id === thisPost.id)) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
   }
  }, [favPosts, thisPost.id]);

  const handleCheckboxChange = (postId, checked) => {
    if (handleMarkAsAdopted) {
      handleMarkAsAdopted(postId, checked);
    }
  };

  const handleClick = () => {
    if (clickable && handleSelectedPost) {
      handleSelectedPost(thisPost);
    }
  };

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    if (!token) {
      toast.warn('Log in to add favorites');
      return;
    }

    const body = {
      postId: thisPost.id,
    };

    if (isFavorite) {
      del('/deleteUserFavourite', body, config)
        .then((response) => {
          console.log(response);
          setIsFavorite(false);
          toast.success('Removed from favorites');

        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      post('/addFavourite', body, config)
        .then((response) => {
          console.log(response);
          setIsFavorite(true);
          toast.success('Added to favorites!');
        
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  
  return (
    <Card className="custom-card" onClick={handleClick} style={clickable ? { cursor: 'pointer' } : {}}>
      <Card.Img className='card-img' variant="top" src={picture} alt={thisPost.petName} />
      <Card.Body>
      <div className="card-title-container">
        <Card.Title className='card-title'>{thisPost.petName}</Card.Title>
        {handleFavourite  && (<FaHeart
          className={`favorite-heart ${isFavorite ? 'favorite' : ''}`}
          onClick={handleToggleFavorite}
        />
        )}
        
      </div>
        <Card.Text className='card-text'>
          SEX: {thisPost.sex ? 'Male' : 'Female'}<br />
          AGE: {thisPost.age}<br />
          RACE: {thisPost.race.replace(/([a-z])([A-Z])/g, '$1 $2')}<br />
        </Card.Text>
        {handleMarkAsAdopted && (
          <Form.Check
            type="checkbox"
            label="Adopted"
            className="check"
            checked={thisPost.adopted}
            onChange={(e) => handleCheckboxChange(thisPost.id, e.target.checked)}
            onClick={(e) => e.stopPropagation()}
          />
        )}
        
      </Card.Body>
      <ToastContainer position='top-center'  />
    </Card>
    
  );
}

export default PostCard;
