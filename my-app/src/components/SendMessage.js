import React, { useState } from "react";
import axios from "axios";

const SendMessage = () => {
  const [fromUserId, setFromUserId] = useState("");
  const [toUserId, setToUserId] = useState("");
  const [message, setMessage] = useState("");

  const handleSendMessage = async () => {
    const messageDTO = { fromUserId, toUserId, message };

    try {
      const response = await axios.post(
        "http://localhost:8080/chat/send-message",
        messageDTO,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      alert(response.data);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message.");
    }
  };

  return (
    <div>
      <h2>Send Message</h2>
      <input
        type="text"
        placeholder="From User ID"
        value={fromUserId}
        onChange={(e) => setFromUserId(e.target.value)}
      />
      <input
        type="text"
        placeholder="To User ID"
        value={toUserId}
        onChange={(e) => setToUserId(e.target.value)}
      />
      <textarea
        placeholder="Enter your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send Message</button>
    </div>
  );
};

export default SendMessage;
