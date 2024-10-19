import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate(); 

    const handleLogout = async () => {
        try {
            // Get user data from localStorage
            const userData = JSON.parse(localStorage.getItem('userData'));

            if (userData && userData.email) {
                // Make a DELETE request to the backend to remove the login record
                const response = await fetch(`http://localhost:8080/api/user/logout/${userData.email}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    console.log('Logout successful and record deleted from backend');
                } else {
                    console.error('Failed to delete login record from backend');
                }
            }

            // Clear user-related data from localStorage
            localStorage.removeItem('userData');
            localStorage.removeItem('token');

            // Redirect to login page
            navigate('/login');

            // Optionally reload the page
            window.location.reload();
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default Logout;
