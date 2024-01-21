// PrivateRoute.js
import React from 'react';
import {  Navigate } from 'react-router-dom';


const PrivateRoute = ({ children}) => {

    const isAuthenticated = localStorage.getItem('authtoken') !== null;
        
    if (isAuthenticated ) {
      return children
    }
      
    return <Navigate to="/login" />
  }

  export default PrivateRoute;