import React from "react";
import { useNavigate } from "react-router-dom";
import '../../style/AppHeaderStyle.css';

function AppHeader() {
  const navigate = useNavigate();

  return (
    <div className="header-container">
      <header className="header">
        <h1 className="logo">Crypticwrites</h1>
        <nav>
          <ul>
            <li className="nav-link" onClick={() => navigate("/")}>Home</li>
            <li className="nav-link" onClick={() => navigate("/aboutus")}>About</li>
            <li className="nav-link" onClick={() => navigate("/category")}>Category</li>
            <li className="nav-link" onClick={() => navigate("/contact")}>Contact</li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default AppHeader;