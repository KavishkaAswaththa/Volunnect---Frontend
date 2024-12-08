import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/OrganizationDashboard.css";

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
      const { data } = await axios.get("http://localhost:8080/api/v1/event/getall");
      const now = new Date();

      // Update the event status based on the current date
      const updatedEvents = data.map((event) => {
        const eventStartTime = new Date(event.startDate);
        const eventEndTime = new Date(event.endDate);
        
        if (eventStartTime <= now && eventEndTime >= now) {
          event.status = "ongoing"; // Mark event as ongoing
        } else if (eventEndTime < now) {
          event.status = "completed"; // Mark event as completed
        } else {
          event.status = "upcoming"; // Otherwise, it remains upcoming
        }
        return event;
      });

      setEvents({
        upcoming: updatedEvents.filter((event) => event.status === "upcoming").sort((a, b) => new Date(a.startDate) - new Date(b.startDate)),
        ongoing: updatedEvents.filter((event) => event.status === "ongoing").sort((a, b) => new Date(a.startDate) - new Date(b.startDate)),
        completed: updatedEvents.filter((event) => event.status === "completed").sort((a, b) => new Date(b.endDate) - new Date(a.endDate)),
      });

      // Highlight dates for the calendar view
      const dates = data.map((event) =>
        new Date(event.startDate).toISOString().split("T")[0]
      );
      setHighlightedDates(dates);
    } catch (error) {
      console.error("Error fetching events:", error);
      alert("Failed to fetch events. Please try again later.");
    }
  };

  // Add a new event
  const handleAddEvent = async () => {
    const newEvent = {
      title: "New Event",
      description: "Description of the new event",
      startDate: selectedDate || new Date().toISOString(),
      endDate: selectedDate || new Date().toISOString(),
      location: "New Location",
    };

    try {
      const response = await axios.post("http://localhost:8080/api/v1/event/save", newEvent);

      const addedEvent = response.data;

      setEvents((prevEvents) => ({
        ...prevEvents,
        upcoming: [...prevEvents.upcoming, addedEvent],
      }));

      setHighlightedDates((prevDates) => {
        const newHighlightedDates = [...prevDates, selectedDate];
        return Array.from(new Set(newHighlightedDates));
      });

      alert("Event added successfully!");
      navigate("/eventform", { state: { newEvent } });
    } catch (error) {
      console.error("Error adding event:", error);
      alert(
        `Failed to add the event. Error: ${
          error.response ? error.response.data.message : error.message
        }`
      );
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
          <Link className="category-card" to="/completed-events">
            <h5><b>Completed Events</b></h5>
            <p>{events.completed.length} events</p>
          </Link>
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
                className = "highlighted";
              }
              if (formattedDate === selectedDate) {
                className = "selected";
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
                <p>Start Date: {new Date(event.startDate).toLocaleDateString()}</p>
                <p>End Date: {new Date(event.endDate).toLocaleDateString()}</p>
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
