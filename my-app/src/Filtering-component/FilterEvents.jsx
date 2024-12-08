import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import "../css/FilterEvents.css";
import { BASE_URL } from '../api';

const FilterEvents = () => {
    const { userId } = useParams();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch(`${BASE_URL}/filterEvents/${userId}`)
            .then((response) => response.json())
            .then((data) => setEvents(data))
            .catch((error) => console.error("Error fetching events:", error));
    }, [userId]);

    return (
        <div className="events-container">
            {events.map((event) => (
                <div key={event.id} className="event-card">
                    <p><h3>{event.name}</h3></p>
                    <p>Type: {event.eventType}</p>
                    <p>Start Date: {event.eventStartDate}</p>
                    <p>End Date:{event.eventEndDate}</p>
                </div>
            ))}
        </div>
    );
};

export default FilterEvents;
