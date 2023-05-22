import React from 'react';
import Card from 'react-bootstrap/Card';
import { Form } from 'react-bootstrap';

function PostCard(props) {
  const { post, picture, handleSelectedPost, showAdoptedCheckbox, handleMarkAsAdopted, clickable } = props;

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

  return (
    <Card className="custom-card" onClick={handleClick} style={clickable ? { cursor: 'pointer' } : {}}>
      <Card.Img className='card-img' variant="top" src={picture} alt={post.petName} />
      <Card.Body>
        <Card.Title className='card-title'>{post.petName}</Card.Title>
        <Card.Text>
          Sex: {post.sex ? 'Male' : 'Female'}<br />
          Age: {post.age}<br />
          Race: {post.race}<br />
          Description: {post.description}<br />
        </Card.Text>
        {showAdoptedCheckbox && handleMarkAsAdopted && (
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
