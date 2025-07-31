<template>
  <div class="d-flex">


    <!-- Main Dashboard Content -->
    <div class="container-fluid p-4">
      <h2 class="m-heading mb-5 text-white text-center">HR Management Dashboard</h2>

      <!-- Stats Cards -->
      <div class="row g-3 mb-4">
        <div class="col-md-3" v-for="(card, index) in cards" :key="index">
          <div class="card shadowtotal-sm text-center p-3">
            <h5 class="text-secondary">{{ card.label }}</h5>
            <h3 class="fw-bold text-primary">{{ card.value }}</h3>
          </div>
        </div>
      </div>



      <!-- Table -->
      <div class="card p-4 shadow-sm rounded">
        <h5 class="mb-3">Recent Hires</h5>
        <div>
          <table class="table table-striped align-middle">
            <thead class="table-light">
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Position</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="emp in recentHires" :key="emp.employeeId">
                <td>{{ emp.name }}</td>
                <td>{{ emp.department }}</td>
                <td>{{ emp.position }}</td>
                <td>{{ emp.joinYear }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- Khanya: -->

  <div class="container mt-4">
    <div class="row">
      <!-- 🥧 Role Pie Chart -->
      <div class="col-md-3">
        <div class="card shadow-sm mb-4">
          <div class="card-body">
            <RolePieChart :employees="employees" />
          </div>
        </div>
      </div>
      <!-- 📊 Payroll Bar Chart -->
      <div class="col-md-4">
        <div class="card shadow-sm mb-4">
          <div class="card-body">
            <PayrollBar :employees="employees" />
          </div>
        </div>
      </div>
      <!-- 📶 Deduction Stacked Bar -->
      <div class="col-md-4">
        <div class="card shadow-sm mb-4">
          <div class="card-body">
            <DeductionBar :employees="employees" />
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import employeeInfo from "@/data/employee_info.json";
import attendance from "@/data/attendance.json";
import payroll from "@/data/payroll_data.json";
import Sidebar from "@/components/Sidebar.vue";
import { PieChart, BarChart, LineChart } from "@/components/charts"; // make sure these exist

import DeductionBar from '@/components/Chart/DeductionBar.vue';
import RolePieChart from '@/components/Chart/RolePieChart.vue';
import PayrollBar from '@/components/Chart/PayrollBar.vue';
import { getAllEmployees } from '@/services/reportService';

export default {
  name: 'Dashboard',
  components: {
    Sidebar, PieChart, BarChart, LineChart,
    RolePieChart, PayrollBar, DeductionBar
  },
  data() {
    const employees = employeeInfo.employeeInformation;
    const attendanceData = attendance.attendanceAndLeave;
    const payrollData = payroll.payrollData;

    // Cards
    const totalEmployees = employees.length;
    const totalSalary = employees.reduce((sum, e) => sum + e.salary, 0);
    const avgSalary = (totalSalary / totalEmployees).toFixed(0);
    const departments = [...new Set(employees.map((e) => e.department))];
    const deptCount = departments.length;

    const totalPresent = attendanceData.flatMap(e =>
      e.attendance.filter(a => a.status === "Present")
    ).length;
    const totalEntries = attendanceData.flatMap(e => e.attendance).length;
    const attendanceRate = ((totalPresent / totalEntries) * 100).toFixed(1);

    const totalPayroll = payrollData.reduce((sum, p) => sum + p.finalSalary, 0);

    // Charts
    const departmentCounts = departments.map((dept) => ({
      label: dept,
      count: employees.filter((e) => e.department === dept).length
    }));

    const departmentChart = {
      labels: departmentCounts.map((d) => d.label),
      datasets: [{
        data: departmentCounts.map((d) => d.count),
        backgroundColor: ['#3498db', '#2ecc71', '#f1c40f', '#e67e22', '#9b59b6', '#1abc9c']
      }]
    };

    const salaryChart = {
      labels: employees.map((e) => e.name),
      datasets: [{
        label: "Salary (R)",
        data: employees.map((e) => e.salary),
        backgroundColor: "#2980b9"
      }]
    };

    const joinTrend = {};
    employees.forEach((e) => {
      const match = e.employmentHistory.match(/(\d{4})/);
      const year = match ? match[1] : "Unknown";
      joinTrend[year] = (joinTrend[year] || 0) + 1;
    });
    const joinTrendChart = {
      labels: Object.keys(joinTrend),
      datasets: [{
        label: "Employees Joined",
        data: Object.values(joinTrend),
        fill: false,
        borderColor: "#16a085"
      }]
    };

    const deptAttendance = {};
    attendanceData.forEach((a) => {
      const emp = employees.find(e => e.employeeId === a.employeeId);
      const dept = emp?.department || "Unknown";
      const presentDays = a.attendance.filter(d => d.status === "Present").length;
      if (!deptAttendance[dept]) deptAttendance[dept] = 0;
      deptAttendance[dept] += presentDays;
    });

    const attendanceDeptChart = {
      labels: Object.keys(deptAttendance),
      datasets: [{
        label: "Total Present Days",
        data: Object.values(deptAttendance),
        backgroundColor: "#8e44ad"
      }]
    };

    const payrollChart = {
      labels: employees.map(e => e.name),
      datasets: [{
        label: "Final Salary",
        data: employees.map(e => {
          const pay = payrollData.find(p => p.employeeId === e.employeeId);
          return pay ? pay.finalSalary : 0;
        }),
        backgroundColor: "#e74c3c"
      }]
    };

    const recentHires = employees
      .map(e => {
        const match = e.employmentHistory.match(/(\d{4})/);
        return {
          ...e,
          joinYear: match ? match[1] : "N/A"
        };
      })
      .sort((a, b) => b.joinYear - a.joinYear)
      .slice(0, 5);

    return {
      cards: [
        { label: "Total Employees", value: totalEmployees },
        { label: "Departments", value: deptCount },
        { label: "Attendance Rate", value: `${attendanceRate}%` },
        { label: "Monthly Payroll (R)", value: totalPayroll }
      ],
      departmentChart,
      salaryChart,
      joinTrendChart,
      attendanceDeptChart,
      payrollChart,
      recentHires,
      employees: [...getAllEmployees()]
    };
  }
};
</script>

<style scoped>
.m-heading {
  font-weight: bold;
  font-size: 3rem;
}

.table th {
  font-weight: 600;
  font-size: 0.95rem;
  background-color: #2c8cbc;
  color: white;
}

.table td {
  font-size: 0.9rem;
  color: rgb(92, 27, 110);
  vertical-align: middle;
}

.card {
  min-height: 100px;
  background: rgba(255, 255, 255, 0.777);
}

.card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.card:backdrop {
  color: white;
  background: #34a4dd;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.container-fluid {
  border-radius: 10px;
}

.row.g-3 {
  margin-bottom: 20px;
}

.card h3 {
  color: #00fff7;

}
</style>

<!-- This is the main dashboard view for the HR Management System -->
<!-- It includes stats cards, a recent hires table, and various charts for data visualization -->
<!-- <template>

</template> -->
<!-- 

<script>


</script> -->
