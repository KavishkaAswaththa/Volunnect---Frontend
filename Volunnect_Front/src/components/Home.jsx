import React from 'react';
import '../styles/Home.scss';
import logo from '../assets/logo.png';


function Home() {
  return (
    <div className="home">
      <div className="background">
        <div className="logo-section">
          <img src = {logo}  alt="Tree Logo" />
          <h1>VOLUNNECT</h1>
          <p>"The best way to find yourself is to lose yourself in the service of others."</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
