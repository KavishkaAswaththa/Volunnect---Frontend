import React, { useState, useEffect } from "react";
import axios from "axios";

const CompletedEvent = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompletedEvents = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/event");
        const completedEvents = response.data.filter(
          (event) => event.status === "completed"
        );
        setEvents(completedEvents);
      } catch (error) {
        
        alert("Failed to fetch completed events. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedEvents();
  }, []);

  if (loading) return <p>Loading completed events...</p>;

  return (
    <div className="container">
      <h2>Completed Events</h2>
      <div className="event-list">
        {events.length === 0 ? (
          <p>No completed events available.</p>
        ) : (
          events.map((event) => (
            <div key={event.id} className="event-card">
              <h5>{event.title}</h5>
              <p>{event.description}</p>
              <p>Completed on: {new Date(event.endDate).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CompletedEvent;
