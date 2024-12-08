import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/UpcomingEvent.css';

const UpcomingDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/event/getById/${id}`)
            .then((response) => {
                const fetchedEvent = response.data;
                setEvent(fetchedEvent);
                setFormData(fetchedEvent);

                // Automatically start the event if it's the start date
                const currentDate = new Date();
                const eventStartDate = new Date(fetchedEvent.eventDate);
                if (eventStartDate <= currentDate && fetchedEvent.status !== 'Completed') {
                    handleStartEvent();
                }
            })
            .catch((error) => console.error('Error fetching event details:', error));
    }, [id]);

    if (!event) {
        return <p>Loading event details...</p>;
    }

    // Handle form data changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFormSubmit = () => {
        axios.put(`http://localhost:8080/api/v1/event/edit/${event.id}`, formData)
            .then(() => {
                alert('Event updated successfully!');
                setShowModal(false);
                setEvent(formData);
            })
            .catch((error) => console.error('Error updating event:', error));
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            axios.delete(`http://localhost:8080/api/v1/event/delete/${event.id}`)
                .then(() => {
                    alert('Event deleted successfully!');
                    navigate('/upcoming-events');
                })
                .catch((error) => console.error('Error deleting event:', error));
        }
    };

    const handleStartEvent = () => {
        const updatedEvent = { ...event, status: 'Ongoing' };
        axios.put(`http://localhost:8080/api/v1/event/edit/${event.id}`, updatedEvent)
            .then(() => {
                setEvent(updatedEvent);
                alert('Event status updated to Ongoing!');
            })
            .catch((error) => console.error('Error updating event status:', error));
    };

    const handleFinishEvent = () => {
        const updatedEvent = { ...event, status: 'Completed' };
        axios.put(`http://localhost:8080/api/v1/event/edit/${event.id}`, updatedEvent)
            .then(() => {
                setEvent(updatedEvent);
                alert('Event completed!');
            })
            .catch((error) => console.error('Error finishing event:', error));
    };

    return (
        <div className="container mt-5">
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Start Date:</strong> {new Date(event.startDate).toLocaleDateString()}</p>
            <p><strong>End Date:</strong> {new Date(event.endDate).toLocaleDateString()}</p>
            <p><strong>Type:</strong> {event.type}</p>
            <p><strong>Skills:</strong> {event.skills}</p>
            <p><strong>Registration Deadline:</strong> {new Date(event.reg_deadline).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {event.status}</p>

            <div className="mt-4">
                <button onClick={() => setShowModal(true)} className="btn btn-warning">Edit Event</button>
                <button onClick={handleDelete} className="btn btn-danger ml-3">Delete Event</button>

                {/* Show Finish Event button only when the event is ongoing */}
                {event.status === 'Ongoing' && (
                    <button onClick={handleFinishEvent} className="btn btn-success ml-3">Finish Event</button>
                )}

                {/* Show Start Event button only when the event is upcoming */}
                {event.status === 'Upcoming' && (
                    <button onClick={handleStartEvent} className="btn btn-primary ml-3">Start Event</button>
                )}
            </div>

            {showModal && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Event</h5>
                                <button type="button" className="close" onClick={() => setShowModal(false)}>&times;</button>
                            </div>
                            <div className="modal-body">
                                {/* Form for editing event details */}
                                <div className="form-group">
                                    <label htmlFor="title">Event Title</label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={formData.title || ''}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={formData.description || ''}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="location">Location</label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        value={formData.location || ''}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="eventDate">Event Date</label>
                                    <input
                                        type="date"
                                        id="eventDate"
                                        name="eventDate"
                                        value={formData.eventDate || ''}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="reg_deadline">Registration Deadline</label>
                                    <input
                                        type="date"
                                        id="reg_deadline"
                                        name="reg_deadline"
                                        value={formData.reg_deadline || ''}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                </div>
                                <button type="button" className="btn btn-primary" onClick={handleFormSubmit}>Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpcomingDetail;
