import React, { useState } from "react";

const VolunteerForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
  
    phone: "",
    address: "",
    Date_of_Birth:"",
    skill:"",
    availability:"",

  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing
      ? `http://localhost:8080/api/volunteers/${formData.id}`
      : "http://localhost:8080/api/volunteers";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setFormData({ phone: "", address: "",Date_of_Birth:"", skill:"",availability:"" });
        setIsEditing(false);
        onSuccess(); // Trigger refresh
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEditing ? "Edit Volunteer" : "Create Volunteer Profile"}</h2>
      
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="dateofbirth"
        placeholder="Date Of Birth"
        value={formData.Date_of_Birth}
        onChange={handleChange}
        required
        />
      <input
        type="text"
        name="skill"
        placeholder="Skill"
        value={formData.skill}
        onChange={handleChange}
        required
        />
        
        <input
        type="text"
        name="availability"
        placeholder="Availability"
        value={formData.availability}
        onChange={handleChange}
        required
        />

      
      <button type="submit">{isEditing ? "Update" : "Submit"}</button>
    </form>
  );
};

export default VolunteerForm;
