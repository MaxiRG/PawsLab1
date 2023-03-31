import * as React from "react";
import { useState } from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";//npm install react-router-dom
import Home from "./pages/Home";
import Login from "./pages/Login"
import Busqueda from "./pages/Busqueda"

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isShelter, setIsShelter] = useState(false);

    return(
    <BrowserRouter>
        <Routes>
            <Route path={'/'} element={<Home isLoggedIn={isLoggedIn} isShelter={isShelter}/>}/>
            <Route path={'/login'} element={<Login setIsLoggedIn={setIsLoggedIn} setIsShelter={setIsShelter}/>}/>
            <Route path={'/busqueda'} element={<Busqueda isLoggedIn={isLoggedIn} isShelter={isShelter}/>}/>
        </Routes>
    </BrowserRouter>
);
}

export default App;