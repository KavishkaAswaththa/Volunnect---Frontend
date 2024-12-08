
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import AttendanceTable from './components/AttendanceTable.jsx'
import FileUpload from './components/AttendanceFileUpload.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

// Import components
import EventForm from './components/EventForm';
import OrganizationDashboard from './components/OrganizationDashboard';
import UpcomingEvent from './components/UpcomingEvent';
import OngoingEvent from './components/OngoingEvent';
import CompletedEvent from './components/CompletedEvent';
import UpcomingDetail from './components/UpcomingDetail';
import PopupModal from './components/PopupModal';


const App = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  const addEventToUpcoming = (event) => {
    setUpcomingEvents([...upcomingEvents, event]);
  };

  return (
    <Router>
    <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
    </nav>
      <Routes>
        <Route path="/" element={<OrganizationDashboard />} />
        <Route path="/eventform" element={<EventForm addEventToUpcoming={addEventToUpcoming} />} />
        {/* Route for all upcoming events */}
        <Route path="/upcoming-events" element={<UpcomingEvent />} />
        {/* Route for a specific upcoming event */}
        <Route path="/upcoming-events/:id" element={<UpcomingDetail/>} />
        <Route path="/ongoing-events" element={<OngoingEvent />} />
        <Route path="/completed-events" element={<CompletedEvent />} />
        <Route path="/popupmodal" element={<PopupModal />} />
        <Route path="/completed-events" element={<CompletedEvent />} />
        <Route path="/" element={<AttendanceTable />} />
        <Route path="/about" element={<FileUpload />} />
      </Routes>
    </Router>
  );
}

export default App;
