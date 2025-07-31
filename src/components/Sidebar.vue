<template>
  <div class="sidebar d-flex flex-column justify-content-between p-3 pt-5">
    <div>
      <div class="brand mb-4">
        <h4 class="sidebar-heading mb-4 text-white">HR Management System</h4>
      </div>

      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
          <router-link to="/dashboard" class="nav-link" active-class="active-link">
            <i class="bi bi-speedometer2 me-2"></i> Dashboard
          </router-link>
        </li>

        <!-- HR Manager Links -->
        <template v-if="user.role_id === 1">
          <li>
            <router-link to="/employees" class="nav-link" active-class="active-link">
              <i class="bi bi-people-fill me-2"></i> Employees
            </router-link>
          </li>
          <li>
            <router-link to="/performance" class="nav-link" active-class="active-link">
              <i class="bi bi-bar-chart-fill me-2"></i> Performance
            </router-link>
          </li>
          <li>
            <router-link to="/payroll" class="nav-link" active-class="active-link">
              <i class="bi bi-cash-stack me-2"></i> Payroll
            </router-link>
          </li>
          <li>
            <router-link to="/LeaveManagement" class="nav-link" active-class="active-link">
              <i class="bi bi-calendar-check me-2"></i> Leave Requests
            </router-link>
          </li>
          <li>
            <router-link to="/AttendanceCalendar" class="nav-link" active-class="active-link">
              <i class="bi bi-calendar-check me-2"></i> Attendance
            </router-link>
          </li>
        </template>
        <!-- Employees see nothing else but Dashboard -->
      </ul>

      <button class="logout-btn" @click="handleLogout">Logout</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: ['user'],
  methods: {
    handleLogout() {
      localStorage.setItem('isAuthenticated', 'false');
      this.$router.push({ name: 'Login' });
    }
  }
}
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 220px;
  overflow-y: auto;
  z-index: 100;
  background:#2c8cbc;
  color: white;
  min-height: 100vh;
}

.nav-link {
  color: white;
  padding: 10px 15px;
  border-radius: 6px;
  transition: all 0.2s ease-in-out;
  font-weight: 500;
}

.nav-link:hover {
  background: #247299;
  color: white
}

.active-link {
  background:#1d5c7b  !important;
}
.brand {
  text-align: center;
  margin-bottom: 20px;
}
.sidebar-heading {
  font-size: 1.2rem;
  font-weight: bold;
  color: #ec82ff;
  padding: 16px 0; /* Add space above and below */
  margin-top: 24px;    /* Add space above */
}
.sidebar i {
  color: #ffffff;
  margin-right: 8px;
}
.sidebar i:hover {
  color: #ea00ff;
}
.sidebar a {
  text-decoration: none;
  color: inherit;
}

@media (max-width: 768px) {
  .sidebar {
    position: absolute;
    left: -220px; /* Hide sidebar off-screen */
    transition: left 0.3s ease-in-out;
  }
  .sidebar.active {
    left: 0; /* Show sidebar when active */
  }
}
.logout-btn {
  width: 70%;
  padding: 0.75rem 0;
  background: #bd11c6;
  color: #fff;
  border: none;
  border-radius: 0.9rem;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  margin: 2rem auto 0 auto;
  display: block;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: background 0.3s, transform 0.2s;
}
.logout-btn:hover, .logout-btn:focus {
  background: #ea00ff;
  transform: translateY(-2px) scale(1.03);
  outline: none;
}
</style>
