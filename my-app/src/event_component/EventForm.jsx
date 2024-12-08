import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import "./EventForm.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker's CSS

const EventForm = ({ addEventToUpcoming }) => {
  const [eventDetails, setEventDetails] = useState({
    title: '',
    eventDate: '',
    description: '',
    location: '',
    type: '',
    skills: '',
    otherSkills: '',
    regDeadline: '',
    shifts: [{ shiftTitle: '', shiftDescription: '', startTime: '', endTime: '', volunteerCount: 0 }],
    image: null
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
        eventDate: selectedDate
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

  const handleDateChange = (date) => {
    setEventDetails((prevState) => ({
      ...prevState,
      eventDate: date
    }));
  };

  const handleShiftChange = (index, e) => {
    const { name, value } = e.target;
    const updatedShifts = [...eventDetails.shifts];
    updatedShifts[index][name] = value;
    setEventDetails((prevState) => ({
      ...prevState,
      shifts: updatedShifts
    }));
  };

  const addShift = () => {
    setEventDetails((prevState) => ({
      ...prevState,
      shifts: [...prevState.shifts, { shiftTitle: '', shiftDescription: '', startTime: '', endTime: '', volunteerCount: 0 }]
    }));
  };

  const removeShift = (index) => {
    const updatedShifts = eventDetails.shifts.filter((_, i) => i !== index);
    setEventDetails((prevState) => ({
      ...prevState,
      shifts: updatedShifts
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
    const invalidShift = eventDetails.shifts.find(shift => !shift.shiftTitle || !shift.startTime || !shift.endTime || shift.volunteerCount <= 0);
    if (invalidShift) {
      alert('Please fill out all shift details correctly!');
      return;
    }

    const eventData = {
      title: eventDetails.title,
      eventDate: eventDetails.eventDate,
      description: eventDetails.description,
      location: eventDetails.location,
      type: eventDetails.type,
      skills: eventDetails.skills,
      otherSkills: eventDetails.otherSkills,
      regDeadline: eventDetails.regDeadline,
      shifts: eventDetails.shifts.map(shift => ({
        title: shift.shiftTitle,
        description: shift.shiftDescription,
        startTime: shift.startTime,
        endTime: shift.endTime,
        volunteerCount: shift.volunteerCount
      })),
      image: eventDetails.image
    };

    try {
      const response = await axios.post('http://localhost:8081/api/v1/event/save', eventData, {
        headers: { 'Content-Type': 'application/json' }
      });
      addEventToUpcoming(eventData);
      alert('Event saved successfully!');
      navigate("/");  // Navigate back to the dashboard after successful event creation
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Failed to save the event. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-5">
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
        <label htmlFor="eventDate" className="form-label">Event Date:</label>
        <DatePicker
          selected={eventDetails.eventDate}
          onChange={handleDateChange}
          className={`form-control ${eventDetails.eventDate ? 'selected-date' : ''}`}
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
        <label htmlFor="skills" className="form-label">Required Skills:</label>
        <select id="skills" name="skills" value={eventDetails.skills} onChange={handleChange} className="form-select" required>
          <option value="">Select Skill</option>
          <option value="Leadership">Leadership</option>
          <option value="Communication">Communication</option>
          <option value="Technical">Technical</option>
          <option value="Organizational">Organizational</option>
          <option value="Creative">Creative</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {eventDetails.skills === 'Other' && (
        <div className="mb-3">
          <label htmlFor="otherSkills" className="form-label">Other Skills:</label>
          <input type="text" id="otherSkills" name="otherSkills" value={eventDetails.otherSkills} onChange={handleChange} className="form-control" />
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="regDeadline" className="form-label">Registration Deadline:</label>
        <input type="date" id="regDeadline" name="regDeadline" value={eventDetails.regDeadline} onChange={handleChange} className="form-control" required />
      </div>

      <h3>Shifts</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Shift Title</th>
            <th>Shift Description</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Volunteer Count</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {eventDetails.shifts.map((shift, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  name="shiftTitle"
                  value={shift.shiftTitle}
                  onChange={(e) => handleShiftChange(index, e)}
                  className="form-control"
                  required
                />
              </td>
              <td>
                <textarea
                  name="shiftDescription"
                  value={shift.shiftDescription}
                  onChange={(e) => handleShiftChange(index, e)}
                  className="form-control"
                  required
                />
              </td>
              <td>
                <input
                  type="time"
                  name="startTime"
                  value={shift.startTime}
                  onChange={(e) => handleShiftChange(index, e)}
                  className="form-control"
                  required
                />
              </td>
              <td>
                <input
                  type="time"
                  name="endTime"
                  value={shift.endTime}
                  onChange={(e) => handleShiftChange(index, e)}
                  className="form-control"
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  name="volunteerCount"
                  value={shift.volunteerCount}
                  onChange={(e) => handleShiftChange(index, e)}
                  className="form-control"
                  required
                />
              </td>
              <td>
                <button type="button" onClick={() => removeShift(index)} className="btn btn-danger">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" onClick={addShift} className="btn btn-primary mb-3">Add Shift</button>

      <button type="submit" className="btn btn-success">Save Event</button>
    </form>
  );
};

export default EventForm;
