<template>
  <div class="todo-list row items-start justify-start">
    <div class="col-6 q-px-xl">
      <div class="flex items-start justify-center relative">
        <p class="text-h5">Todos active</p>
        <q-btn icon="add" flat round dense @click="dialog = true" color="primary" class="q-ml-md" />
      </div>
      <TodoItem v-for="todo in todoActive" :key="todo.id" :todo="todo" class="mx-auto" />
    </div>

    <div class="col-6 q-px-xl">
      <p class="text-h5 text-center">Todos completed</p>
      <TodoItem v-for="todo in todoCompleted" :key="todo.id" :todo="todo" />
      <div v-if="todoCompleted.length === 0" class="text-center">
        <q-icon name="close" size="lg" color="red" />
        <p>No todos completed</p>
      </div>
    </div>

    <q-dialog v-model="dialog">
      <q-card style="width: 350px" class="q-pa-md q-pa-lg-sm q-pa-xl-md">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Add Todo</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="w-100">
          <q-input v-model="newTodo" label="Todo content" filled @keyup.enter="saveTodo" />
        </q-card-section>
        <q-card-actions align="center">
          <q-btn icon="save" label="save" unelevated @click="saveTodo" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTodoStore } from 'src/stores/todo';
import { storeToRefs } from 'pinia';
import TodoItem from './TodoItem.vue';

const { todoActive, todoCompleted } = storeToRefs(useTodoStore());
const todoStore = useTodoStore();

const dialog = ref<boolean>(false);
const newTodo = ref<string>('');

const saveTodo = () => {
  todoStore.addTodo({
    id: todoStore.todos.length + 1,
    content: newTodo.value,
    completed: false,
  });
  dialog.value = false;
  newTodo.value = '';
};
</script>

<style scoped>
.todo-list {
  min-width: 1000px;
  margin-top: 20px;
}
</style>