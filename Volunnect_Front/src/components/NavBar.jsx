import React from 'react';
import '../styles/Navbar.scss';
import logo from '../assets/logo.png';
import profile from '../assets/profile.png';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
      <img src = {logo}  alt="Tree Logo" />
        <span>VOLUNNECT</span>
      </div>
      <ul className="nav-links">
        <li>HOME</li>
        <li>CATEGORIES</li>
        <li>SERVICES</li>
        <li>RESOURCE</li>
        <li>LOGIN</li>
      </ul>
      <div className="profile-icon">
        <img src={profile} alt="Profile" />
      </div>
    </nav>
  );
}

export default Navbar;
