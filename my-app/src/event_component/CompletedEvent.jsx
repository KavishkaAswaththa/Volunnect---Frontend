import React, { useState, useEffect } from "react";
import axios from "axios";

const CompletedEvent = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8081/api/v1/event")
            .then((response) => {
                const completedEvents = response.data.filter((event) => new Date(event.eventDate) < new Date());
                setEvents(completedEvents);
            })
            .catch((error) => {
                console.error("Error fetching completed events:", error);
            });
    }, []);

    return (
        <div className="container mt-5">
            <h2>Completed Events</h2>
            <div className="row">
                {events.length === 0 ? (
                    <p>No completed events available.</p>
                ) : (
                    events.map((event) => (
                        <div key={event.id} className="col-md-4">
                            <div className="card mb-3">
                                <img src={event.image} alt="Event" className="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title">{event.title}</h5>
                                    <p className="card-text">{event.description}</p>
                                    <p className="card-text"><small className="text-muted">{new Date(event.eventDate).toLocaleDateString()}</small></p>
                                    <a href={`/event-details/${event.id}`} className="btn btn-primary">View Details</a>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CompletedEvent;
