import * as React from "react";
import { useState , useEffect } from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";//npm install react-router-dom
import Home from "./pages/Home";
import Login from "./pages/Login"
import Busqueda from "./pages/Busqueda"
import Donacion from "./pages/Donacion";
import Account from "./pages/Account"

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isShelter, setIsShelter] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          setIsLoggedIn(true);
        }
      }, []);

    return(
    <BrowserRouter>
        <Routes>
            <Route path={'/'} element={<Home isLoggedIn={isLoggedIn} isShelter={isShelter}/>}/>
            <Route path={'/login'} element={<Login setIsLoggedIn={setIsLoggedIn} setIsShelter={setIsShelter}/>}/>
            <Route path={'/busqueda'} element={<Busqueda isLoggedIn={isLoggedIn} isShelter={isShelter}/>}/>
            <Route path={'/donacion'} element={<Donacion isLoggedIn={isLoggedIn} isShelter={isShelter}/>}/>
            <Route path={'/account'} element={<Account setIsLoggedIn={setIsLoggedIn} isShelter={isShelter}/>}/>
        </Routes>
    </BrowserRouter>
);
}

export default App;