import React, { useState } from "react";
import axios from "axios";
import styles from '../styles/AttendanceFileUpload.module.css';

const AttendanceFileUpload = () => {
  const [file, setFile] = useState(null);
  const [volunteerId, setVolunteerId] = useState("");
  const [eventId, setEventId] = useState("");
  const [day, setDay] = useState("");
  const [fileId, setFileId] = useState("");
  const [message, setMessage] = useState("");

  const handleFileUpload = async () => {
    if (!file || !volunteerId || !eventId ) {
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
      setFileId(response.data.id);
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
        responseType: "blob",
      });

      const filename = response.headers["x-filename"];
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
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
    if (!fileId || !volunteerId || !eventId ) {
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
    <div className={styles.container}>
      <h1 className={styles.title}>Upload Your Work</h1>

      <h2 className={styles.subtitle}>Upload File</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} className={styles.input} />
      <input
        type="text"
        placeholder="Volunteer ID"
        value={volunteerId}
        onChange={(e) => setVolunteerId(e.target.value)}
        className={styles.input}
      />
      <input
        type="text"
        placeholder="Event ID"
        value={eventId}
        onChange={(e) => setEventId(e.target.value)}
        className={styles.input}
      />
      
      <button onClick={handleFileUpload} className={styles.button}>Upload</button>

      <h2 className={styles.subtitle}>Update Metadata</h2>
      <input
        type="text"
        placeholder="Volunteer ID"
        value={volunteerId}
        onChange={(e) => setVolunteerId(e.target.value)}
        className={styles.input}
      />
      <input
        type="text"
        placeholder="Event ID"
        value={eventId}
        onChange={(e) => setEventId(e.target.value)}
        className={styles.input}
      />
      
      <button onClick={handleMetadataUpdate} className={styles.button}>Update Metadata</button>

      <h2 className={styles.subtitle}>Download File</h2>
      <button onClick={handleFileDownload} className={styles.button}>Download</button>

      <h2 className={styles.subtitle}>Delete File</h2>
      <button onClick={handleFileDelete} className={styles.button}>Delete</button>

      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default AttendanceFileUpload;
