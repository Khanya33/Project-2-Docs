<template>
  <div id="app" class="app-wrapper">
    <!-- Only show layout if not on Login -->
    <Navbar v-if="$route.name !== 'Login'" :user="user" />
    <Sidebar v-if="$route.name !== 'Login'" :user="user" />
    <div v-if="$route.name !== 'Login'" class="container-fluid">
      <div class="row">
        <!-- Sidebar already rendered above, no need to duplicate -->
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
          <router-view />
        </main>
      </div>
    </div>
    <!-- Show login directly when on Login route -->
    <div v-else>
      <router-view />
    </div>
  </div>
</template>
<script>
import { jwtDecode } from 'jwt-decode'; // ✅ correct named import
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
import { decodeToken } from '@/utils/auth'
export default {
  name: 'App',
  components: {
    Navbar,
    Sidebar
  },
  data() {
    return {
      user: null
    }
  },
  created() {
    const token = localStorage.getItem('authToken')
    if (token) {
      this.user = decodeToken(token)
    }
  }
}
</script>
<style>
/* #2c8cbc = blue */
/* #9319a8 = purple */
.app-wrapper {
  background: #34a4dd;
  min-height: 100vh;
}
.main-content {
  margin-left: 220px;
  padding: 20px;
}
.content {
  margin-left: 220px;
  padding: 20px;
}

</style>