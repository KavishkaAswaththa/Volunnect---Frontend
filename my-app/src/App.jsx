import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FilterEvents from './features/AdvancedFiltering/FilterEvents.jsx';
import FilterUsers from './features/AdvancedFiltering/FilterUsers.jsx';

const App = () => {
  return (
      <Router>
          <Routes>
              <Route path="/filter-events/:userId" element={<FilterEvents />} />
              <Route path="/filter-volunteers/:eventId" element={<FilterUsers />} />
          </Routes>
      </Router>
  );
};


export default App;
