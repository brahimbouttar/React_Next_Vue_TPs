<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()
const email = ref('')
const password = ref('')

async function handleLogin() {
  await auth.login(email.value, password.value)
  if (auth.user) router.push('/')
}
</script>

<template>
  <div class="auth-container">
    <div class="auth-card">
      <h1>Connexion</h1>
      <p v-if="auth.error" class="error">{{ auth.error }}</p>
      <form @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Mot de passe" required />
        <button type="submit" :disabled="auth.loading">
          {{ auth.loading ? 'Connexion...' : 'Se connecter' }}
        </button>
      </form>
      <p class="switch">Pas encore de compte ? <RouterLink to="/register">S'inscrire</RouterLink></p>
    </div>
  </div>
</template>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 80px);
  background: #f5f7fa;
  padding: 2rem;
}
.auth-card {
  background: white;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,.08);
  width: 100%;
  max-width: 400px;
}
.auth-card h1 {
  color: #2c3e50;
  margin: 0 0 1.5rem;
  font-size: 1.75rem;
  text-align: center;
}
.auth-card form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.auth-card input {
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border .2s;
}
.auth-card input:focus {
  border-color: #42b883;
  outline: none;
}
.auth-card button {
  padding: 12px;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background .2s;
}
.auth-card button:hover { background: #38a073; }
.auth-card button:disabled { opacity: .6; cursor: not-allowed; }
.switch { text-align: center; margin-top: 1rem; color: #666; }
.switch a { color: #42b883; text-decoration: none; font-weight: 600; }
.error {
  background: #fdecea;
  color: #d32f2f;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: .9rem;
  text-align: center;
}
</style>
