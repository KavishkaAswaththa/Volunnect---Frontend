import React, { useState } from "react";
import CreateUser from "./components/CreateUser";
import SendMessage from "./components/SendMessage";
import GroupChat from "./components/GroupChat"; // New Component for Group Chat
import './App.css';

function App() {
  // State to manage the active tab (CreateUser/SendMessage/GroupChat)
  const [activeTab, setActiveTab] = useState("createUser");

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Chat Application</h1>
        <nav className="app-nav">
          <button
            className={activeTab === "createUser" ? "active" : ""}
            onClick={() => setActiveTab("createUser")}
          >
            Create User
          </button>
          <button
            className={activeTab === "sendMessage" ? "active" : ""}
            onClick={() => setActiveTab("sendMessage")}
          >
            Send Message
          </button>
          <button
            className={activeTab === "groupChat" ? "active" : ""}
            onClick={() => setActiveTab("groupChat")}
          >
            Group Chat
          </button>
        </nav>
      </header>

      <main className="app-content">
        {activeTab === "createUser" && <CreateUser />}
        {activeTab === "sendMessage" && <SendMessage />}
        {activeTab === "groupChat" && <GroupChat />} {/* New Tab */}
      </main>
    </div>
  );
}

export default App;
