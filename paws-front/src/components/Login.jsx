import React, { useState } from "react";
import logo from '../images/logo.jpg'


export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

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
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password"  id="password" name="password" />
                <button type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </div>
    )
}
