import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import components
import EventForm from './components/EventForm';
import OrganizationDashboard from './components/OrganizationDashboard';
import UpcomingEvent from './components/UpcomingEvent';
import OngoingEvent from './components/OngoingEvent';
import CompletedEvent from './components/CompletedEvent';
import UpcomingDetail from './components/UpcomingDetail';
import PopupModal from './components/PopupModal';
import OngoingDetail from './components/OngoingDetail';
import Home from './components/Home';


const App = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  const addEventToUpcoming = (event) => {
    setUpcomingEvents([...upcomingEvents, event]);
  };

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/organization-dashboard" element={<OrganizationDashboard />} />
        <Route path="/eventform" element={<EventForm addEventToUpcoming={addEventToUpcoming} />} />
        {/* Route for all upcoming events */}
        <Route path="/upcoming-events" element={<UpcomingEvent />} />
        {/* Route for a specific upcoming event */}
        <Route path="/upcoming-events/:id" element={<UpcomingDetail/>} />
        <Route path="/ongoing-events" element={<OngoingEvent />} />
        <Route path="/ongoing-events/:id" element={<OngoingDetail />} /> 
        <Route path="/completed-events" element={<CompletedEvent />} />
        <Route path="/popupmodal" element={<PopupModal />} />
       
      
      </Routes>
    </Router>
  );
};

export default App;
