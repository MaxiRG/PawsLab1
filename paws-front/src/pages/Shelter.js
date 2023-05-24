import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { get } from "../utils/http";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PostCard from "../components/PostCard";
import "../styles/Shelter.css";

const Shelter = (props) => {
  const { isLoggedIn, isShelter } = props;
  const { shelterId } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [pictures, setPictures] = useState({});
  const navigate = useNavigate();

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

  return (
    <div className="all">
      <Navbar isLoggedIn={isLoggedIn} isShelter={isShelter} />
      <div className="shelter-container">
        <div className="shelter-body">
          {profile && (
            <div>
              <h1>{profile.name}</h1>
              <div className="shelter-description">{profile.description}</div>
              <div className="shelter-number">Phone Number:{profile.phoneNumber}</div>
            </div>
          )}
        </div>
        {errorMessage && <div id="error-message">{errorMessage}</div>}
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
            <p>No history found...</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Shelter;
