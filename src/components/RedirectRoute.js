import React from 'react';
import { Navigate } from 'react-router-dom';

const RedirectRoute = ({ element }) => {
    const accessToken = localStorage.getItem('token');
    return accessToken ? <Navigate to="/events" /> : element;
};

export default RedirectRoute;
