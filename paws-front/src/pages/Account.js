  import React, { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faSignOutAlt, faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
  import Button from 'react-bootstrap/Button';
  import "../styles/Account.css";
  import Navbar from "../components/Navbar";
  import Footer from "../components/Footer";
  import ProfileCard from "../components/ProfileCard";
  import PostCard from "../components/PostCard";
  import { del, get } from "../utils/http";
  import jwt_decode from "jwt-decode";


  const Account = (props) => {
    const { isLoggedIn, isShelter } = props;
    const [profile, setProfile] = useState(null);
    const [myPosts, setMyPosts] = useState([]);
    const [pictures, setPictures] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [showDonationHistory, setShowDonationHistory] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const config = {
              headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json', 
          }}


    useEffect(() => {
      const token = localStorage.getItem("token");
      const decodedToken = jwt_decode(token);
      const email = decodedToken.sub; 

      
      get("/api/getInfo/" + email)
        .then((data) => {
          console.log(data);
          setProfile(data);
          
        })
        .catch((error) => {
          console.log(error);
         
        });
    }, []);

    const handleDonationHistory = (e) => {
      if (e) {
        e.preventDefault();
      }
  
      if (showDonationHistory) {
        // Hide donation history
        setShowDonationHistory(false);
      } else {
        // Show donation history
        get('/getMyPosts', config)
          .then(response => {
            console.log(response)
            console.log("posts retrieved")
            setMyPosts(response);
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
          .catch(error => {
            console.error(error)
            setErrorMessage('Post retrieval failed. Please try again later.');
          });
          
        setShowDonationHistory(true);
      }
    };;

  
    const handleLogout = () => {
      localStorage.removeItem("token"); // Remove the token from localStorage
      props.setIsLoggedIn(false); // Update the state to indicate that the user is logged out
      navigate("/");
      window.location.reload()
    };

    const deleteAccount = () => {
      const token = localStorage.getItem("token");
      const decodedToken = jwt_decode(token);
      const email = decodedToken.sub;
      console.log(email); // This will print the user's email to the console

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      del("/api/deleteUser/" + email, config)
        .then((data) => {
          console.log(data);
          localStorage.removeItem("token");
          props.setIsLoggedIn(false);
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
          // handle error
        });
        
    };
    

    const handleMyPosts = () => {
      navigate("/donacion");
    };

  
    return (
      <div className="all">
        <Navbar isLoggedIn={isLoggedIn} isShelter={isShelter} />
        <div className="body">
          <div className="account-container">
          {errorMessage && <div id="error-message">{errorMessage}</div>}
            <div className="profile">
              {profile ? (     
                 <ProfileCard
                  name={profile.name}
                  email={profile.email}
                  number={profile.phoneNumber}
                  description={profile.description}
                  isLoggedIn={isLoggedIn}/>
                ) : <p>Failed to fetch user info</p>}
            </div>
            <div className="donation-history">
              {showDonationHistory && myPosts.filter(post => post.adopted).length > 0 ? (
              myPosts.filter(post => post.adopted).map((post) => (
                <PostCard 
                  key={post.id}
                  post={post}
                  picture={pictures[post.id]}
                  clickable={false}
                />
                  ))
                ) : (
                  showDonationHistory && <p>No history found...</p>
                )}
            </div>
            <ul className="account-actions">
             
              <li className="account-action"><Button className="action-button">Change password</Button></li>
              <li className="account-action">
                {isShelter ? 
                <Button className="action-button"onClick={handleMyPosts}>
                  My posts 
                </Button> 
                :
                <Button className="action-button">
                  Favourites
                </Button>}
              </li>
              {isShelter ? <li className="account-action">
                <Button className="action-button" onClick={handleDonationHistory}>
                  {showDonationHistory ? (
                    <>
                      <FontAwesomeIcon icon={faAngleUp} /> Hide Donation History
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faAngleDown} /> Show Donation History
                    </>
                  )}
                </Button>
              </li> : null}
              <li className="account-action"><Button className="action-button">Notifications</Button></li>
              <li className="account-logout">
                <button className="logout-button" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} /> Log out
                </button>
              </li>
              <li className="account-delete">
                <Button className="delete-account-button" variant="outline-danger" onClick={deleteAccount}>
                  Delete Account
                </Button>
              </li>
            </ul>
          </div>
        </div>
        <Footer />
      </div>
    );
    
  };

  export default Account;
