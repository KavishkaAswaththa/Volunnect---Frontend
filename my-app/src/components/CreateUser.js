import React, { useState } from "react";
import axios from "axios";

const CreateUser = () => {
  const [name, setName] = useState("");

  const handleCreateUser = async () => {
    try {
      const response = await axios.post("http://localhost:8080/chat/users", name, {
        headers: { "Content-Type": "application/json" },
      });
      alert(`User Created: ${response.data.name} (ID: ${response.data.id})`);
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to create user.");
    }
  };

  return (
    <div>
      <h2>Create User</h2>
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleCreateUser}>Create User</button>
    </div>
  );
};

export default CreateUser;
