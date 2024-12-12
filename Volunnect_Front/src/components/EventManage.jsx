import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/ApplicationManage.module.css'; // Import the CSS module

const EventManage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOngoingEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/event/getall');
        console.log('API Response:', response.data);

        const now = new Date();
        const currentDate = new Date(now.toDateString()); // Strip time from 'now'

        const ongoingEvents = response.data.filter((event) => {
          const startDate = new Date(event.startDate);
          const endDate = new Date(event.endDate);

          console.log(
            'Event Start:',
            startDate,
            'Event End:',
            endDate,
            'Current Date:',
            currentDate
          );
          return startDate <= currentDate && endDate >= currentDate; // Compare only dates
        });

        console.log('Filtered Ongoing Events:', ongoingEvents);
        setEvents(ongoingEvents);
      } catch (error) {
        console.error('Error fetching ongoing events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOngoingEvents();
  }, []);

  return (
    <div className={styles.ongoingEventsContainer}>
      <h2 className={styles.ongoingEventsTitle}>Ongoing Events</h2>
      <div className={styles.ongoingEventsRow}>
        {loading ? (
          <p className={styles.loadingMessage}>Loading events...</p>
        ) : events.length === 0 ? (
          <p className={styles.noEventsMessage}>No ongoing events available.</p>
        ) : (
          events.map((event) => (
            <Link key={event.id} className={styles.eventCard} to={`/ongoing-events/${event.id}`}>
              <h5 className={styles.eventTopic}>{event.title}</h5>
              <p className={styles.eventDescription}>{event.description}</p>
              <p className={styles.eventStartDate}>Start Date: {new Date(event.startDate).toLocaleDateString()}</p>
              <p className={styles.eventEndDate}>End Date: {new Date(event.endDate).toLocaleDateString()}</p>
              <p className={styles.eventLocation}>Location: {event.location}</p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default EventManage;