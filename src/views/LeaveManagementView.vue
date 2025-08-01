<template>
  <section class="leave-container">
    <h1>Leave Management</h1>

    <div v-if="leaveRequests.length">
      <table class="leave-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Leave Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="leave in leaveRequests" :key="leave.id">
            <td>{{ leave.employee }}</td>
            <td>{{ leave.type }}</td>
            <td>{{ formatDate(leave.start) }}</td>
            <td>{{ formatDate(leave.end) }}</td>
            <td>
              <span :class="['status-tag', leave.status.toLowerCase()]">
                {{ leave.status }}
              </span>
            </td>
            <td>
              <div class="action-buttons">
                <button
                  @click="updateStatus(leave.id, 'Approved')"
                  :disabled="leave.status !== 'Pending'"
                  class="approve-btn"
                  title="Approve"
                >
                  ✓ Approve
                </button>
                <button
                  @click="updateStatus(leave.id, 'Rejected')"
                  :disabled="leave.status !== 'Pending'"
                  class="deny-btn"
                  title="Reject"
                >
                  ✕ Deny
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-else>No leave requests found.</p>
  </section>
</template>

<script>
import axios from 'axios';
import { getLeaveRequests } from '@/services/leaveService';

export default {
  name: 'LeaveManagementView',
  data() {
    return {
      leaveRequests: [],
    };
  },
  methods: {
    async fetchLeaveRequests() {
      try {
        this.leaveRequests = await getLeaveRequests();
      } catch (error) {
        console.error('Failed to fetch leave requests:', error);
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    async updateStatus(id, status) {
      try {
        await axios.put(`http://localhost:3000/api/leave/${id}`, { status });
        // Optional: show a success notification here
        this.fetchLeaveRequests(); // Refresh the list after update
      } catch (error) {
        console.error(`Failed to update status for request ${id}:`, error);
        alert('Failed to update leave status. Please try again.');
      }
    }
  },
  mounted() {
    this.fetchLeaveRequests();
  }
};
</script>

<style scoped>
.leave-container {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: Arial, sans-serif;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.leave-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th, td {
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f8f8f8;
}

.status-tag {
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-weight: bold;
  text-transform: capitalize;
}

.status-tag.pending {
  background-color: #fff3cd;
  color: #856404;
}

.status-tag.approved {
  background-color: #d4edda;
  color: #155724;
}

.status-tag.rejected {
  background-color: #f8d7da;
  color: #721c24;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}

.approve-btn {
  background-color: #4caf50;
  color: white;
}

.deny-btn {
  background-color: #f44336;
  color: white;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
