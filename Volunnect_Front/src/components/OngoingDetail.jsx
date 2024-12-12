import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../styles/OngoingDetail.module.css";

const OngoingDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/event/getById/${id}`);
        setEvent(response.data);
      } catch (err) {
        setError("Failed to fetch event details. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchEventDetails();
  }, [id]);

  const handleFinishEvent = async () => {
    try {
      await axios.patch(`http://localhost:8080/api/v1/event/finish/${id}`);
      alert("Event marked as completed!");
      navigate("/ongoing-events");
    } catch (err) {
      alert("Failed to mark event as completed.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p>Start Date: {new Date(event.startDate).toLocaleDateString()}</p>
      <p>End Date: {new Date(event.endDate).toLocaleDateString()}</p>
      <p>Location: {event.location}</p>
      <button className={styles.finishButton} onClick={handleFinishEvent}>
        Finish Event
      </button>
    </div>
  );
};


export default OngoingDetail;
