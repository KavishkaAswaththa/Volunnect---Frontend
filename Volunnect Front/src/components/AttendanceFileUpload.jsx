import React, { useState } from "react";
import axios from "axios";
import '../styles/AttendanceFileUpload.css';


const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [volunteerId, setVolunteerId] = useState("");
  const [eventId, setEventId] = useState("");
  const [day, setDay] = useState("");
  const [fileId, setFileId] = useState("");
  const [message, setMessage] = useState("");

  const handleFileUpload = async () => {
    if (!file || !volunteerId || !eventId || !day) {
      setMessage("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("volunteerId", volunteerId);
    formData.append("eventId", eventId);
    formData.append("day", day);

    try {
      const response = await axios.post("http://localhost:8080/api/files/upload", formData);
      setMessage(`File uploaded successfully! ID: ${response.data.id}`);
      const ID = response.data.id;
      setFileId(ID);
      console.log(ID);
    } catch (error) {
      console.error(error);
      setMessage("Error uploading file.");
    }
  };

  const handleFileDownload = async () => {
    if (!fileId) {
      setMessage("File ID is required to download.");
      return;
    }
  
    try {
      
      const response = await axios.get(`http://localhost:8080/api/files/${fileId}`, {
        responseType: "blob", // Ensures file is downloaded as binary
      });

      const filename = response.headers["x-filename"];
  
      
  
      // Create a link and trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename); // Use the extracted filename
      document.body.appendChild(link);
      link.click();
      link.remove();
  
      setMessage("File downloaded successfully.");
    } catch (error) {
      console.error(error);
      setMessage("Error downloading file.");
    }
  };
  
  const handleFileDelete = async () => {
    if (!fileId) {
      setMessage("File ID is required to delete.");
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/api/files/${fileId}`);
      setMessage("File deleted successfully.");
    } catch (error) {
      console.error(error);
      setMessage("Error deleting file.");
    }
  };

  const handleMetadataUpdate = async () => {
    if (!fileId || !volunteerId || !eventId || !day) {
      setMessage("All fields are required for updating metadata!");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8080/api/files/${fileId}`, null, {
        params: { volunteerId, eventId, day },
      });
      setMessage(`Metadata updated successfully! New ID: ${response.data.id}`);
    } catch (error) {
      console.error(error);
      setMessage("Error updating metadata.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>File Management</h1>
      
      {/* Upload Section */}
      <h2>Upload File</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <input
        type="text"
        placeholder="Volunteer ID"
        value={volunteerId}
        onChange={(e) => setVolunteerId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Event ID"
        value={eventId}
        onChange={(e) => setEventId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Day"
        value={day}
        onChange={(e) => setDay(e.target.value)}
      />
      <button onClick={handleFileUpload}>Upload</button>

      {/* Metadata Update Section */}
      <h2>Update Metadata</h2>
      
      <input
        type="text"
        placeholder="Volunteer ID"
        value={volunteerId}
        onChange={(e) => setVolunteerId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Event ID"
        value={eventId}
        onChange={(e) => setEventId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Day"
        value={day}
        onChange={(e) => setDay(e.target.value)}
      />
      <button onClick={handleMetadataUpdate}>Update Metadata</button>

      {/* Download Section */}
      <h2>Download File</h2>
      
      <button onClick={handleFileDownload}>Download</button>

      {/* Delete Section */}
      <h2>Delete File</h2>
      
      <button onClick={handleFileDelete}>Delete</button>

      {/* Message Display */}
      {message && <p style={{ color: "blue" }}>{message}</p>}
    </div>
  );
};

export default FileUpload;
