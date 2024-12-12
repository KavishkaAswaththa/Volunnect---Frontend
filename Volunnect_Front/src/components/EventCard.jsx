import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const EventCard = ({ event, eventType }) => {
  const [eventStatus, setEventStatus] = useState(eventType);

  useEffect(() => {
    // Checking if the event's start date is today or in the future
    const now = new Date();
    const eventStartDate = new Date(event.startDate);

    if (eventStartDate <= now && eventStatus === "upcoming") {
      // If event start date is today or in the past, move it to ongoing
      setEventStatus("ongoing");
      axios.patch(`http://localhost:8080/api/v1/event/update/${event.id}`, {
        status: "ongoing",
      });
    }
  }, [event]);

  return (
    <Link to={`/${eventStatus}/${event.id}`} className="event-card">
      <div className="event-card-content">
        <h5>{event.title}</h5>
        <p>{event.description}</p>
        <p>Starts on: {new Date(event.startDate).toLocaleDateString()}</p>
        <p>Ends on: {new Date(event.endDate).toLocaleDateString()}</p>
      </div>
    </Link>
  );
};

export default EventCard;
