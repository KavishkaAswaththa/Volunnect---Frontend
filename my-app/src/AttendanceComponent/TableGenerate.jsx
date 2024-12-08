/*import React, { useState } from "react";

function TableGenerate() {
  const [numDays, setNumDays] = useState(0);
  const [columns, setColumns] = useState([]);
  const [eventName, setEventName] = useState("");
  const [students, setStudents] = useState([
    { roll: 10, name: "Katie Womack", attendance: [] },
    { roll: 11, name: "Bryan B Sewell", attendance: [] },
    { roll: 12, name: "Jennifer Beckett", attendance: [] },
    { roll: 13, name: "Etta Thomas", attendance: [] },
    { roll: 14, name: "Tracie Anguiano", attendance: [] },
    { roll: 15, name: "Michael Vasquez", attendance: [] },
  ]);

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setNumDays(value);
      setColumns(Array.from({ length: value }, (_, index) => `Day ${index + 1}`));
      // Reset attendance for new number of days
      const updatedStudents = students.map((student) => ({
        ...student,
        attendance: Array(value).fill(false),
      }));
      setStudents(updatedStudents);
    } else {
      setNumDays(0);
      setColumns([]);
    }
  };

  const handleCheckboxChange = (studentIndex, dayIndex) => {
    const updatedStudents = [...students];
    updatedStudents[studentIndex].attendance[dayIndex] =
      !updatedStudents[studentIndex].attendance[dayIndex];
    setStudents(updatedStudents);
  };

  const handleSave = () => {
    console.log("Saving attendance", { eventName, students });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dynamic Attendance Table</h2>
      <label>
        Event Name:{" "}
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
      </label>
      <br />
      <label>
        Enter the number of Days:{" "}
        <input
          type="number"
          value={numDays || ""}
          onChange={handleInputChange}
          min="1"
          style={{ marginLeft: "10px" }}
        />
      </label>
      <br />
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
      <button onClick={handleSave} style={{ marginTop: "20px" }}>
        Save Attendance
      </button>
    </div>
  );
}

export default TableGenerate;
*/