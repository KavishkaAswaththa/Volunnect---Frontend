import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UpcomingEvent.css';

const UpcomingDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8081/api/v1/event/getById/${id}`)
            .then((response) => {
                setEvent(response.data);
                setFormData(response.data);
            })
            .catch((error) => console.error('Error fetching event details:', error));
    }, [id]);

    if (!event) {
        return <p>Loading event details...</p>;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleShiftChange = (index, e) => {
        const { name, value } = e.target;
        setFormData((prevData) => {
            const updatedShifts = [...prevData.shifts];
            updatedShifts[index] = { ...updatedShifts[index], [name]: value };
            return { ...prevData, shifts: updatedShifts };
        });
    };

    const addShift = () => {
        setFormData((prevData) => ({
            ...prevData,
            shifts: [...prevData.shifts, { shiftTitle: '', shiftDescription: '', startTime: '', endTime: '', volunteerCount: 0 }]
        }));
    };

    const removeShift = (index) => {
        const updatedShifts = formData.shifts.filter((_, i) => i !== index);
        setFormData((prevData) => ({ ...prevData, shifts: updatedShifts }));
    };

    const handleFormSubmit = () => {
        axios.put(`http://localhost:8081/api/v1/event/edit/${id}`, formData)
            .then(() => {
                alert('Event updated successfully!');
                setShowModal(false);
                setEvent(formData);
            })
            .catch((error) => console.error('Error updating event:', error));
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            axios.delete(`http://localhost:8081/api/v1/event/delete/${id}`)
                .then(() => {
                    alert('Event deleted successfully!');
                    navigate('/upcoming-events');
                })
                .catch((error) => console.error('Error deleting event:', error));
        }
    };

    

    return (
        <div className="container mt-5">
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString()}</p>
            <p><strong>Type:</strong> {event.type}</p>
            <p><strong>Skills:</strong> {event.skills}</p>
            <p><strong>Registration Deadline:</strong> {new Date(event.reg_deadline).toLocaleDateString()}</p>

            <h3>Shifts</h3>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Shift Title</th>
                        <th>Shift Description</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Volunteer Count</th>
                    </tr>
                </thead>
                <tbody>
                    {event.shifts.map((shift, index) => (
                        <tr key={index}>
                            <td>{shift.shiftTitle}</td>
                            <td>{shift.shiftDescription}</td>
                            <td>{shift.startTime}</td>
                            <td>{shift.endTime}</td>
                            <td>{shift.volunteerCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-4">
                <button onClick={() => setShowModal(true)} className="btn btn-warning">Edit Event</button>
                <button onClick={handleDelete} className="btn btn-danger ml-3">Delete Event</button>
            </div>

            {showModal && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog  " role="document">
                        <div className="modal-content model-lg">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Event</h5>
                                <button type="button" className="close" onClick={() => setShowModal(false)}>&times;</button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Title</label>
                                    <input type="text" className="form-control" name="title" value={formData.title || ''} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea
                                        className="form-control"
                                        name="description"
                                        value={formData.description || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Location</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="location"
                                        value={formData.location || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="eventDate"
                                        value={formData.eventDate || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Type</label>
                                    <select
                                        className="form-control"
                                        name="type"
                                        value={formData.type || ''}
                                        onChange={handleInputChange}
                                    >
                                        <option value="" disabled>Select Type</option>
                                        <option value="Environmental">Environmental</option>
                                        <option value="Elderly Care">Elderly Care</option>
                                        <option value="Go Green">Go Green</option>
                                        <option value="Medicare">Medicare</option>
                                        <option value="Paws and Claws">Paws and Claws</option>
                                        <option value="Adopt a child">Adopt a child</option>
                                        <option value="Religious">Religious</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Skill</label>
                                    <select
                                        className="form-control"
                                        name="skills"
                                        value={formData.skills || ''}
                                        onChange={handleInputChange}
                                    >
                                        <option value="" disabled>Select Skill</option>
                                        <option value="Communication">Communication</option>
                                        <option value="Leadership">Leadership</option>
                                        <option value="Time management">Time management</option>
                                        <option value="Technical">Technical</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Registration Deadline</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="reg_deadline"
                                        value={formData.reg_deadline || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <h3>Shifts</h3>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Shift Title</th>
                                                <th>Shift Description</th>
                                                <th>Start Time</th>
                                                <th>End Time</th>
                                                <th>Volunteer Count</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {formData.shifts?.map((shift, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="shiftTitle"
                                                            value={shift.shiftTitle}
                                                            onChange={(e) => handleShiftChange(index, e)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="shiftDescription"
                                                            value={shift.shiftDescription}
                                                            onChange={(e) => handleShiftChange(index, e)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="time"
                                                            className="form-control"
                                                            name="startTime"
                                                            value={shift.startTime}
                                                            onChange={(e) => handleShiftChange(index, e)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="time"
                                                            className="form-control"
                                                            name="endTime"
                                                            value={shift.endTime}
                                                            onChange={(e) => handleShiftChange(index, e)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            name="volunteerCount"
                                                            value={shift.volunteerCount}
                                                            onChange={(e) => handleShiftChange(index, e)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="remove-shift-btn"
                                                            onClick={() => removeShift(index)}
                                                        >
                                                            Remove Shift
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={addShift}
                                    >
                                        Add Shift
                                    </button>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
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
