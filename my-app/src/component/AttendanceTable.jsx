import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AttendanceTable.css";


function AttendanceTable() {
  const [eventName, setEventName] = useState("");
  const [columns, setColumns] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch data from the specified endpoint
    axios
      .get("http://localhost:8080/api/attendances/67486ff6e7cebd602d0a2f2b")
      .then((response) => {
        const data = response.data;
        setEventName(data.eventName);

        // Determine the number of days from the attendance length of the first student
        if (data.students.length > 0) {
          setColumns(
            Array.from(
              { length: data.students[0].attendance.length },
              (_, index) => `Day ${index + 1}`
            )
          );
        }

        setStudents(data.students);
      })
      .catch((error) => console.error("Error fetching attendance data:", error));
  }, []);

  const handleCheckboxChange = (studentIndex, dayIndex) => {
    // Update the attendance state locally
    const updatedStudents = [...students];
    updatedStudents[studentIndex].attendance[dayIndex] =
      !updatedStudents[studentIndex].attendance[dayIndex];
    setStudents(updatedStudents);

    // Prepare the updated data to send to the backend
    const updatedAttendance = {
      eventName,
      students: updatedStudents,
    };

    // Send the updated data to the backend
    axios
      .put(
        "http://localhost:8080/api/attendances/67486ff6e7cebd602d0a2f2b",
        updatedAttendance
      )
      .then((response) => {
        console.log("Attendance updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating attendance:", error);
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Attendance for Event: {eventName}</h2>
      {columns.length > 0 && (
        <table
          border="1"
          style={{
            marginTop: "20px",
            borderCollapse: "collapse",
            width: "100%",
            textAlign: "center",
          }}
        >
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Name</th>
              {columns.map((column, index) => (
                <th key={index}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map((student, studentIndex) => (
              <tr key={student.roll}>
                <td>{student.roll}</td>
                <td>{student.name}</td>
                {student.attendance.map((isPresent, dayIndex) => (
                  <td key={dayIndex}>
                    <input
                      type="checkbox"
                      checked={isPresent}
                      onChange={() =>
                        handleCheckboxChange(studentIndex, dayIndex)
                      }
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AttendanceTable;
