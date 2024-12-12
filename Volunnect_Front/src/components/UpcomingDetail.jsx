import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/UpcomingDetail.module.css';

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
                const eventStartDate = new Date(fetchedEvent.startDate);
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
        <div className={styles.container}>
            <h2 >{event.title}</h2>
            <p>{event.description}</p>
            <p>Start Date: {new Date(event.startDate).toLocaleDateString()}</p>
            <p>End Date: {new Date(event.endDate).toLocaleDateString()}</p>
            <p>Location: {event.location}</p>
            <p>Required Skills: {event.req_skills}</p>
            <p>Type: {event.type}</p>
            <p>Registration Deadline: {new Date(event.reg_Deadline).toLocaleDateString()}</p>

            

            <div className="mt-4">
                <button onClick={() => setShowModal(true)} className="btn btn-warning">Edit Event</button>
                <button onClick={handleDelete} className="btn btn-danger ml-3">Delete Event</button>

                {event.status === 'Ongoing' && (
                    <button onClick={handleFinishEvent} className="btn btn-success ml-3">Finish Event</button>
                )}

                {event.status === 'Upcoming' && (
                    <button onClick={handleStartEvent} className="btn btn-primary ml-3">Start Event</button>
                )}
            </div>

            {showModal && (
                <div className={styles.modal }>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Event</h5>
                                <button type="button" className="close" onClick={() => setShowModal(false)}>&times;</button>
                            </div>
                            <div className="modal-body">
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
                                    <label htmlFor="startDate">Start Date</label>
                                    <input
                                        type="date"
                                        id="startDate"
                                        name="startDate"
                                        value={formData.startDate || ''}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="endDate">End Date</label>
                                    <input
                                        type="date"
                                        id="endDate"
                                        name="endDate"
                                        value={formData.endDate || ''}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
    <label htmlFor="req_skills">Required Skills</label>
    <select
        id="req_skills"
        name="req_skills"
        value={formData.req_skills || ''}
        onChange={handleInputChange}
        className="form-control"
    >
        <option value="">Select a Skill</option>
        <option value="Leadership">Leadership</option>
        <option value="Teamwork">Teamwork</option>
        <option value="Communication">Communication</option>
        <option value="Problem Solving">Problem Solving</option>
        <option value="Creativity">Creativity</option>
    </select>
    <small className="form-text text-muted">You can also add a custom skill if not listed.</small>
    <input
        type="text"
        id="customSkill"
        name="customSkill"
        placeholder="Add custom skill"
        className="form-control mt-2"
        onChange={(e) => setFormData((prev) => ({
            ...prev,
            req_skills: e.target.value || formData.req_skills,
        }))}
    />
</div>

<div className="form-group">
    <label htmlFor="type">Event Type</label>
    <select
        id="type"
        name="type"
        value={formData.type || ''}
        onChange={handleInputChange}
        className="form-control"
    >
        <option value="">Select Event Type</option>
        <option value="Environmental">Environmental</option>
        <option value="Elderly Care">Elderly Care</option>
        <option value="Go green">Go green</option>
        <option value="Paws & Claws">Paws & Claws</option>
        <option value="Education">Education</option>
        <option value="Adopt a Child">Adopt a Child</option>
        <option value="Medicare">Medicare</option>
        <option value="Religious">Religious</option>
        {/* Add more event types as needed */}
    </select>
</div>

<div className="form-group">
    <label htmlFor="reg_Deadline">Registration Deadline</label>
    <input
        type="date"
        id="reg_Deadline"
        name="reg_Deadline"
        value={formData.reg_Deadline || ''}
        onChange={handleInputChange}
        className="form-control"
        required
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
