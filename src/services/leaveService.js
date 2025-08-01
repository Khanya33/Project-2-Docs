// src/services/leaveService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // ✅ Correct port

export const getLeaveRequests = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/leave`);
    return response.data;
  } catch (error) {
    console.error("Error fetching leave requests:", error);
    throw error;
  }
};
