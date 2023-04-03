import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import "../styles/Account.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Account = (props) => {
  const { isLoggedIn, isShelter } = props;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from localStorage
    props.setIsLoggedIn(false); // Update the state to indicate that the user is logged out
    navigate("/");
  };

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} isShelter={isShelter} />
      <div className="account">
        <div className="account-container">
          <h1 className="account-title">My Account</h1>
          <ul className="account-actions">
            <li className="account-action">View profile</li>
            <li className="account-action">Edit profile</li>
            <li className="account-action">Change password</li>
            <li className="account-action">My posts</li>
            <li className="account-action">View donation history</li>
            <li className="account-action">View notifications</li>
            <li className="account-action">
              <button className="logout-button" onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} /> Log out
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
