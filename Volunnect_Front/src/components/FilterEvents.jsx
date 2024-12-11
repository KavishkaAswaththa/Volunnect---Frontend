import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import "../styles/FilterEvents.css";
import { BASE_URL } from '../services/api.js';

const FilterEvents = () => {
    const { userId } = useParams();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch(`${BASE_URL}/filter/events/${userId}`)
            .then((response) => response.json())
            .then((data) => setEvents(data))
            .catch((error) => console.error("Error fetching events:", error));
    }, [userId]);

    return (
        <div className="events-container">
            {events.map((event) => (
                <div key={event.id} className="event-card">
                    
                    <p><h3>{event.title}</h3></p>
                    <p>Type: {event.type}</p>
                    <p>Start Date: {event.startDate}</p>
                    <p>End Date:{event.endDate}</p>
                </div>
            ))}
        </div>
    );
};

export default FilterEvents;
