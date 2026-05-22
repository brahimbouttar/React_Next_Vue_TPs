<script setup>
import { useRouter } from 'vue-router'
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

function handleLogout() {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <header>
    <RouterLink to="/" class="logo">TodoVue</RouterLink>
    <nav>
      <RouterLink to="/" class="nav-link">Tâches</RouterLink>
      <RouterLink to="/about" class="nav-link">About</RouterLink>
      <template v-if="auth.user">
        <span class="user-name">{{ auth.user.name }}</span>
        <button @click="handleLogout" class="btn-logout">Déconnexion</button>
      </template>
      <template v-else>
        <RouterLink to="/login" class="nav-link">Connexion</RouterLink>
      </template>
    </nav>
  </header>
  <RouterView />
</template>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Segoe UI', system-ui, sans-serif; background: #f5f7fa; color: #2c3e50; }
header {
  background: linear-gradient(135deg, #42b883, #38a073);
  color: white;
  padding: 0 2rem;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 12px rgba(0,0,0,.1);
  position: sticky;
  top: 0;
  z-index: 100;
}
.logo {
  color: white;
  text-decoration: none;
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: -.5px;
}
nav { display: flex; align-items: center; gap: 1rem; }
.nav-link {
  color: rgba(255,255,255,.85);
  text-decoration: none;
  font-weight: 500;
  transition: color .2s;
}
.nav-link:hover { color: white; }
.user-name {
  font-weight: 600;
  font-size: .9rem;
  opacity: .9;
}
.btn-logout {
  background: rgba(255,255,255,.15);
  color: white;
  border: 1px solid rgba(255,255,255,.3);
  padding: 6px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-size: .85rem;
  transition: background .2s;
}
.btn-logout:hover { background: rgba(255,255,255,.25); }
</style>
