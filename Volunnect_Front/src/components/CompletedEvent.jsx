import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "../styles/CompletedEvent.module.css";

const CompletedEvent = () => {
  const [completedEvents, setCompletedEvents] = useState([]);

  // Fetch completed events from the backend
  const fetchCompletedEvents = async () => {
    try {
        const { data } = await axios.get("http://localhost:8080/api/v1/event/getall");
        const filteredEvents = data.filter(event => event.status === 'Completed')
            .sort((a, b) => new Date(b.endDate) - new Date(a.endDate)); // Sort by most recent first
        setCompletedEvents(filteredEvents);
    } catch (error) {
        console.error("Error fetching events:", error);
        alert("Failed to fetch events. Please try again later.");
    }
};



  useEffect(() => {
    fetchCompletedEvents();
    const interval = setInterval(fetchCompletedEvents, 30000); // Fetch every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Completed Events</h3>
      <div className={styles.eventRow}>
        {completedEvents.length ? (
          completedEvents.map(event => (
            <div key={event.id} className={styles.eventCard}>
              <div className={styles.cardContent}>
                <h5>{event.title}</h5>
                <p>{event.description}</p>
                <p>Start Date: {new Date(event.startDate).toLocaleDateString()}</p>
                <p>End Date: {new Date(event.endDate).toLocaleDateString()}</p>
                <p>Location: {event.location}</p>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.emptyState}>No completed events available.</p>
        )}
      </div>
    </div>
  );
};

export default CompletedEvent;
