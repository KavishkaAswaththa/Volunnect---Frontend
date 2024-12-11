import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/SendMessage.css";

const SendMessage = () => {
  const [users, setUsers] = useState([]); // List of users
  const [searchQuery, setSearchQuery] = useState(""); // Search input
  const [selectedUser, setSelectedUser] = useState(null); // Selected user
  const [message, setMessage] = useState(""); // Message input
  const [messages, setMessages] = useState([]); // Combined messages
  const [currentUserId, setCurrentUserId] = useState(1); // Current user ID (set dynamically)

  // Fetch all users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/chat/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        alert("Failed to fetch users.");
      }
    };
    fetchUsers();
  }, []);

  // Fetch messages for the selected user
  const fetchMessages = async (currentUserId, otherUserId) => {
    try {
      const sentMessagesResponse = await axios.get(
        `http://localhost:8080/chat/messages/${currentUserId}/${otherUserId}`
      );

      const receivedMessagesResponse = await axios.get(
        `http://localhost:8080/chat/messages/${otherUserId}/${currentUserId}`
      );

      const combinedMessages = [
        ...sentMessagesResponse.data.map((msg) => ({
          content: msg.messageContent,
          isSent: true,
          timestamp: msg.timestamp,
        })),
        ...receivedMessagesResponse.data.map((msg) => ({
          content: msg.messageContent,
          isSent: false,
          timestamp: msg.timestamp,
        })),
      ];

      // Sort messages by timestamp
      combinedMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

      setMessages(combinedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      alert("Failed to fetch messages.");
    }
  };

  // Handle selecting a user and fetching messages
  const handleUserSelect = (user) => {
    setSelectedUser(user);
    fetchMessages(currentUserId, user.id);
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!selectedUser || !message) {
      alert("Please select a user and write a message.");
      return;
    }

    const messageDTO = {
      fromUserId: currentUserId,
      toUserId: selectedUser.id,
      messageContent: message,
      readStatus: false,
      priority: 3,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/chat/send-message",
        messageDTO,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          content: message,
          isSent: true,
          timestamp: new Date().toISOString(), // Assuming a current timestamp
        },
      ]);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message.");
    }
  };

  // Filter users based on search query
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="send-message-container">
      {/* User Search and List */}
      <div className="users-list">
        <input
          type="text"
          placeholder="Search users by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="send-message-container1">
        <ul className="user-list">
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              className={selectedUser?.id === user.id ? "selected" : ""}
              onClick={() => handleUserSelect(user)}
            >
              {user.name}
            </li>
          ))}
        </ul>
        </div>
      </div>

      {/* Chat Box */}
      <div className="chat-box">
        {selectedUser ? (
          <>
            <h3>Chat with {selectedUser.name}</h3>
            <div className="messages">
              {messages.map((msg, index) => (
                <p
                  key={index}
                  className={`message ${msg.isSent ? "sent" : "received"}`}
                >
                  {msg.content}
                </p>
              ))}
            </div>

            <input
              type="text"
              placeholder="Type a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
          </>
        ) : (
          <p>Please select a user to start chatting.</p>
        )}
      </div>
    </div>
  );
};

export default SendMessage;
