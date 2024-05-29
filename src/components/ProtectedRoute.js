import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
    const accessToken = localStorage.getItem('token');
    return accessToken ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
