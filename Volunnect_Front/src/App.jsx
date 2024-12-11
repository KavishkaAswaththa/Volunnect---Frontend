import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignupForm";
import ResetPasswordForm from "./components/ResetPasswordForm";
import UpdatePasswordForm from "./components/UpdatePasswordForm";
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
      </Routes>
    </Router>
  );
}

export default App;
