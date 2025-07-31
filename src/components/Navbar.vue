<template>
  <!-- <nav class="navbar d-flex align-items-center px-3">
    <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
    <router-link v-if="user?.role === 'hr'" to="/payroll" class="nav-link">Payroll</router-link>
    <span class="ms-auto text-white fw-bold">Hi, {{ user?.name || 'Guest' }} :wave:</span>
    <button @click="logout" class="btn btn-outline-light ms-3">Logout</button>
  </nav> -->
</template>
<!-- <script>
export default {
  props: {
    user: Object
  },
  methods: {
    logout() {
      localStorage.removeItem('authToken')
      this.$router.push('/Login')
      location.reload() // optional: refresh to clear all reactive state
    }
  }
}
</script>
<style scoped>
.navbar {
  background: #2c8cbc;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.258);
  position: sticky;
  top: 0;
  z-index: 1050;
  padding: 12px;
  gap: 14px;
}
.nav-link {
  color: #ffffff;
  font-weight: 600;
  text-decoration: none;
  padding: 6px 12px;
  border-radius: 6px;
  transition: all 0.3s ease-in-out;
}
.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.2);
  color: #fff;
}
.btn-outline-light {
  background: #bd11c6;
  color: #fff;
  border: none;
}
.btn-outline-light:hover {
 background: #ea00ff;
  transform: translateY(-2px) scale(1.03);
  outline: none;
}
</style> -->