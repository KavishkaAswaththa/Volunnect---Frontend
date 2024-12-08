import React, { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "./EventCard"; // Reuse the card component

const OngoingEvent = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/v1/event/getall")
      .then((response) => {
        const now = new Date();
        const ongoingEvents = response.data.filter((event) => {
          // Create Date objects by combining event's date and time
          const eventStartTime = new Date(`${event.startDate}T${event.startTime}`);
          const eventEndTime = new Date(`${event.endDate}T${event.endTime}`);

          // Check if the current time is between event's start and end times
          return eventStartTime <= now && eventEndTime >= now;
        });
        setEvents(ongoingEvents);
      })
      .catch((error) => {
        console.error("Error fetching ongoing events:", error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2>Ongoing Events</h2>
      <div className="row">
        {events.length === 0 ? (
          <p>No ongoing events available.</p>
        ) : (
          events.map((event) => (
            <div key={event.id} className="col-md-4">
              <EventCard event={event} eventType="ongoing-events" />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OngoingEvent;
