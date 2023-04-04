import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
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
      window.location.reload();
  };
  

  return (
    <div className="all">
      <Navbar isLoggedIn={isLoggedIn} isShelter={isShelter} />
      <div className="account">
        <div className="account-container">
          <h1 className="account-title">My Account</h1>
          <ul className="account-actions">
            <li className="account-action">View profile</li>
            <li className="account-action">Edit profile</li>
            <li className="account-action">Change password</li>
            <li className="account-action"> 
            {isShelter ?  <div>My posts </div> : <div>Favourites</div>}
            </li>
            {isShelter ? <li className="account-action">View donation history</li> : null}
            <li className="account-action">View notifications</li>
            <li className="account-action">
              <button className="logout-button" onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} /> Log out
              </button>
            </li>
            <li className="account-action">
              <button className="delete-account-button" onClick={deleteAccount}>
                Delete Account
              </button>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Account;
