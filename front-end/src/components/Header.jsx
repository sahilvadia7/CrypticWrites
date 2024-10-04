// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Optional CSS for styling

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <h1><a href="/">CrypticWrites</a></h1> {/* Replace with an <img> tag for an actual logo */}
            </div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/aboutProject">Project</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
