import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignupForm";
import ResetPasswordForm from "./components/ResetPasswordForm";
import UpdatePasswordForm from "./components/UpdatePasswordForm";
import FilterEvents from "./components/FilterEvents";
import FilterUsers from "./components/FilterUsers";
import CreateAttendance from "./components/CreateAttendance";
import AttendanceTable from "./components/AttendanceTable";
import AttendanceFileUpload from "./components/AttendanceFileUpload";

import Home from "./components/Home"; // Create a Home component


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/reset-password" element={<ResetPasswordForm />} />
        <Route path="/update-password" element={<UpdatePasswordForm />} />

        <Route path="/FilterUsers" element={<FilterUsers />} />
        <Route path="/FilterEvents" element={<FilterEvents />} />


        <Route path="/CreateAttendance" element={<CreateAttendance />} />
        <Route path="/AttendanceTable" element={<AttendanceTable />} />
        <Route path="/AttendanceFileUpload" element={<AttendanceFileUpload />} />

      </Routes>
    </Router>
  );
}

export default App;
