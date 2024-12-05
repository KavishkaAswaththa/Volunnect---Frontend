import React from "react";
import "./../styles/ChatApp.css"; // Import the CSS file for styling

const ChatApp = () => {
  return (
    <div className="chat-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="search-bar">
          <input type="text" placeholder="Search" />
        </div>
        <div className="user-list">
          <div className="user">
            <p>Anton</p>
            <div className="status"></div>
          </div>
          {/* Add more users */}
        </div>
      </div>

      {/* Chat Panel */}
      <div className="chat-panel">
        <div className="chat-header">
          <div className="user-info">
            <img src="user-avatar.png" alt="Avatar" />
            <h3>Anton</h3>
          </div>
        </div>

        <div className="chat-messages">
          <div className="chat-message sent">
            <div className="bubble">Hello Sir...</div>
          </div>
          <div className="chat-message received">
            <div className="bubble">Yes...</div>
          </div>
        </div>

        <div className="chat-input">
          <input type="text" placeholder="Type here..." />
          <button>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
