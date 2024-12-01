import React, { useState } from "react";
import VolunteerForm from "../VolunteerForm";
import VolunteerList from "../VolunteerList";

const App = () => {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(!refresh); // Trigger refresh for the list of volunteers
  };

  return (
    <div>
      <h1>Volunteer Management System</h1>
      <VolunteerForm onSuccess={handleRefresh} />
      <VolunteerList refresh={refresh} onRefresh={handleRefresh} />
    </div>
  );
};

export default App;
