import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FilterEvents from './Filtering-component/FilterEvents.jsx';
import FilterUsers from './Filtering-component/FilterUsers.jsx';

const App = () => {
  return (
      <Router>
          <Routes>
              <Route path="/filter-events/:userId" element={<FilterEvents />} />
              <Route path="/filter-users/:eventId" element={<FilterUsers />} />
          </Routes>
      </Router>
  );
};


export default App;
