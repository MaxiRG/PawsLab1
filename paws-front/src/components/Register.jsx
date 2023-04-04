import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
import { post } from "../utils/http";



export const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShelterChecked, setIsShelterChecked] = useState(false);
  const [isAdoptantChecked, setIsAdoptantChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  //const navigate = useNavigate();
  

  const handleShelterCheckboxChange = () => {
    setIsShelterChecked(!isShelterChecked);
    setIsAdoptantChecked(false);
  };

  const handleAdoptantCheckboxChange = () => {
    setIsAdoptantChecked(!isAdoptantChecked);
    setIsShelterChecked(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert('Please enter an email');
      return;
    }
  
    if (!password.trim()) {
      alert('Please enter a password');
      return;
    } else if (password.trim().length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }
    

    // Check if either checkbox is checked
    if (!isShelterChecked && !isAdoptantChecked) {
      setErrorMessage("Please select whether you are a shelter or an adoptant.");
      return;
    }

    let role = isShelterChecked ? "SHELTER" : "ADOPTER";

    // Create a new user object with the form data
    const user = {
      email: email,
      password: password,
      role : role
    };
  
    try {
      const response = await post("/api/createUser", user);
      console.log(response);
      
      if (response.success) {
        
        props.onFormSwitch("login")
      } else {
        // Registration failed, display an error message
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Registration failed. Please try again later.');
    }
  }    

  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="email">EMAIL</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
          name="email"
        />
        <label htmlFor="password">PASSWORD</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
          name="password"
        />
        <label>
          <input
            type="checkbox"
            checked={isShelterChecked}
            onChange={handleShelterCheckboxChange}
          />
          I'm a shelter
        </label>
        <label>
          <input
            type="checkbox"
            checked={isAdoptantChecked}
            onChange={handleAdoptantCheckboxChange}
          />
          I'm an adoptant
        </label>
        <button type="submit">Register</button>
      </form>
      {errorMessage && <div id="error-message">{errorMessage}</div>}
      <button
        className="link-btn"
        onClick={() => props.onFormSwitch("login")}
      >
        Already have an account? Login here.
      </button>
    </div>
  );
};