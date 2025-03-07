import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from "../styles/EventForm.module.css"; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker's CSS

const EventForm = ({ addEventToUpcoming }) => {
  const [eventDetails, setEventDetails] = useState({
    title: '',
    startDate: '',
    endDate: '',
    description: '',
    location: '',
    type: '',
    req_skills: '',
    otherSkills: '',
    reg_Deadline: '',
  });

  const navigate = useNavigate();
  const location = useLocation(); // Access the location object
  const eventTypeOptions = ['Environmental', 'Elderly Care', 'Go Green', 'Education', 'Medicare', 'Paws and Claws', 'Adopt a Child', 'Religious'];

  // Autofill event date if selected date is passed from the calendar
  useEffect(() => {
    if (location.state?.selectedDate) {
      const selectedDate = new Date(location.state.selectedDate);
      setEventDetails((prevState) => ({
        ...prevState,
        startDate: selectedDate,
        endDate: selectedDate
      }));
    }
  }, [location.state?.selectedDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleStartDateChange = (date) => {
    setEventDetails((prevState) => ({
      ...prevState,
      startDate: date
    }));
  };

  const handleEndDateChange = (date) => {
    setEventDetails((prevState) => ({
      ...prevState,
      endDate: date
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5000000) {
      alert('File size exceeds 5MB limit!');
      return;
    }
    setEventDetails({ ...eventDetails, image: URL.createObjectURL(file) });
  };

  const removeImage = () => {
    setEventDetails((prevState) => ({
      ...prevState,
      image: null
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventData = {
      title: eventDetails.title,
      startDate: eventDetails.startDate,
      endDate: eventDetails.endDate,
      description: eventDetails.description,
      location: eventDetails.location,
      type: eventDetails.type,
      req_skills: eventDetails.req_skills,
      otherSkills: eventDetails.otherSkills,
      reg_Deadline: eventDetails.reg_Deadline,
      image: eventDetails.image
    };

    try {
      const response = await axios.post('http://localhost:8080/api/v1/event/save', eventData, {
        headers: { 'Content-Type': 'application/json' }
      });
      //addEventToUpcoming(eventData);
      alert('Event saved successfully!');
      navigate("/organization-dashboard");  // Navigate back to the dashboard after successful event creation
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Failed to save the event. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`${styles.container} mt-5`}>
      <h2>Add Event</h2>
      <div className="mb-3">
        <label htmlFor="image" className="form-label">Event Image:</label>
        <input type="file" name="image" accept="image/*" onChange={handleImageChange} className="form-control" />
        {eventDetails.image && (
          <div>
            <img src={eventDetails.image} alt="Event" className="mt-3" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
            <button type="button" onClick={removeImage} className="btn btn-danger mt-2">Remove Image</button>
          </div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title:</label>
        <input type="text" id="title" name="title" value={eventDetails.title} onChange={handleChange} className="form-control" required />
      </div>

      <div className="mb-3">
        <label htmlFor="startDate" className="form-label">Start Date:</label>
        <DatePicker
          selected={eventDetails.startDate}
          onChange={handleStartDateChange}
          className={`form-control ${eventDetails.startDate ? 'selected-date' : ''}`}
          dateFormat="yyyy-MM-dd"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="endDate" className="form-label">End Date:</label>
        <DatePicker
          selected={eventDetails.endDate}
          onChange={handleEndDateChange}
          className={`form-control ${eventDetails.endDate ? 'selected-date' : ''}`}
          dateFormat="yyyy-MM-dd"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description:</label>
        <textarea id="description" name="description" value={eventDetails.description} onChange={handleChange} className="form-control" required />
      </div>

      <div className="mb-3">
        <label htmlFor="location" className="form-label">Location:</label>
        <input type="text" id="location" name="location" value={eventDetails.location} onChange={handleChange} className="form-control" required />
      </div>

      <div className="mb-3">
        <label htmlFor="type" className="form-label">Event Type:</label>
        <select id="type" name="type" value={eventDetails.type} onChange={handleChange} className="form-select" required>
          <option value="">Select Event Type</option>
          {eventTypeOptions.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="req_skills" className="form-label">Required Skills:</label>
        <select id="req_skills" name="req_skills" value={eventDetails.req_skills} onChange={handleChange} className="form-select" required>
          <option value="">Select Skill</option>
          <option value="Leadership">Leadership</option>
          <option value="Communication">Communication</option>
          <option value="Technical">Technical</option>
          <option value="Organizational">Organizational</option>
          <option value="Creative">Creative</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {eventDetails.req_skills === 'Other' && (
        <div className="mb-3">
          <label htmlFor="otherSkills" className="form-label">Other Skills:</label>
          <input type="text" id="otherSkills" name="otherSkills" value={eventDetails.otherSkills} onChange={handleChange} className="form-control" />
        </div>
      )}

<div className="mb-3">
  <label htmlFor="reg_Deadline" className="form-label">Registration Deadline:</label>
  <DatePicker
    selected={eventDetails.reg_Deadline}
    onChange={(date) => setEventDetails({ ...eventDetails, reg_Deadline: date })}
    className={`form-control ${eventDetails.reg_Deadline ? 'selected-date' : ''}`}
    dateFormat="yyyy-MM-dd"
    required
  />
</div>


      <button type="submit" className="btn btn-success">Save Event</button>
    </form>
  );
};

export default EventForm;
