import React from 'react';
import {get} from "../../utils/http";
import {useState} from "@types/react";
import {Login} from "../../components/Login";
import {Register} from "../../components/Register";

const Home = (props) => {const [currentForm, setCurrentForm] = useState('login');

    const toggleForm = (formName) => {
        setCurrentForm(formName);
    }

    return (
        <div className="App">
            {
                currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
            }
        </div>
    );
};

export default Home;