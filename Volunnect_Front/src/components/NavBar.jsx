import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.scss";
import logo from "../assets/logo.png";
import profile from "../assets/profile.png";

function Navbar() {
  return (
    <nav className="navbar">
      <li><Link to="/">
        <div className="logo">
          <img src={logo} alt="Tree Logo" />
          <span>VOLUNNECT</span>
        </div>
        </Link>
      </li>
      <ul className="nav-links">
        <li><Link to="/">HOME</Link></li>
        <li><Link to="/categories">CATEGORIES</Link></li>
        <li><Link to="/services">SERVICES</Link></li>
        <li><Link to="/resource">RESOURCE</Link></li>
        <li><Link to="/login">LOGIN</Link></li>
      </ul>
      <div className="profile-icon">
        <img src={profile} alt="Profile" />
      </div>
    </nav>
  );
}

export default Navbar;
