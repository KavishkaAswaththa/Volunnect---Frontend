import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.scss';
import logo from '../assets/logo.png';
import profile from '../assets/profile.png';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
      <Link to="/" className="nav-link">
        <img src={logo} alt="Tree Logo" />
        <span>VOLUNNECT</span>
        </Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/" className="nav-link">HOME</Link></li>
        <li>CATEGORIES</li>
        <li>SERVICES</li>
        <li>RESOURCE</li>
        <li>
          <Link to="/login" className="nav-link">
            LOGIN
          </Link>
        </li>
      </ul>
      <div className="profile-icon">
        <img src={profile} alt="Profile" />
      </div>
    </nav>
  );
}

export default Navbar;
