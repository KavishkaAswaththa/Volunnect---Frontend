import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import AttendanceTable from './components/AttendanceTable.jsx'
import FileUpload from './components/AttendanceFileUpload.jsx'

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<AttendanceTable />} />
        <Route path="/about" element={<FileUpload />} />
      </Routes>
    </Router>
  );
}

export default App;
