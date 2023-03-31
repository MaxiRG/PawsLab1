import React, { useState } from "react";
import logo from '../images/logo.jpg'
import { post } from "../utils/http";
import { useNavigate } from "react-router-dom";


export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!email.trim()) {
          alert('Please enter an email');
          return;
        }
      
        if (!password.trim()) {
          alert('Please enter a password');
          return;
        }
         
        // Create a new user object with the form data
        const user = {
          email: email,
          password: password,
        };
    
        try {
          const response = await post('/login', user);
    
          if (response.ok) {
            navigate("/");
          } else {
            // Registration failed, display an error message
            const data = await response.json();
            setErrorMessage(data.message);
            errorMessage.textContent = 'Login failed. Please try again later.';
          }
        } catch (error) {
          console.error(error);
        }
      };

    return (
        <div className="auth-form-container">
            <img 
        className='logo'
        src={logo}
        alt='logo'/>
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">EMAIL</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="" id="email" name="email" />
                <label htmlFor="password">PASSWORD</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password"  id="password" name="password" />
                <button type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
            {errorMessage && <div id="error-message">{errorMessage}</div>}
        </div>
    )
}
