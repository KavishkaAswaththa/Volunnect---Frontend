import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const OngoingEventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await         axios.get(`http://localhost:8080/api/v1/event/getById/${id}`)
        ;
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event details:", error);
        alert("Failed to fetch event details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const handleFinishEvent = async () => {
    setLoading(true);
    try {
      // Mark the event as completed
      await axios.patch(`http://localhost:8080/api/v1/event/save/${event.id}`, {
        status: "completed",
        endDate: new Date().toISOString(), // Mark the event as finished
      });

      alert("Event marked as completed!");
      navigate("/completed-events"); // Navigate to completed events page
    } catch (error) {
      console.error("Error finishing event:", error);
      alert("Failed to mark event as completed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading event details...</p>;

  if (!event) return <p>Event not found.</p>;

  return (
    <div className="event-detail">
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p>Start Date: {new Date(event.startDate).toLocaleDateString()}</p>
      <p>End Date: {new Date(event.endDate).toLocaleDateString()}</p>
      <p>Location: {event.location}</p>
      <button
        className="btn btn-success"
        onClick={handleFinishEvent}
        disabled={loading}
      >
        {loading ? "Finishing..." : "Finish"}
      </button>
    </div>
  );
};

export default OngoingEventDetail;
