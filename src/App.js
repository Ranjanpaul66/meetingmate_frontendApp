
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import EventList from './components/EventList';
import ProtectedRoute from './components/ProtectedRoute';
import RedirectRoute from './components/RedirectRoute';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<RedirectRoute element={<Login />} />} />
                <Route path="/events" element={<ProtectedRoute element={<EventList />} />} />
                <Route path="/" element={<RedirectRoute element={<Login />} />} />
            </Routes>
        </Router>
    );
};

export default App;
