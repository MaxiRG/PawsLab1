import React from 'react';
import { useState } from 'react';
import {Login} from "../components/Login";
import {Register} from "../components/Register";

const Log = (props) => {
    const [currentForm, setCurrentForm] = useState('login');
    const {setIsLoggedIn} = props;
    const {setIsShelter} = props

    const toggleForm = (formName) => {
        setCurrentForm(formName);
    }

    return (
        <div className="Home">
            {
                currentForm === "login" 
                ? <Login onFormSwitch={toggleForm} setIsLoggedIn={setIsLoggedIn} setIsShelter={setIsShelter} /> 
                : <Register onFormSwitch={toggleForm}  />
            }
        </div>
    );
};


export default Log;