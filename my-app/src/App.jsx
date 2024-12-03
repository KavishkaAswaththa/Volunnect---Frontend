/*
import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [eventName, setEventName] = useState('');
  const [students, setStudents] = useState([
    { roll: 10, name: 'Katie Womack', attendance: [true, true, false] },
    { roll: 11, name: 'Bryan B Sewell', attendance: [false, true, true] },
    { roll: 12, name: 'Jennifer Beckett', attendance: [true, false, true] },
    { roll: 13, name: 'Etta Thomas', attendance: [false, true, false] },
    { roll: 14, name: 'Tracie Anguiano', attendance: [true, false, true] },
    { roll: 15, name: 'Michael Vasquez', attendance: [false, true, false] }
  ]);

  

  const handleCheckboxChange = (studentIndex, dayIndex) => {
    const updatedStudents = [...students];
    updatedStudents[studentIndex].attendance[dayIndex] = !updatedStudents[studentIndex].attendance[dayIndex];
    setStudents(updatedStudents);
  };


  const saveAttendance = async () => {
      const response = await fetch('http://localhost:8080/api/attendances', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ eventName, students }),
      });
    
      if (response.ok) {
        alert('Attendance saved successfully!');
      } else {
        alert('Failed to save attendance.');
      }
    };
    
    console.log('Saving attendance', { eventName, students });
  

  return (
    <div className="attendance-container">
      <h1>Attendance</h1>
      <div className="event-section">
        <label htmlFor="event">Event Name: </label>
        <input
          type="text"
          id="event"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <button className="load-button">Load</button>
      </div>
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Roll</th>
            <th>Student's Name</th>
            <th>Day 1</th>
            <th>Day 2</th>
            <th>Day 3</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.roll}>
              <td>{student.roll}</td>
              <td>{student.name}</td>
              {student.attendance.map((isPresent, dayIndex) => (
                <td key={dayIndex}>
                  <input
                    type="checkbox"
                    checked={isPresent}
                    onChange={() => handleCheckboxChange(index, dayIndex)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button className="save-button" onClick={saveAttendance}>
        Save Attendance
      </button>
    </div>
  );
};

export default App;
*/