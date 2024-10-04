// src/pages/Register.js
import React, { useState } from 'react';
import './Auth.css'; // Optional CSS for styling
import Login from "./Login";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('creator');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!email || !password || !confirmPassword) {
            setError('All fields are required');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Prepare data to be sent to the API
        // const data = { email, password };

        try {
            // Sending data to the API (replace with your actual API endpoint)
            const response = await fetch('http://localhost:8080/api/regUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email,password,role}),
            });

            if (response.ok) {
                const result = await response.json();
                setSuccess('Registration successful!');
                navigate('/login');
                console.log("login reached");
                setError('');
                // Reset the form
                setEmail('');
                setPassword('');
                setConfirmPassword('');    

               
              
                

            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Registration failed');
                setSuccess('');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
            setSuccess('');
        }
    };

    return (
        <div className="auth-container">
            <h2>Register</h2>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
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
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
