import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({ event, eventType }) => (
  <Link to={`/${eventType}/${event.id}`} className="event-card">
    <div className="event-card-content">
      <h5>{event.title}</h5>
      <p>{event.description}</p>
      <p>
        Ends on: {new Date(event.endDate).toLocaleDateString()}
      </p>
      <p>Location: {event.location}</p>
    </div>
  </Link>
);

export default EventCard;
