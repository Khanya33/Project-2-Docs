<template>
  <div class="container py-4">
    <div class="bg-white rounded shadow p-4">
      <h1 class="mb-4 fw-bold">Attendance Tracker</h1>
      <form class="row g-3 align-items-end mb-4" @submit.prevent="filterRecords">
        <div class="col-md-4">
          <label class="form-label">Employee</label>
          <select class="form-select" v-model="selectedEmployee">
            <option value="">Select employee</option>
            <option v-for="emp in employeeNames" :key="emp" :value="emp">{{ emp }}</option>
          </select>
        </div>
        <div class="col-md-4">
          <label class="form-label">Date Range</label>
          <input type="date" class="form-control mb-1" v-model="dateRange.start" />
          <input type="date" class="form-control" v-model="dateRange.end" />
        </div>
        <div class="col-md-4 d-flex align-items-end">
          <button class="btn btn-primary w-100" type="submit">Search</button>
        </div>
      </form>

      <div class="table-responsive">
        <table class="table table-bordered align-middle">
          <thead class="table-light">
            <tr>
              <th>Employee</th>
              <th>Date</th>
              <th>Status</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Hours</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="record in filteredRecords" :key="record.id">
              <td>{{ record.employeeName }}</td>
              <td>{{ formatDate(record.date) }}</td>
              <td>
                <span v-if="record.status === 'Present'" class="badge bg-success">Present</span>
                <span v-else-if="record.status === 'Absent'" class="badge bg-danger">Absent</span>
                <span v-else class="badge bg-warning text-dark">{{ record.status }}</span>
              </td>
              <td>{{ record.checkIn || '—' }}</td>
              <td>{{ record.checkOut || '—' }}</td>
              <td>{{ record.hours }}</td>
            </tr>
            <tr v-if="filteredRecords.length === 0">
              <td colspan="6" class="text-center text-muted">No records found.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="row mt-4">
        <div class="col-md-4">
          <div class="border rounded p-3 h-100">
            <strong>Policy Enforcement</strong>
            <div class="text-muted small">Attendance rules, tardiness rules, break times</div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="border rounded p-3 h-100">
            <strong>Leave Management</strong>
            <div class="text-muted small">Track leave balances, approve leave requests</div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="border rounded p-3 h-100">
            <strong>Performance Insights</strong>
            <div class="text-muted small">Assess employee reliability, flag absenteeism</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      records: [],
      filteredRecords: [],
      selectedEmployee: '',
      employeeNames: [],
      dateRange: {
        start: '2025-04-12',
        end: '2025-04-15'
      }
    };
  },
  methods: {
    async fetchAttendanceRecords() {
      try {
        const response = await fetch('http://localhost:3000/api/attendance');
        const data = await response.json();

        this.records = data.map(record => ({
          id: record.id,
          employeeName: record.employeeName,
          date: record.date,
          status: record.status,
          checkIn: record.checkIn,
          checkOut: record.checkOut,
          hours: record.hours
        }));

        this.employeeNames = [...new Set(this.records.map(r => r.employeeName))];
        this.filterRecords();
      } catch (error) {
        console.error('Failed to fetch attendance records:', error);
      }
    },
    filterRecords() {
      const start = new Date(this.dateRange.start);
      const end = new Date(this.dateRange.end);
      this.filteredRecords = this.records.filter(r => {
        const recordDate = new Date(r.date);
        return (
          (!this.selectedEmployee || r.employeeName === this.selectedEmployee) &&
          recordDate >= start && recordDate <= end
        );
      });
    },
    formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      });
    }
  },
  mounted() {
    this.fetchAttendanceRecords();
  }
};
</script>

<style scoped>
.container {
  max-width: 900px;
}
.bg-white {
  background: #fff !important;
}
.fw-bold {
  font-weight: bold;
}
.table th,
.table td {
  vertical-align: middle;
}
.badge {
  font-size: 1em;
  padding: 0.5em 1em;
}
</style>
