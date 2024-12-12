import React, { useState } from "react";
import "../Styles/GroupChat.css";

function GroupChat() {
  const [groupName, setGroupName] = useState("");
  const [groupList, setGroupList] = useState([]); // List of groups
  const [selectedGroup, setSelectedGroup] = useState(null); // Active group
  const [groupMembers, setGroupMembers] = useState({}); // Members for each group
  const [newMember, setNewMember] = useState(""); // New member name
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState({}); // Messages for each group

  // Create a new group
  const handleCreateGroup = () => {
    if (groupName.trim() !== "" && !groupList.includes(groupName)) {
      setGroupList([...groupList, groupName]);
      setMessages({ ...messages, [groupName]: [] });
      setGroupMembers({ ...groupMembers, [groupName]: [] });
      setGroupName("");
    }
  };

  // Add a member to the selected group
  const handleAddMember = () => {
    if (selectedGroup && newMember.trim() !== "") {
      const updatedMembers = {
        ...groupMembers,
        [selectedGroup]: [...groupMembers[selectedGroup], newMember],
      };
      setGroupMembers(updatedMembers);
      setNewMember("");
    }
  };

  // Send a message to the selected group
  const handleSendMessage = () => {
    if (selectedGroup && message.trim() !== "") {
      const updatedMessages = {
        ...messages,
        [selectedGroup]: [...messages[selectedGroup], message],
      };
      setMessages(updatedMessages);
      setMessage("");
    }
  };

  return (
    <div className="group-chat-container">
      <div className="group-list">
        <h3>Groups</h3>
        <ul>
          {groupList.map((group, index) => (
            <li
              key={index}
              className={selectedGroup === group ? "active" : ""}
              onClick={() => setSelectedGroup(group)}
            >
              {group}
            </li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Create a new group"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <button onClick={handleCreateGroup}>Create Group</button>
      </div>

      <div className="chat-section">
        {selectedGroup ? (
          <>
            <h3>Group: {selectedGroup}</h3>
            <div className="group-members">
              <h4>Members</h4>
              <ul>
                {groupMembers[selectedGroup]?.map((member, index) => (
                  <li key={index}>{member}</li>
                ))}
              </ul>
              <input
                type="text"
                placeholder="Add member"
                value={newMember}
                onChange={(e) => setNewMember(e.target.value)}
              />
              <button onClick={handleAddMember}>Add Member</button>
            </div>
            <div className="message-section">
              <div className="messages">
                {messages[selectedGroup]?.map((msg, index) => (
                  <p key={index}>{msg}</p>
                ))}
              </div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}

export default GroupChat;
