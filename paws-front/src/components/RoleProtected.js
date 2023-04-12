import React from "react";
import { Navigate } from "react-router-dom";

const RoleProtected = ({ isLoggedIn, isShelter, children }) => {
    if (!isLoggedIn || !isShelter) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default RoleProtected;
