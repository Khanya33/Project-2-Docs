<template>
  <main>
    <header>
      <img :src="require('@/assets/logo.png')" alt="HR Solutions Logo" class="logo" />
      <h1 style="text-align: center;">Login to HR-Solutions</h1>
    </header>

    <!-- Login Form -->
    <form class="login" @submit.prevent="handleLogin">
      <label>
        <span>Enter Email</span>
        <input type="email" v-model="email" required />
      </label>
      <label>
        <span>Enter Password</span>
        <input type="password" v-model="password" required />
      </label>
      <button class="login-btn" type="submit">Login</button>
      <div v-if="error" class="text-danger mt-2">{{ error }}</div>
    </form>

    <!-- Signup Link -->
    <router-link to="/signup" class="login-btn" style="text-align: center; margin-top: 1rem;">
      Signup
    </router-link>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

async function handleLogin() {
  try {
    const response = await axios.post('http://localhost:3000/api/auth/login', {
      email: email.value,
      password: password.value,
    });
    localStorage.setItem('authToken', response.data.token);
    error.value = '';
    router.push({ name: 'Dashboard' });
  } catch (err) {
    error.value = err.response?.data?.message || 'Invalid email or password';
  }
}
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100vh;
  background-color: var(--primary);
  color: var(--dark);
}

header {
  width: 100%;
  padding: 1.5rem;
  text-align: center;
  background-color: var(--primary-dark);
  color: var(--light);
}

.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  max-width: 400px;
  margin: 0 auto;
  padding: 1.5rem;
  background-color: var(--light);
  border-radius: 1.5rem;
  height: 50%;
}

.logo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

label {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

label span {
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.text-danger {
  color: #dc3545;
}

.login-btn {
  width: 50%;
  padding: 0.75rem 0;
  background: linear-gradient(90deg, #00bfff, #0099ff);
  color: #fff;
  border: none;
  border-radius: 0.9rem;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  margin: 2rem auto 0 auto;
  display: block;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: background 0.3s, transform 0.2s;
}

.login-btn:hover,
.login-btn:focus {
  background: linear-gradient(90deg, #0099ff, #00bfff);
  transform: translateY(-2px) scale(1.03);
  outline: none;
}
</style>

<style>
:root {
  --primary: rgb(0, 140, 255);
  --primary-dark: rgb(0, 183, 255);
  --gray: #656565;
  --light: #dfe4ea;
  --dark: #000000;
}
</style>
