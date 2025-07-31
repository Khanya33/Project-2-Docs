<template>
  <div class="container-fluid py-4">
    <!-- Header -->
    <div class="row align-items-center mb-3">
      <div class="col-md-6 col-12">
        <h2 class="mb-4">Employee Directory</h2>
      </div>
      <!-- Removed the Add Employee button div here -->
    </div>

    <!-- Employee Table -->
    <div class="table-responsive">
      <table class="table table-striped table-bordered align-middle" v-if="employees.length">
        <thead class="table-light">
          <tr class="custom-header-row">
            <th>Name</th>
            <th>Position</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Contact</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="emp in employees" :key="emp.id">
            <td>{{ emp.employee_name }}</td>
            <td>{{ emp.job_title }}</td>
            <td>{{ emp.team }}</td>
            <td>R{{ parseFloat(emp.base_salary).toLocaleString() }}</td>
            <td><i class="bi bi-telephone me-1"></i>{{ emp.mobile }}</td>
            <td>
              <i class="bi bi-envelope me-1"></i>
              <a :href="`mailto:${emp.email_address}`">{{ emp.email_address }}</a>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>No employee data available. Please check your connection.</p>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal d-block bg-dark bg-opacity-50">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add New Employee</h5>
            <button type="button" class="btn-close" @click="showModal = false"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addEmployee">
              <div class="mb-3" v-for="(value, key) in newEmployee" :key="key">
                <label class="form-label">{{ key.replace('_', ' ').toUpperCase() }}</label>
                <input
                  v-model="newEmployee[key]"
                  :type="key.includes('email') ? 'email' : key === 'base_salary' ? 'number' : 'text'"
                  class="form-control"
                  required
                />
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="showModal = false">Cancel</button>
                <button type="submit" class="btn btn-success">Add</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/services/api';
import { decodeToken } from '@/utils/auth';

export default {
  name: 'Employee',
  data() {
    return {
      employees: [],
      showModal: false,
      newEmployee: {
        employee_name: '',
        job_title: '',
        team: '',
        base_salary: '',
        email_address: '',
        mobile: ''
      },
      userData: {}
    };
  },
  mounted() {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.userData = decodeToken(token);
    }

    // ✅ Fetch and inspect employee data
    api.get('/employees')
      .then(response => {
        this.employees = response.data;
        console.log('✅ Fetched employees:', this.employees); // 👀 Look in DevTools > Console
      })
      .catch(error => {
        console.error('❌ Error fetching employees:', error);
      });
  },
  methods: {
    addEmployee() {
      api.post('/employees', this.newEmployee)
        .then(response => {
          this.employees.push(response.data);
          this.resetForm();
          this.showModal = false;
        })
        .catch(error => {
          console.error('Error adding employee:', error);
        });
    },
    resetForm() {
      this.newEmployee = {
        employee_name: '',
        job_title: '',
        team: '',
        base_salary: '',
        email_address: '',
        mobile: ''
      };
    }
  }
};
</script>

<style scoped>
.table-responsive {
  background: linear-gradient(135deg, #dd6fd8, #62f2f7);
  border-radius: 10px;
  padding: 20px;
}
.custom-header-row {
  background: linear-gradient(135deg, #ff00f7, #00e1ff);
  color: #fff;
  font-weight: bold;
}
.table-striped tbody tr:nth-of-type(odd) {
  background-color: rgb(84, 15, 86);
}
.table-striped tbody tr:nth-of-type(even) {
  background-color: rgb(0, 255, 255);
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(255, 2, 247);
  background-color: rgb(0, 213, 255);
}
.btn-primary {
  background-color: #7c21c2;
  border-color: #6f42c1;
  color: aqua;
}
</style>
