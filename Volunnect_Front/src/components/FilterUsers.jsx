import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import '../styles/FilterUsers.css';
import { BASE_URL } from '../services/api';

const FilterUsers = () => {
    const { eventId } = useParams();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch(`${BASE_URL}/filter/volunteers/${eventId}`)
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error("Error fetching users:", error));
    }, [eventId]);

    return (
        <div className="users-container">
            {users.map((user) => (
                <div key={user.id} className="user-card">
                    <h3>{user.name}</h3>
                    <p>Rating: {user.ratings}</p>
                    <p>Interests: {user.interests.join(", ")}</p>
                </div>
            ))}
        </div>
    );
};

export default FilterUsers;
