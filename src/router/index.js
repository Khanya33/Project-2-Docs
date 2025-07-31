import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import Employees from '@/views/Employees.vue'
import LeaveManagementView from '@/views/LeaveManagementView.vue'
import LoginView from '@/views/LoginView.vue'
import AttendanceCalendarView from '@/views/AttendanceCalendarView.vue'
import Performance from '@/views/Performance.vue'
import DataCharts from '@/components/Reports/DataCharts.vue'
import PayrollListView from '@/views/PayrollListView.vue'
import { decodeToken } from '@/utils/auth'

const routes = [
  { path: '/', redirect: '/Login' },
  { path: '/Login', name: 'Login', component: LoginView },

  // ✅ ✅ ✅ NEW SIGNUP ROUTE
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('@/views/Signup.vue')
  },

  // ✅ Shared view: accessible by both HR and Employee
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true, role_id: [1, 3] }
  },

  // 🔒 HR-only views
  {
    path: '/employees',
    name: 'Employees',
    component: Employees,
    meta: { requiresAuth: true, role_id: [1] }
  },
  {
    path: '/LeaveManagement',
    name: 'LeaveManagement',
    component: LeaveManagementView,
    meta: { requiresAuth: true, role_id: [1] }
  },
  {
    path: '/AttendanceCalendar',
    name: 'AttendanceCalendar',
    component: AttendanceCalendarView,
    meta: { requiresAuth: true, role_id: [1] }
  },
  {
    path: '/payroll',
    name: 'Payroll',
    component: PayrollListView,
    meta: { requiresAuth: true, role_id: [1] }
  },
  {
    path: '/performance',
    name: 'Performance',
    component: Performance,
    meta: { requiresAuth: true, role_id: [1] }
  },
  {
    path: '/charts',
    name: 'Charts',
    component: DataCharts,
    meta: { requiresAuth: true, role_id: [1] }
  },

  // 🚫 Unauthorized access page
  {
    path: '/unauthorized',
    name: 'Unauthorized',
    component: () => import('@/views/Unauthorized.vue') // create this view if needed
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 🛡️ Navigation Guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('authToken')

  if (to.meta.requiresAuth) {
    if (!token) return next('/Login')

    const user = decodeToken(token)
    if (!user || typeof user.role_id === 'undefined') {
      console.warn('User role_id missing or token decode failed:', user)
      return next('/unauthorized')
    }

    const userRole = Number(user.role_id)
    if (to.meta.role_id && !to.meta.role_id.includes(userRole)) {
      console.warn('Access denied for role_id:', userRole, 'on route:', to.path)
      return next('/unauthorized')
    }
  }

  next()
})

export default router
