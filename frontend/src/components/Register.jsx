import React, { useState } from 'react';
import './Auth.css'; 
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [role] = useState('creator'); // Default role set to 'creator'
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
    
        try {
            const response = await fetch('http://localhost:8080/api/regUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, role, password }), 
            });
    
            // Log the response status for troubleshooting
            console.log('Response Status:', response.status);
    
            if (response.status === 201) { // 201 Created means success
                setSuccess('Registration successful!');
                navigate('/login'); // Navigate to login page
    
                // Reset form
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            } 
            else {
                // Handle non-201 responses, including a detailed error message
                const errorData = await response.json();
                setError(errorData.message || 'Registration failed with status ' + response.status);
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
                <button type="submit" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    );
};

export default Register;
