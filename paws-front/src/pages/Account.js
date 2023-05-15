  import React, { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
  import Button from 'react-bootstrap/Button';
  import "../styles/Account.css";
  import Navbar from "../components/Navbar";
  import Footer from "../components/Footer";
  import ProfileCard from "../components/ProfileCard";
  import { del, get } from "../utils/http";
  import jwt_decode from "jwt-decode";


  const Account = (props) => {
    const { isLoggedIn, isShelter } = props;
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();



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
      // Navigate to /donacion when My Posts is clicked
      navigate("/donacion");
    };

  

    return (
      <div className="all">
        <Navbar isLoggedIn={isLoggedIn} isShelter={isShelter} />
        <div className="body">
          <div className="account-container">
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
            
            <ul className="account-actions">
             
              <li className="account-action"><Button className="action-button">Change password</Button></li>
              <li className="account-action">
                {isShelter ? <Button className="action-button"onClick={handleMyPosts}>My posts </Button> : <Button className="action-button">Favourites</Button>}
              </li>
              {isShelter ? <li className="account-action"><Button className="action-button">Donation history</Button></li> : null}
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
