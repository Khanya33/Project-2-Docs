<template>
  <form @submit.prevent="handleLogin">
    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Password" required />
    <button type="submit">Log In</button>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      employees: [] // ← Add this to store employee data
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
          email: this.email,
          password: this.password
        });

        localStorage.setItem('authToken', response.data.token);
        this.$router.push('/dashboard');
      } catch (err) {
        console.error('Login failed:', err.response?.data || err.message);
        alert('Login error: ' + err.response?.data?.message || 'Something went wrong');
      }
    },

    async fetchEmployees() {
      try {
        const response = await axios.get('http://localhost:3000/api/employees', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        this.employees = response.data;
      } catch (err) {
        console.error('Error loading employees:', err.response?.data || err.message);
      }
    }
  }
};
</script>
