import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import Button from 'react-bootstrap/Button';
import "../styles/Account.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { del } from "../utils/http";
import jwt_decode from "jwt-decode";


const Account = (props) => {
  const { isLoggedIn, isShelter } = props;
  const navigate = useNavigate();

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
          <h1 className="account-title">My Account</h1>
          <ul className="account-actions">
            <li className="account-action">View profile</li>
            <li className="account-action">Edit profile</li>
            <li className="account-action">Change password</li>
            <li className="account-action"> 
              {isShelter ?  <div onClick={handleMyPosts}>My posts </div> : <div>Favourites</div>}
            </li>
            {isShelter ? <li className="account-action">View donation history</li> : null}
            <li className="account-action">View notifications</li>
            <li className="account-action">
              <button className="logout-button" onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} /> Log out
              </button>
            </li>
            <li className="account-action">
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
