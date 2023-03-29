import * as React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";//npm install react-router-dom
import Home from "../../pages/Home";
import Login from "../../pages/Login"
import Busqueda from "../../pages/Busqueda"

const Router = (props) => (
    <BrowserRouter>
        <Routes>
            <Route path={'/'} element={<Home/>}/>
            <Route path={'/login'} element={<Login/>}/>
            <Route path={'/busqueda'} element={<Busqueda/>}/>
        </Routes>
    </BrowserRouter>
);

export default Router;