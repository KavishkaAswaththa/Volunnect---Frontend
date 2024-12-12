import React from 'react';
import '../styles/Home.scss';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home">
      <div className="background">
        <Link to="/organization-dashboard" className="dashboard-heading">
          <h3>Organization Dashboard</h3>
        </Link>
        <br />
        <Link to="/volunteer-dashboard" className="dashboard-heading">
          <h3>Event Manage </h3>
        </Link>
        
        <div className="logo-section">
          <img src={logo} alt="Tree Logo" />
          <h1>VOLUNNECT</h1>
          <p>"The best way to find yourself is to lose yourself in the service of others."</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
