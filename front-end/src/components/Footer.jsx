import React from 'react';
import './Footer.css'; // Optional CSS for styling

const Footer = () => {
    return (
        <footer className="footer">
            <p>© {new Date().getFullYear()} CrypticWrites. All Rights Reserved.</p>
        </footer>
    );
};

export default Footer;
