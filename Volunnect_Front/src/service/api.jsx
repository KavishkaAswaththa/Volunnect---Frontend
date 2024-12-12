import axios from "axios";

const API_URL = "http://localhost:8080/chat";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 5000,
});

const handleApiError = (error) => {
  if (error.response) {
    console.error("API Error:", error.response.data.message || error.message);
    throw new Error(error.response.data.message || "Server error occurred.");
  } else if (error.request) {
    console.error("No response from server:", error.message);
    throw new Error("No response from the server. Please try again later.");
  } else {
    console.error("Unexpected error:", error.message);
    throw new Error("An unexpected error occurred.");
  }
};

export const fetchUsers = async () => {
  try {
    const response = await axiosInstance.get("/users");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchMessages = async (groupId = null, userId = null) => {
  try {
    const endpoint = userId
      ? `/messages/user/${userId}`
      : `/messages/group/${groupId}`;
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};


export const sendMessage = async (messageDTO) => {
  try {
    const response = await axiosInstance.post("/send-message", messageDTO);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
