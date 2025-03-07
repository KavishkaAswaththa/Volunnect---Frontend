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
import EventManage from "./components/EventManage"
import ChatApp from "./components/ChatApp"
import CompletedEvent from "./components/CompletedEvent"
import EventCard from "./components/EventCard"
import EventForm from "./components/EventForm"
import GroupChat from "./components/GroupChat"
import OngoingDetail from "./components/OngoingDetail"
import OngoingEvent from "./components/OngoingEvent"
import OrganizationDashboard from "./components/OrganizationDashboard"
import PopupModal from "./components/PopupModal"
import SendMessage from "./components/SendMessage"
import UpcomingEvent from "./components/UpcomingEvent"
import UpcomingDetail from "./components/UpcomingDetail"
// import UpdatePasswarForm from "./components/UpdatePasswarForm"
import VolunteerDashboard from "./components/VolunteerDashboard"

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
        {/* <Route path="/UpdatePasswarForm" element={<UpdatePasswarForm />} /> */}
        <Route path="/OngoingDetail" element={<OngoingDetail />} />
        <Route path="/OrganizationDashboard" element={<OrganizationDashboard />} />

        <Route path="/FilterUsers" element={<FilterUsers />} />
        <Route path="/FilterEvents" element={<FilterEvents />} />

        <Route path="/EventManage" element={<EventManage />} />
        <Route path="/CompletedEvent" element={<CompletedEvent />} />
        <Route path="/EventCard" element={<EventCard />} />
        <Route path="/EventForm" element={<EventForm />} />
        <Route path="/FilterEvents" element={<FilterEvents />} />
        <Route path="/OngoingEvent" element={<OngoingEvent />} />
        <Route path="/PopupModal" element={<PopupModal />} />
        <Route path="/UpcomingEvent" element={<UpcomingEvent />} />
        <Route path="/UpcomingDetail" element={<UpcomingDetail />} />
        <Route path="/VolunteerDashboard" element={<VolunteerDashboard />} />

        <Route path="/ChatApp" element={<ChatApp />} />
        <Route path="/GroupChat" element={<GroupChat />} />
        <Route path="/SendMessage" element={<SendMessage />} />

        <Route path="/CreateAttendance" element={<CreateAttendance />} />
        <Route path="/AttendanceTable" element={<AttendanceTable />} />
        <Route path="/AttendanceFileUpload" element={<AttendanceFileUpload />} />

      </Routes>

    </Router>

  );
}

export default App;
