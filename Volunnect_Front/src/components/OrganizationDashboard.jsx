import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "../styles/OrganizationDashboard.module.css"; // Import CSS module

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

        // Normalize the current date to start of the day
        const now = new Date();
        const today = new Date(now.setHours(0, 0, 0, 0));

        // Categorize events into upcoming, ongoing, and completed
        const upcomingEvents = data
            .filter(event => new Date(event.startDate).setHours(0, 0, 0, 0) > today)
            .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

        const ongoingEvents = data
            .filter(event => {
                const eventStart = new Date(event.startDate).setHours(0, 0, 0, 0);
                const eventEnd = new Date(event.endDate).setHours(0, 0, 0, 0);
                return eventStart <= today && eventEnd >= today;
            })
            .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

        const completedEvents = data
            .filter(event => new Date(event.endDate).setHours(0, 0, 0, 0) < today)
            .sort((a, b) => new Date(b.endDate) - new Date(a.endDate));

        // Update the events state
        setEvents({
            upcoming: upcomingEvents,
            ongoing: ongoingEvents,
            completed: completedEvents,
        });

        // Highlight dates for the calendar view
        const highlightedDates = data.map(event =>
            new Date(event.startDate).toISOString().split("T")[0]
        );
        setHighlightedDates(highlightedDates);
    } catch (error) {
        console.error("Error fetching events:", error);
        alert("Failed to fetch events. Please try again later.");
    }
};


  useEffect(() => {
    fetchEvents();
    const interval = setInterval(fetchEvents, 30000); // Fetch every 30 seconds
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
        return <div className={styles.highlightDate}></div>;
      }
    }
    return null;
  };

  return (
    <div className={styles.organizationDashboard}>
      <h3>Organization Dashboard</h3>

      <div className={styles.topSection}>
        <div className={styles.categories}>
          <Link className={styles.categoryCard} to="/upcoming-events">
            <h5><b>Upcoming Events</b></h5>
            <p>{events.upcoming.length} events</p>
          </Link>
          <Link className={styles.categoryCard} to="/ongoing-events">
            <h5><b>Ongoing Events</b></h5>
            <p>{events.ongoing.length} events</p>
          </Link>
          <Link className={styles.categoryCard} to="/completed-events">
            <h5><b>Completed Events</b></h5>
            <p>{events.completed.length} events</p>
          </Link>
        </div>

        <Calendar
          className={styles.calendar}
          onClickDay={handleDateClick}
          tileContent={tileContent}
          value={selectedDate ? new Date(selectedDate) : new Date()}
          tileClassName={({ date, view }) => {
            const formattedDate = date.toLocaleDateString("en-CA");
            let className = "";
            if (view === "month") {
              if (highlightedDates.includes(formattedDate)) {
                className = styles.highlighted;
              }
              if (formattedDate === selectedDate) {
                className = styles.selected;
              }
            }
            return className;
          }}
        />
      </div>

      {/* Flex layout for Ongoing and Upcoming Events */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Ongoing Events Section */}
        <div className={styles.ongoingEvents}>
          <h5>Ongoing Events</h5>
          <div className={styles.eventRow}>
            {events.ongoing.length ? (
              events.ongoing.map((event) => (
                <div key={event.id} className={styles.eventsCard}>
                  <Link className={styles.eventCardContent} to={`/ongoing-events/${event.id}`}>
                    <h5>{event.title}</h5>
                    <p>{event.description}</p>
                    <p>Start Date: {new Date(event.startDate).toLocaleDateString()}</p>
                    <p>End Date: {new Date(event.endDate).toLocaleDateString()}</p>
                    <p>Location: {event.location}</p>
                  </Link>
                </div>
              ))
            ) : (
              <p>No ongoing events found.</p>
            )}
          </div>
        </div>

        {/* Upcoming Events Section */}
        <div className={styles.upcomingEvents}>
          <h5><b>Upcoming Events</b></h5>
          <div className={styles.eventRow}>
            {events.upcoming.length ? (
              events.upcoming.map((event) => (
                <div key={event.id} className={styles.eventsCard}>
                  <Link className={styles.eventCardContent} to={`/upcoming-events/${event.id}`}>
                    <h5>{event.title}</h5>
                    <p>{event.description}</p>
                    <p>Start Date: {new Date(event.startDate).toLocaleDateString()}</p>
                    <p>Location: {event.location}</p>
                  </Link>
                </div>
              ))
            ) : (
              <p>No upcoming events found.</p>
            )}
          </div>
          {/* Add New Event Button */}
          <Link className={styles.addEventBtn} to="">
            
              <b> Add Event</b>
            
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrganizationDashboard;
