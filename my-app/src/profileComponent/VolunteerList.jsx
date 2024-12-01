import React, { useEffect, useState } from "react";

const VolunteerList = ({ refresh, onRefresh }) => {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/volunteers");
        const data = await response.json();
        setVolunteers(data);
      } catch (error) {
        console.error("Error fetching volunteers:", error);
      }
    };
    fetchVolunteers();
  }, [refresh]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/volunteers/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        onRefresh();
      }
    } catch (error) {
      console.error("Error deleting volunteer:", error);
    }
  };

  return (
    <div>
      <h2>Volunteer List</h2>
      {volunteers.length > 0 ? (
        <ul>
          {volunteers.map((volunteer) => (
            <li key={volunteer.id}>
              <p>Name: {volunteer.name}</p>
              <p>Email: {volunteer.email}</p>
              <p>Phone: {volunteer.phone}</p>
              <button onClick={() => handleDelete(volunteer.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No volunteers found.</p>
      )}
    </div>
  );
};

export default VolunteerList;
