import * as React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "../../pages/home/Home";

const Router = (props) => (
    <BrowserRouter>
        <Routes>
            <Route path={'/'} element={<Home/>}/>
        </Routes>
    </BrowserRouter>
);

export default Router;