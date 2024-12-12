import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AttendanceTable.css";
import { Pie } from "react-chartjs-2"; // Import the Pie chart
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register the necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

function AttendanceTable() {
  const [eventName, setEventName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [columns, setColumns] = useState([]); // To store column headers as dates
  const [students, setStudents] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState({}); // To store files by volunteerId
  const [dropdownStates, setDropdownStates] = useState({}); // To manage dropdown visibility for each student

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/attendances/675a0a0d7c87635e5e31c0a9")
      .then((response) => {
        const data = response.data;
        setEventName(data.eventName);
        setStartDate(data.startDate);
        setEndDate(data.endDate);

        const start = new Date(data.startDate);
        const end = new Date(data.endDate);
        const dateArray = [];
        while (start <= end) {
          dateArray.push(new Date(start).toISOString().split("T")[0]);
          start.setDate(start.getDate() + 1);
        }
        setColumns(dateArray);

        setStudents(data.students);

        data.students.forEach((student) => {
          fetchUploadedFiles(student.roll);
        });
      })
      .catch((error) => console.error("Error fetching attendance data:", error));
  }, []);

  const fetchUploadedFiles = (volunteerId) => {
    axios
      .get(`http://localhost:8080/api/files/search?volunteerId=${volunteerId}`)
      .then((response) => {
        setUploadedFiles((prev) => ({
          ...prev,
          [volunteerId]: response.data,
        }));
      })
      .catch((error) => console.error("Error fetching files:", error));
  };

  const toggleDropdown = (volunteerId) => {
    setDropdownStates((prev) => ({
      ...prev,
      [volunteerId]: !prev[volunteerId],
    }));
  };

  const handleCheckboxChange = (studentIndex, dayIndex) => {
    const updatedStudents = [...students];
    updatedStudents[studentIndex].attendance[dayIndex] =
      !updatedStudents[studentIndex].attendance[dayIndex];
    setStudents(updatedStudents);

    const updatedAttendance = {
      eventName,
      students: updatedStudents,
    };

    axios
      .put(
        "http://localhost:8080/api/attendances/675a0a0d7c87635e5e31c0a9",
        updatedAttendance
      )
      .then((response) => {
        console.log("Attendance updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating attendance:", error);
      });
  };

  const totalStudents = students.length;
  const totalAttendanceDays = columns.length;
  const totalUploadedFiles = Object.values(uploadedFiles).reduce(
    (acc, files) => acc + files.filter((file) => file.eventId === eventName).length,
    0
  );
  const averageAttendancePercentage =
    totalStudents > 0
      ? (
          students.reduce(
            (acc, student) =>
              acc +
              (student.attendance.filter((isPresent) => isPresent).length /
                totalAttendanceDays) *
                100,
            0
          ) / totalStudents
        ).toFixed(2)
      : 0;

  // Prepare data for the pie chart
  const presentCount = students.reduce(
    (total, student) =>
      total + student.attendance.filter((isPresent) => isPresent).length,
    0
  );
  const absentCount =
    totalStudents * totalAttendanceDays - presentCount;

  const pieData = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        data: [presentCount, absentCount],
        backgroundColor: ["#4caf50", "#f44336"], // Green for Present, Red for Absent
        hoverBackgroundColor: ["#66bb6a", "#ef5350"],
      },
    ],
  };

  return (
    <div className="attendance-table-container" style={{ padding: "20px" }}>
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
              <th>Volunteer ID</th>
              <th>Name</th>
              {columns.map((column, index) => (
                <th key={index}>{column}</th>
              ))}
              <th>Uploads</th>
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
                <td>
                  <button
                    onClick={() => toggleDropdown(student.roll)}
                    style={{
                      marginBottom: "5px",
                      cursor: "pointer",
                      backgroundColor: "#007BFF",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                    }}
                  >
                    {dropdownStates[student.roll] ? "Hide Files" : "Show Files"}
                  </button>
                  {dropdownStates[student.roll] && (
                    <div
                      style={{
                        marginTop: "5px",
                        textAlign: "left",
                        border: "1px solid #ccc",
                        padding: "10px",
                        backgroundColor: "#f9f9f9",
                      }}
                    >
                      {uploadedFiles[student.roll]?.filter(file => file.eventId === eventName).length > 0 ? (
                        uploadedFiles[student.roll]
                          .filter((file) => file.eventId === eventName)
                          .map((file, index) => (
                            <div key={index}>
                              <a
                                href={`http://localhost:8080/api/files/${file.id}`}
                                download={file.fileName}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  display: "block",
                                  color: "#007BFF",
                                  textDecoration: "none",
                                  marginBottom: "5px",
                                }}
                              >
                                {file.fileName} - {file.date}
                              </a>
                            </div>
                          ))
                      ) : (
                        <p>No files uploaded</p>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* Analytical View */}
      <div
        className="analytical-view"
        style={{
          marginTop: "20px",
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "5px",
          backgroundColor: "#f8f8f8",
        }}
      >
        <h3>Analytical View</h3>
        <p><strong>Total Volunteers:</strong> {totalStudents}</p>
        <p><strong>Total Attendance Days:</strong> {totalAttendanceDays}</p>
        <p><strong>Average Attendance Percentage:</strong> {averageAttendancePercentage}%</p>
        <p><strong>Total Uploaded Files:</strong> {totalUploadedFiles}</p>

        {/* Add the Pie Chart */}
        <div style={{ maxWidth: "500px", margin: "20px auto" }}>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
}

export default AttendanceTable;
