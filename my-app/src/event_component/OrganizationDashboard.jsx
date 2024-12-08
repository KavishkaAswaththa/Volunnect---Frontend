import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./OrganizationDashboard.css";

const OrganizationDashboard = () => {
  const [events, setEvents] = useState({
    upcoming: [],
    ongoing: [],
    completed: [],
  });
  const [highlightedDates, setHighlightedDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  // Fetch events from the backend
  const fetchEvents = async () => {
    try {
      const { data } = await axios.get("http://localhost:8081/api/v1/event/getall");
      const now = new Date();

      // Correct filtering logic for upcoming, ongoing, and completed events
      setEvents({
        upcoming: data.filter((event) => new Date(event.eventDate) > now),
        ongoing: data.filter(
          (event) => {
            const eventStartTime = new Date(`${event.startDate}T${event.startTime}`);
            const eventEndTime = new Date(`${event.endDate}T${event.endTime}`);
            return eventStartTime <= now && eventEndTime >= now;
          }
        ),
        completed: data.filter((event) => {
          const eventEndTime = new Date(`${event.endDate}T${event.endTime}`);
          return eventEndTime < now;
        }),
      });

      // Highlight dates for the calendar view
      const dates = data.map((event) =>
        new Date(event.eventDate).toISOString().split("T")[0]
      );
      setHighlightedDates(dates); // Set the highlighted dates based on the fetched events
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Add a new event
  const handleAddEvent = async () => {
    const newEvent = {
      title: "New Event",
      description: "Description of the new event",
      eventDate: selectedDate || new Date().toISOString(),
      startDate: selectedDate || new Date().toISOString(),
      endDate: selectedDate || new Date().toISOString(),
      location: "New Location",
    };

    try {
      // Make an API call to save the event
      const response = await axios.post("http://localhost:8081/api/v1/event/save", newEvent);
      console.log("Event added successfully", response);  // Log the response

      const addedEvent = response.data;

      // Update state to include the newly added event
      setEvents((prevEvents) => {
        const updatedUpcoming = [...prevEvents.upcoming, addedEvent];
        return {
          ...prevEvents,
          upcoming: updatedUpcoming,
        };
      });

      // Add the new event's date to the highlighted dates
      setHighlightedDates((prevDates) => {
        const newHighlightedDates = [...prevDates, selectedDate];
        return Array.from(new Set(newHighlightedDates)); // Remove duplicates
      });

      // Alert user that the event was added
      alert("Event added successfully!");
      navigate("/eventform", { state: { newEvent: newEvent } });

    } catch (error) {
      console.error("Error adding event:", error);
      alert(`Failed to add the event. Error: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  useEffect(() => {
    fetchEvents();
    const interval = setInterval(fetchEvents, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleDateClick = (date) => {
    const formattedDate = date.toLocaleDateString("en-CA");
    setSelectedDate(formattedDate);
    navigate("/eventform", { state: { selectedDate: formattedDate } });
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const formattedDate = date.toISOString().split("T")[0];
      if (highlightedDates.includes(formattedDate)) {
        return <div className="highlight-date"></div>;
      }
    }
    return null;
  };

  return (
    <div className="organization-dashboard">
      <h3>Organization Dashboard</h3>

      <div className="top-section">
        <div className="categories">
          <Link className="category-card" to="/upcoming-events">
            <h5><b>Upcoming Events</b></h5>
            <p>{events.upcoming.length} events</p>
          </Link>
          <Link className="category-card" to="/ongoing-events">
            <h5><b>Ongoing Events</b></h5>
            <p>{events.ongoing.length} events</p>
          </Link>
          <div className="category-card">
            <h5><b>Completed Events</b></h5>
            <p>{events.completed.length} events</p>
          </div>
        </div>

        <Calendar
          onClickDay={handleDateClick}
          tileContent={tileContent}
          value={selectedDate ? new Date(selectedDate) : new Date()}
          tileClassName={({ date, view }) => {
            const formattedDate = date.toLocaleDateString("en-CA");
            let className = "";
            if (view === "month") {
              if (highlightedDates.includes(formattedDate)) {
                className = "highlighted"; // Add highlighted class if the date is part of the event dates
              }
              if (formattedDate === selectedDate) {
                className = "selected"; // Add a separate class for the selected date
              }
            }
            return className;
          }}
        />
      </div>

      <div className="ongoing-events">
        <h5><b>Ongoing Events</b></h5>
        <div className="event-row">
          {events.ongoing.map((event) => (
            <div key={event.id} className="event-card">
              <h6>{event.title}</h6>
              <p>{event.description}</p>
              <p>{new Date(event.startDate).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="upcoming-events">
        <h5><b>Upcoming Events</b></h5>
        <div className="event-row">
          {events.upcoming.map((event) => (
            <Link key={event.id} to={`/upcoming-events/${event.id}`} className="event-card">
              <div className="event-card-content">
                <h5>{event.title}</h5>
                <p>{event.description}</p>
                <p>Date: {new Date(event.eventDate).toLocaleDateString()}</p>
                <p>Location: {event.location}</p>
              </div>
            </Link>
          ))}
        </div>
        <button className="add-event-btn" onClick={handleAddEvent}>
          Add Event
        </button>
      </div>
    </div>
  );
};

export default OrganizationDashboard;
