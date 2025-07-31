<template>
  <main>
    <header>
      <img :src="require('@/assets/logo.png')" alt="HR Solutions Logo" class="logo" />
      <h1 style="text-align: center;">Employee Signup</h1>
    </header>

    <form class="login" @submit.prevent="signupEmployee">
      <label>
        <span>Full Name</span>
        <input v-model="signupForm.full_name" required />
      </label>
      <label>
        <span>Username</span>
        <input v-model="signupForm.username" required />
      </label>
      <label>
        <span>Email</span>
        <input type="email" v-model="signupForm.email" required />
      </label>
      <label>
        <span>Password</span>
        <input type="password" v-model="signupForm.password" required />
      </label>
      <button class="login-btn" type="submit">Signup</button>
      <button class="cancel-btn" type="button" @click="goToLogin">Cancel</button>
    </form>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

const signupForm = ref({
  full_name: '',
  username: '',
  email: '',
  password: ''
});

async function signupEmployee() {
  try {
    await axios.post('http://localhost:3000/api/auth/signup', signupForm.value);
    alert('Signup successful! Please login.');
    router.push({ name: 'Login' });
  } catch (error) {
    alert('Signup failed: ' + (error.response?.data?.message || error.message));
  }
}

function goToLogin() {
  router.push({ name: 'Login' });
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
  height: auto;
  margin-top: 2rem;
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
  transition: background 0.3s, transform 0.2s;
}

.login-btn:hover,
.login-btn:focus {
  background: linear-gradient(90deg, #0099ff, #00bfff);
  transform: translateY(-2px) scale(1.03);
  outline: none;
}

.cancel-btn {
  margin-top: 1rem;
  background: #ccc;
  color: #333;
  border: none;
  border-radius: 0.9rem;
  padding: 0.75rem 0;
  width: 50%;
  font-weight: bold;
  cursor: pointer;
  display: block;
  margin: 1rem auto 0 auto;
  transition: background 0.3s;
}

.cancel-btn:hover {
  background: #bbb;
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

:root {
  --primary: rgb(0, 140, 255);
  --primary-dark: rgb(0, 183, 255);
  --gray: #656565;
  --light: #dfe4ea;
  --dark: #000000;
}
</style>
