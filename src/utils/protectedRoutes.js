import React from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from 'jwt-decode'; 

const ProtectedRoute = ({ children }) => {
    
    const token = localStorage.getItem('token'); // Get the token from local storage
    let location = useLocation();

    // Helper function to check if the token is expired
    const isTokenExpired = (token) => {
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000; 
            return decodedToken.exp < currentTime; 
        } catch (error) {
            return true;
        }
    };

    if (!token || isTokenExpired(token)) {
      
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children; 
};

export default ProtectedRoute;
