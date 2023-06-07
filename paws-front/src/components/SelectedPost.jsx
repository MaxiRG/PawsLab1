import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SelectedPost.css';
import Button from 'react-bootstrap/Button';
import CommentBox from '../components/CommentBox';
import CommentsContainer from './CommentsContainer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { post, get } from '../utils/http'


export default function SelectedPost({ selectedPost, cardShelter, cardPicture }) {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [comments, setComments] = useState([]);
  const [commentResponses, setCommentResponses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage] = useState(4);
  const token = localStorage.getItem('token')
  const config = {
    headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json', 
}}

  useEffect(() => {
    const handleGetComments = () => {
      get('/getCommentsOfTypePOSTandId' + selectedPost.id)
      .then((response) => {
        console.log(response);
        setComments(response);
        fetchCommentResponses(response)
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("Could not load comments. Please try again later!");
      })
    } 

    const fetchCommentResponses = (comments) => {
      const commentIds = comments.map((comment) => comment.id);
      const requests = commentIds.map((commentId) =>
        get('/getCommentsOfTypeCOMMENTandId' + commentId)
      );
    
      Promise.all(requests)
        .then((responses) => {
          const commentResponsesMap = {};
    
          responses.forEach((response, index) => {
            const commentId = commentIds[index];
            commentResponsesMap[commentId] = response;
          });
    
          setCommentResponses(commentResponsesMap);
        })
        .catch((error) => {
          console.error(error);
          setErrorMessage(
            "Could not load comment responses. Please try again later!"
          );
        });
    };
    handleGetComments();
  }, [selectedPost.id]);

  const handleGetComments = () => {
    get('/getCommentsOfTypePOSTandId' + selectedPost.id)
    .then((response) => {
      console.log(response);
      setComments(response);
    })
    .catch((error) => {
      console.error(error);
      setErrorMessage("Could not load comments. Please try again later!");
    })
  } 

  const handleNavigateToShelter = () => {
    navigate(`/shelter/${cardShelter.id}`);
  };

  const handleCommentSubmit = (comment) => {
    if (!token){
      toast.warn("Log in to add a comment")
      return
    }

    if (comment.trim() === "") {
      toast.warn("Please enter a valid response");
      return;
    }
    console.log('Comment:', comment);
    const body = {
      text : comment,
      type : "POST",
      subjectId : selectedPost.id
    }
    
    post('/createComment', body, config)
      .then((response) => {
        console.log(response)
        comments.push(response)
        handleGetComments();
        toast.success('Comment added successfully!')
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("Could not post comment. Please try again later!");
      })
    
  };

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  

  return (
    <div>
      <div className="post-expanded">
        <div className='post-info'>
          <h1 className='post-title'  style={{ textAlign: 'center' }}>{selectedPost.petName}</h1>
          <div className='pic-info'>
            <div className='info'>
              <p className='info'><b>Sex:</b> {selectedPost.sex ? 'Male' : 'Female'}</p>
              <p className='info'><b>Age:</b> {selectedPost.age}</p>
              <p className='info'><b>Race:</b> {selectedPost.race.replace(/([a-z])([A-Z])/g, '$1 $2')}</p>
              <p className='description'><b>Description:</b> {selectedPost.description}</p>
            </div>
            <div className='pic'>
              <img src={cardPicture} alt='imagen' className='dog-pic'/>
            </div>
          </div>
        </div>  
        <div className='shelter-info'>
          <h1 className='shelter-title'  style={{ textAlign: 'center' }}>{cardShelter.name}</h1>
          <p className='description'><b>Description:</b> {cardShelter.description}</p>
          <p className='info'><b>Number:</b> {cardShelter.phoneNumber}</p>
          <Button className="see-shelter-btn" onClick={handleNavigateToShelter}>
            See Shelter
          </Button>
        </div>
      </div>   
      <div className='comments-area'> 
        <div className='textBox'>
          <CommentBox onSubmit={handleCommentSubmit} />
          {errorMessage && <div id="error-message">{errorMessage}</div>}
        </div>
        <div className='comments'>
          <CommentsContainer comments={currentComments} commentResponses={commentResponses}/>
          <div className='pagination'>
            {comments.length > commentsPerPage && (
              Array.from({ length: Math.ceil(comments.length / commentsPerPage) }).map((_, index) => (
                <Button
                  key={index}
                  variant="primary"
                  onClick={() => paginate(index + 1)}
                  className={`page-link ${currentPage === index + 1 ? 'active' : ''}`}
                >
                  {index + 1}
                </Button>
              ))
            )}
          </div>
        </div>
      </div>
      <ToastContainer position='top-center' />
    </div> 
  );
}
