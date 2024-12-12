import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from "../styles/UpcomingEvent.module.css";

const UpcomingEvent = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  // Fetch upcoming events from the backend
  const fetchUpcomingEvents = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/event/getall");
      const now = new Date();
      const filteredEvents = data
        .filter(event => new Date(event.startDate) > now)
        .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

      setUpcomingEvents(filteredEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
      alert("Failed to fetch events. Please try again later.");
    }
  };

  useEffect(() => {
    fetchUpcomingEvents();
    const interval = setInterval(fetchUpcomingEvents, 30000); // Fetch every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Upcoming Events</h3>
      <div className={styles.eventRow}>
        {upcomingEvents.length ? (
          upcomingEvents.map(event => (
            <Link key={event.id} className={styles.eventCard} to={`/upcoming-events/${event.id}`}>
              <div className={styles.cardContent}>
                <h5>{event.title}</h5>
                <p>{event.description}</p>
                <p>Start Date: {new Date(event.startDate).toLocaleDateString()}</p>
                <p>End Date: {new Date(event.endDate).toLocaleDateString()}</p>
                <p>Location: {event.location}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className={styles.emptyState}>No upcoming events available.</p>
        )}
      </div>
    </div>
  );
};

export default UpcomingEvent;
