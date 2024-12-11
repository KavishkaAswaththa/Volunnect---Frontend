import React, { useState } from "react";

const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState("");
  const [groupCreated, setGroupCreated] = useState(false);

  const handleCreateGroup = async () => {
    const memberList = members.split(","); // Split the entered members by comma
    const response = await fetch("/chat/groups/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: groupName,
        members: memberList,
      }),
    });
    if (response.ok) {
      setGroupCreated(true);
    }
  };

  return (
    <div>
      <h2>Create Group</h2>
      <input
        type="text"
        placeholder="Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Members (comma-separated)"
        value={members}
        onChange={(e) => setMembers(e.target.value)}
      />
      <button onClick={handleCreateGroup}>Create Group</button>

      {groupCreated && <p>Group created successfully!</p>}
    </div>
  );
};

export default CreateGroup;
