import React, { useState } from "react";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [isShelterChecked, setIsShelterChecked] = useState(false);
    const [isAdoptantChecked, setIsAdoptantChecked] = useState(false);

    const handleShelterCheckboxChange = () => {
        setIsShelterChecked(!isShelterChecked);
        setIsAdoptantChecked(false);
    };

    const handleAdoptantCheckboxChange = () => {
        setIsAdoptantChecked(!isAdoptantChecked);
        setIsShelterChecked(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }
    
    return (
        <div className="auth-form-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="name">USERNAME</label>
                <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name"  />
                <label htmlFor="email">EMAIL</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email"  id="email" name="email" />
                <label htmlFor="password">PASSWORD</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" id="password" name="password" />
                <label>
                    <input type="checkbox" checked={isShelterChecked} onChange={handleShelterCheckboxChange}/>
                     I'm a shelter
                </label>
                <label>
                    <input type="checkbox" checked={isAdoptantChecked} onChange={handleAdoptantCheckboxChange}/>
                     I'm an adoptant
                </label>
                <button type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
        </div>
    );
}
















