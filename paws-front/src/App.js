import * as React from "react";
import { useState , useEffect } from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";//npm install react-router-dom
import Home from "./pages/Home";
import Login from "./pages/Login"
import Busqueda from "./pages/Busqueda"
import Donacion from "./pages/Donacion";
import Account from "./pages/Account"
import jwt_decode from "jwt-decode";
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isShelter, setIsShelter] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsLoggedIn(true);
        // Check if the user has the role shelter
        const user = jwt_decode(token);
        console.log(user)
        setIsShelter(user.role === "SHELTER");
      }
    }, []);

    
    return(
    <BrowserRouter>
        <Routes>
            <Route path={'/'} element={<Home isLoggedIn={isLoggedIn} isShelter={isShelter}/>}/>
            <Route path={'/login'} element={<Login setIsLoggedIn={setIsLoggedIn} setIsShelter={setIsShelter}/>}/>
            <Route path={'/busqueda'} element={<Busqueda isLoggedIn={isLoggedIn} isShelter={isShelter}/>}/>
            <Route path={'/donacion'} element={<Donacion isLoggedIn={isLoggedIn} isShelter={isShelter}/>}/>
            <Route path={'/account'} element={<Account setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} isShelter={isShelter}/>}/>
        </Routes>
    </BrowserRouter>
);
}

export default App;