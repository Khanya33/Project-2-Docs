<template>
  <div class="unauthorized-page">
    <h1>403 - Unauthorized</h1>
    <p>You do not have permission to access this page.</p>
    <router-link to="/dashboard">← Back to Dashboard</router-link>
  </div>
</template>

<script>
export default {
  name: 'Unauthorized'
}
</script>

<style scoped>
.unauthorized-page {
  text-align: center;
  margin-top: 100px;
  font-family: Arial, sans-serif;
}
</style>
