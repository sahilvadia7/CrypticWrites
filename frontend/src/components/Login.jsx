import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

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
                
                // Assuming `result` contains the user email and role.
                const userEmail = result.email; // Extract email from the response

                localStorage.setItem('userData', JSON.stringify(result)); // Store user data in localStorage
                localStorage.setItem('token', result.token); // Store token in localStorage
                localStorage.setItem("email", userEmail); // Store the email in localStorage

                setIsAuthenticated(true); // Update authentication state in the app
                setSuccess('Login successful! Redirecting...');
                setError('');

                console.log("test");
                console.log(result);

                // Navigate based on the user's role
                if (result.role === 'creator') {
                    navigate('/creator');
                } else if (result.role === 'admin') {
                    navigate('/admin');
                } else {
                    setError('Something went wrong');
                }
            } else if (response.status === 401) {
                setError('Incorrect email or password.');
            } else {
                setError(`Error: ${response.status}`);
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
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
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
