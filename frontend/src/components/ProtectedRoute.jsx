import React from 'react';
import { Navigate } from 'react-router-dom';

// This component will protect routes based on the user's role.
const ProtectedRoute = ({ children, allowedRoles }) => {
    const userData = JSON.parse(localStorage.getItem('userData'));

    // Check if user is authenticated and has the correct role
    if (!userData || !allowedRoles.includes(userData.role)) {
        // If not authenticated or role doesn't match, redirect to login
        return <Navigate to="/login" />;
    }

    // Render the children (the protected page) if user is authorized
    return children;
};

export default ProtectedRoute;
