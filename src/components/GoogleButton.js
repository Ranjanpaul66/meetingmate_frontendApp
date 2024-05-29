// src/LoginPage.js
import React from 'react';
import {useGoogleLogin} from '@react-oauth/google';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axiosInstance from "../axios/login";

const theme = createTheme();

function GoogleButton() {
    const navigate = useNavigate();
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            console.log(codeResponse);
            console.log(codeResponse.access_token);
        localStorage.setItem('token', codeResponse.access_token);

            axiosInstance.post('http://localhost:8000/get_user/', codeResponse)
                .then(response => {
                    console.log('Login successful:', response.data);
                    navigate('/events');
                    // window.location.href = '/events';
                })
                .catch(error => {
                    console.error('Login failed:', error);
                });
        },
        scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly',

    });

    return (

                <Button onClick={() => login()}>Sign in with Google 🚀</Button>
    );
}

export default GoogleButton;
