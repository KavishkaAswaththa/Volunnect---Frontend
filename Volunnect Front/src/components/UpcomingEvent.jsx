import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/UpcomingEvent.css';

const UpcomingEvent = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);

    const fetchEvents = () => {
        axios.get('http://localhost:8080/api/v1/event/getall')
            .then((response) => {
                // Filter events with status 'Upcoming'
                const upcomingEvents = response.data.filter(event => event.status === 'Upcoming');
                setEvents(upcomingEvents);
            })
            .catch((error) => {
                console.error('Error fetching events:', error);
                setError('Failed to load events. Please try again.');
            });
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="container mt-5">
            <h2>Upcoming Events</h2>
            {events.length === 0 ? (
                <p>No upcoming events found.</p>
            ) : (
                <div className="event-row">
                    {events.map((event) => (
                        <Link key={event.id} to={`/upcoming-events/${event.id}`} className="event-card">
                            <div className="event-card-content">
                                <h5>{event.title}</h5>
                                <p>{event.description}</p>
                                <p>On: {new Date(event.startDate).toLocaleDateString()}</p>
                                <p>To: {new Date(event.endDate).toLocaleDateString()}</p>
                                <p>Location: {event.location}</p>
                                <p>Type: {event.type}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UpcomingEvent;
