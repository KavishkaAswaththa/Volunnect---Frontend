import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import components
import EventForm from './event_component/EventForm';
import OrganizationDashboard from './event_component/OrganizationDashboard';
import UpcomingEvent from './event_component/UpcomingEvent';
import OngoingEvent from './event_component/OngoingEvent';
import CompletedEvent from './event_component/CompletedEvent';
import UpcomingDetail from './event_component/UpcomingDetail';
import PopupModal from './event_component/PopupModal';


const App = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  const addEventToUpcoming = (event) => {
    setUpcomingEvents([...upcomingEvents, event]);
  };

  return (
    <Router>
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
      </Routes>
    </Router>
  );
};

export default App;
