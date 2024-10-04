// src/pages/Login.js
import React, { useState } from 'react';
import './Auth.css'; // Optional CSS for styling
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import HomePage from '../pages/HomePage';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!email || !password) {
            setError('Both fields are required');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const result = await response.json();
                setSuccess('Login successful!');
                setError('');
                console.log(result); // Handle successful login response
                
                // Redirect to home page or dashboard after successful login
                navigate('/HomePage'); // Adjust the route as needed
            } else {
                const errorText = await response.text();
                setError(errorText || 'Invalid email or password.');
                setSuccess('');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setError('An error occurred. Please try again.');
            setSuccess('');
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>} {/* Display success message */}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
