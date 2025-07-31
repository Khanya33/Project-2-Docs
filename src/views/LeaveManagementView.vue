<template>
  <div>
    <h2>Leave Requests Management</h2>
    <table border="1" cellspacing="0" cellpadding="8">
      <thead>
        <tr>
          <th>Employee Name</th>
          <th>Type</th>
          <th>Start</th>
          <th>End</th>
          <th>Status</th>
          <th>Submitted</th>
          <th>Reviewed By</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(request, index) in leaveList" :key="index">
          <td>{{ request.employee }}</td>
          <td>{{ request.type }}</td>
          <td>{{ request.start }}</td>
          <td>{{ request.end }}</td>
          <td>{{ request.status }}</td>
          <td>{{ request.submitted }}</td>
          <td>{{ request.reviewedBy }}</td>
          <td>
            <button
              v-if="request.status === 'pending'"
              @click="updateLeaveStatus(request.id, 'approved')"
            >Approve</button>
            <button
              v-if="request.status === 'pending'"
              @click="updateLeaveStatus(request.id, 'denied')"
            >Decline</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'LeaveManagementView',
  data() {
    return {
      leaveList: []
    };
  },
  mounted() {
    this.fetchLeaveRequests();
  },
  methods: {
    async fetchLeaveRequests() {
      try {
        const res = await axios.get('/api/leave');
        this.leaveList = res.data;
      } catch (err) {
        console.error('Failed to fetch leave data:', err);
      }
    },
    async updateLeaveStatus(id, newStatus) {
      try {
        await axios.put(`/api/leave/${id}`, { status: newStatus });
        this.fetchLeaveRequests(); // Refresh list after update
      } catch (err) {
        console.error('Failed to update status:', err);
      }
    }
  }
};
</script>
<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th {
  background-color: #f0f0f0;
}
td, th {
  padding: 8px;
  text-align: left;
}
button {
  margin-right: 8px;
  padding: 4px 8px;
  cursor: pointer;
}
button:hover {
  background-color: #007bff;
  color: white;
}
</style>