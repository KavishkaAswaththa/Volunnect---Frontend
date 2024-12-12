import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../styles/CreateAttendance.module.css"; // Importing the CSS module

function CreateAttendance() {
  const [eventName, setEventName] = useState("");
  const [students, setStudents] = useState([{ roll: 1, name: "", attendance: [] }]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dates, setDates] = useState([]);

  const handleGenerateDates = () => {
    
    if (startDate && endDate && startDate <= endDate) {
      const generatedDates = [];
      let currentDate = new Date(startDate);

      while (currentDate <= endDate) {
        generatedDates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }

      setDates(generatedDates);

      const updatedStudents = students.map((student) => ({
        ...student,
        attendance: new Array(generatedDates.length).fill(false),
      }));

      setStudents(updatedStudents);
    } else {
      alert("Please select a valid date range.");
    }
  };

  const handleAddStudent = () => {
    setStudents([
      ...students,
      { roll: students.length + 1, name: "", attendance: new Array(dates.length).fill(false) },
    ]);
  };

  const handleStudentChange = (index, field, value) => {
    const updatedStudents = [...students];
    updatedStudents[index][field] = value;
    setStudents(updatedStudents);
  };

  const handleCreateAttendance = () => {
    const attendanceData = {
      eventName,
      endDate,
      startDate,
      students,
    };

    axios
      .post("http://localhost:8080/api/attendances", attendanceData)
      .then((response) => {
        console.log("Attendance created successfully:", response.data);
        alert("Attendance record created successfully!");
        setEventName("");
        setStudents([{ roll: 1, name: "", attendance: [] }]);
        setStartDate(null);
        setEndDate(null);
        setDates([]);
      })
      .catch((error) => {
        console.error("Error creating attendance:", error);
        alert("Failed to create attendance record.");
      });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Request Attendance</h2>

      <div className={styles.formGroup}>
        <label className={styles.label}>Event ID:</label>
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Enter event id"
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Event Start Date:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select start date"
          className={styles.datePicker}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />
        <label className={styles.label}>Event End Date:</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select end date"
          className={styles.datePicker}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />
        <button onClick={handleGenerateDates} className={styles.button}>
          Generate Dates
        </button>
      </div>

      <div className={styles.formGroup}>
        <h3 className={styles.subtitle}>Volunteers</h3>
        {students.map((student, index) => (
          <div key={index} className={styles.studentRow}>
            <label className={styles.label}>Volunteer ID: {student.roll}</label>
            <input
              type="text"
              value={student.name}
              onChange={(e) => handleStudentChange(index, "name", e.target.value)}
              placeholder="Enter Volunteer name"
              className={styles.input}
            />
          </div>
        ))}
        <button onClick={handleAddStudent} className={styles.button}>
          Add Volunteer
        </button>
      </div>

      {dates.length > 0 && (
        <div className={styles.datesContainer}>
          <h3 className={styles.subtitle}>Attendance Dates</h3>
          <ul className={styles.dateList}>
            {dates.map((date, index) => (
              <li key={index} className={styles.dateItem}>
                {date.toISOString().split("T")[0]}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button onClick={handleCreateAttendance} className={styles.submitButton}>
        Create Attendance
      </button>
    </div>
  );
}

export default CreateAttendance;
