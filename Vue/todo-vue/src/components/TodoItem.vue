<script setup lang="ts">
interface Task { id: string; title: string; done: boolean }

defineProps<{ task: Task }>()
const emit = defineEmits<{
  toggle: [task: Task]
  delete: [id: string]
}>()
</script>

<template>
  <li class="todo-item" :class="{ done: task.done }">
    <label class="checkbox-wrap">
      <input type="checkbox" :checked="task.done" @change="emit('toggle', task)" />
      <span class="checkmark"></span>
    </label>
    <span class="title">{{ task.title }}</span>
    <RouterLink :to="'/tasks/' + task.id" class="btn-detail">Détails</RouterLink>
    <button @click="emit('delete', task.id)" class="btn-delete">×</button>
  </li>
</template>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  margin-bottom: 8px;
  background: #f9fafb;
  border-radius: 10px;
  transition: background .2s, box-shadow .2s;
  border: 1px solid transparent;
}
.todo-item:hover {
  background: #f0f9f4;
  border-color: #d4edda;
}
.todo-item.done {
  opacity: .7;
}
.checkbox-wrap {
  position: relative;
  width: 22px;
  height: 22px;
  cursor: pointer;
}
.checkbox-wrap input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}
.checkmark {
  position: absolute;
  top: 0; left: 0;
  width: 22px;
  height: 22px;
  border: 2px solid #ccc;
  border-radius: 6px;
  transition: all .2s;
}
.checkbox-wrap input:checked ~ .checkmark {
  background: #42b883;
  border-color: #42b883;
}
.checkbox-wrap input:checked ~ .checkmark::after {
  content: '';
  position: absolute;
  left: 6px; top: 2px;
  width: 5px; height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
.title {
  flex: 1;
  font-size: 1rem;
  color: #333;
  transition: color .2s;
}
.done .title {
  text-decoration: line-through;
  color: #aaa;
}
.btn-detail {
  color: #42b883;
  text-decoration: none;
  font-size: .85rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 6px;
  transition: background .2s;
}
.btn-detail:hover { background: #e8f5e9; }
.btn-delete {
  background: none;
  border: none;
  font-size: 1.3rem;
  color: #ccc;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all .2s;
}
.btn-delete:hover {
  background: #fdecea;
  color: #d32f2f;
}
</style>
