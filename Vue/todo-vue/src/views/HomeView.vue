<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTaskStore } from '@/stores/tasks'
import TodoItem from '@/components/TodoItem.vue'

const store = useTaskStore()
const newTitle = ref('')

onMounted(() => store.fetchTasks())

function handleAdd() {
  if (!newTitle.value.trim()) return
  store.addTask(newTitle.value)
  newTitle.value = ''
}
</script>

<template>
  <div class="home">
    <div class="card">
      <div class="card-header">
        <h1>Mes Tâches</h1>
        <span class="badge">{{ store.tasks.length }}</span>
      </div>

      <div class="add-form">
        <input v-model="newTitle" placeholder="Nouvelle tâche..." @keyup.enter="handleAdd" />
        <button @click="handleAdd">+ Ajouter</button>
      </div>

      <p v-if="store.loading" class="state-msg">Chargement...</p>
      <p v-else-if="store.error" class="state-msg error-msg">{{ store.error }}</p>
      <p v-else-if="store.tasks.length === 0" class="state-msg empty-msg">
        Aucune tâche pour le moment.
      </p>

      <ul v-else class="task-list">
        <TodoItem
          v-for="task in store.tasks"
          :key="task.id"
          :task="task"
          @toggle="store.toggleTask"
          @delete="store.deleteTask"
        />
      </ul>
    </div>
  </div>
</template>

<style scoped>
.home {
  padding: 2rem;
  max-width: 680px;
  margin: 0 auto;
}
.card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,.06);
  padding: 2rem;
}
.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 1.5rem;
}
.card-header h1 {
  font-size: 1.6rem;
  color: #2c3e50;
}
.badge {
  background: #42b883;
  color: white;
  font-size: .85rem;
  font-weight: 700;
  padding: 2px 12px;
  border-radius: 20px;
}
.add-form {
  display: flex;
  gap: 8px;
  margin-bottom: 1.5rem;
}
.add-form input {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e8e8e8;
  border-radius: 10px;
  font-size: 1rem;
  transition: border .2s;
}
.add-form input:focus {
  border-color: #42b883;
  outline: none;
}
.add-form button {
  padding: 12px 24px;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background .2s;
  white-space: nowrap;
}
.add-form button:hover { background: #38a073; }
.state-msg {
  text-align: center;
  padding: 2rem;
  color: #999;
  font-size: .95rem;
}
.error-msg { color: #d32f2f; }
.empty-msg { color: #aaa; }
.task-list {
  list-style: none;
  padding: 0;
}
</style>
