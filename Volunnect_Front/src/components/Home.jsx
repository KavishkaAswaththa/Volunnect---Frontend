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
        <ul>
        <li>
          <Link to="/AttendanceTable" className="nav-link">
          AttendanceTable
          </Link>
        </li>
        <li>
          <Link to="/login" className="nav-link">
          LOGIN
          </Link>
        </li>
        <li>
          <Link to="/FilterEvents" className="nav-link">
          Filter Events
          </Link>
        </li>
        <li>
          <Link to="/FilterUsers" className="nav-link">
          FilterUsers
          </Link>
        </li>
        <li>
          <Link to="/CreateAttendance" className="nav-link">
          Create Attendance
          </Link>
        </li>
        <li>
          <Link to="/AttendanceTable" className="nav-link">
          Attendance Table
          </Link>
        </li>
        <li>
          <Link to="/AttendanceFileUpload" className="nav-link">
          Attendance File Upload
          </Link>
        </li>
        <li>
          <Link to="/ChatApp" className="nav-link">
          Chat App
          </Link>
        </li>
        <li>
          <Link to="/CompletedEvent" className="nav-link">
          Complete Event
          </Link>
        </li>
        <li>
          <Link to="/EventCard" className="nav-link">
          Event Card
          </Link>
        </li>
        <li>
          <Link to="/EventForm" className="nav-link">
          Event Form
          </Link>
        </li>
        <li>
          <Link to="/GroupChat" className="nav-link">
          Group Chat
          </Link>
        </li>
        <li>
          <Link to="/OngoingDetail" className="nav-link">
          Ongoing Detail
          </Link>
        </li>
        <li>
          <Link to="/OngoingEvent" className="nav-link">
          Ongoing Event
          </Link>
        </li>
        <li>
          <Link to="/OrganizationDashboard" className="nav-link">
          Organization Dashboard
          </Link>
        </li>
        <li>
          <Link to="/PopupModal" className="nav-link">
          Popup Modal
          </Link>
        </li>
        <li>
          <Link to="/SendMessage" className="nav-link">
          Send Message
          </Link>
        </li>
        <li>
          <Link to="/UpcomingEvent" className="nav-link">
          Upcoming Event
          </Link>
        </li>
        <li>
          <Link to="/UpcomingDetail" className="nav-link">
          Upcoming Detail
          </Link>
        </li>
        <li>
          <Link to="/VolunteerDashboard" className="nav-link">
          Volunteer Dashboard
          </Link>
        </li>        

       </ul>
        
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
