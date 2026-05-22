import { defineStore } from 'pinia'
import { ref } from 'vue'

interface User {
  id: string
  email: string
  name: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(JSON.parse(localStorage.getItem('user') || 'null'))
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function login(email: string, password: string) {
    loading.value = true
    error.value = null
    try {
      const res = await fetch('http://localhost:4000/users?email=' + email)
      const users = await res.json()
      if (users.length === 0 || users[0].password !== password) {
        throw new Error('Email ou mot de passe incorrect')
      }
      const u = users[0]
      user.value = { id: u.id, email: u.email, name: u.name }
      localStorage.setItem('user', JSON.stringify(user.value))
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Erreur de connexion'
    } finally {
      loading.value = false
    }
  }

  async function register(email: string, password: string, name: string) {
    loading.value = true
    error.value = null
    try {
      const check = await fetch('http://localhost:4000/users?email=' + email)
      const existing = await check.json()
      if (existing.length > 0) throw new Error('Cet email est déjà utilisé')

      const res = await fetch('http://localhost:4000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      })
      const u = await res.json()
      user.value = { id: u.id, email: u.email, name: u.name }
      localStorage.setItem('user', JSON.stringify(user.value))
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Erreur d\'inscription'
    } finally {
      loading.value = false
    }
  }

  function logout() {
    user.value = null
    localStorage.removeItem('user')
  }

  return { user, loading, error, login, register, logout }
})
