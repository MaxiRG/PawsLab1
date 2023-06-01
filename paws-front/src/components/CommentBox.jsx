import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function CommentBox({ onSubmit }) {
  const [comment, setComment] = useState('');

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    onSubmit(comment);
    setComment('');
  };

  return (
    <div className="comment-box">
      <Form.Group controlId="commentTextarea">
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Add a comment..."
          value={comment}
          onChange={handleCommentChange}
          className='textArea'
        />
      </Form.Group>
      <Button className="comment-submit-btn" onClick={handleCommentSubmit}>
        Submit Comment
      </Button>
    </div>
  );
}
