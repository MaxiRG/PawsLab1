import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { get, post } from "../utils/http";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PostCard from "../components/PostCard";
import StarRating from "../components/StarRating";
import { FaPhone } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CommentBox from '../components/CommentBox';
import CommentsContainer from "../components/CommentsContainer";
import "../styles/Shelter.css";


const Shelter = (props) => {
  const { isLoggedIn, isShelter } = props;
  const { shelterId } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [pictures, setPictures] = useState({});
  const [comments, setComments] = useState([]);
  const [commentResponses, setCommentResponses] = useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem('token')
  const config = {
    headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json', 
}}

  useEffect(() => {
    get(`/api/getInfoById/${shelterId}`)
      .then((data) => {
        console.log(data);
        setProfile(data);
      })
      .catch((error) => {
        console.log(error);
        navigate("/404");
      });
  }, [shelterId, navigate]);

  useEffect(() => {
    get('/getAll')
      .then((response) => {
        console.log(response);
        console.log("posts retrieved");
        setPosts(response);
        setErrorMessage('');

        response.forEach((post) => {
          const postId = post.id;
          get(`/getProfilePicture/${postId}`, { responseType: 'arraybuffer' })
            .then((imageResponse) => {
              console.log('image retrieved');
              const blob = new Blob([imageResponse], { type: 'image/jpeg' });
              const blobUrl = URL.createObjectURL(blob);
              setPictures((prevState) => ({
                ...prevState,
                [postId]: blobUrl,
              }));
            })
            .catch((error) => {
              console.error(error);
              setErrorMessage('Failed to retrieve images');
            });
        });
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage('Post retrieval failed. Please try again later.');
      });
  }, []);

  useEffect(() => {
    const handleGetComments = () => {
      get('/getCommentsOfTypeSHELTERandId' + shelterId)
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
  }, [shelterId]);

  const handleCommentSubmit = (comment) => {
    if (!token){
      toast.warn("Log in to add a comment")
      return
    }
    if (comment.trim() === "") {
      toast.warn("Please enter a valid comment");
      return;
    }
    console.log('Comment:', comment);
    const body = {
      text : comment,
      type : "SHELTER",
      subjectId : profile.id
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
  
  const handleGetComments = () => {
    get('/getCommentsOfTypeSHELTERandId' + shelterId)
    .then((response) => {
      console.log(response);
      setComments(response);
    })
    .catch((error) => {
      console.error(error);
      setErrorMessage("Could not load comments. Please try again later!");
    })
  } 
    

  return (
    <div className="all">
      <Navbar isLoggedIn={isLoggedIn} isShelter={isShelter} />
      <div className="shelter-container">
        <div className="shelter-body">
          {profile && (
            <div>
              <h1>{profile.name}</h1>
              <div className="shelter-description">{profile.description}</div>
              <div className="shelter-number"><FaPhone className="phone-icon"/>{profile.phoneNumber}</div>
              <div className="stars">
                <StarRating  value={1}/>
              </div>
            </div>
          )}
        </div>
        {errorMessage && <div id="error-message">{errorMessage}</div>}
        <div className="postsAndComments">
          <div className="donated-posts">
            <h2 className="donated-posts-title">Donation History</h2>
            {posts.filter(post => post.user.id === parseInt(shelterId) && post.adopted).length > 0 ? (
              posts.filter(post => post.user.id === parseInt(shelterId) && post.adopted).map((post) => (
                <PostCard 
                  key={post.id}
                  post={post}
                  picture={pictures[post.id]}
                  clickable={false}
                />
              ))
            ) : (
              <p className="no-history">No history found...</p>
            )}
          </div>
          <div className="rating-comments">
            <div className="rating">
              
            </div>
            <div className="shelter-comments">
              <CommentsContainer comments={comments} commentResponses={commentResponses} isShelter={isShelter}/>
              <CommentBox onSubmit={handleCommentSubmit} />
              {errorMessage && <div id="error-message">{errorMessage}</div>}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer position='top-center' />

    </div>
  );
};

export default Shelter;
