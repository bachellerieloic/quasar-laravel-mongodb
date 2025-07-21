import { defineStore, acceptHMRUpdate } from 'pinia';
import type { Todo } from 'components/models';
import { api } from 'boot/axios';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [] as Todo[],
  }),
  getters: {
    todoActive: (state) => state.todos.filter((todo) => !todo.completed),
    todoCompleted: (state) => state.todos.filter((todo) => todo.completed),
  },
  actions: {
    async fetchTodos() {
      try {
        const response = await api.get('/todos');
        this.todos = response.data;
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    },
    async addTodo(content: string) {
      try {
        const response = await api.post('/todos', { content });
        this.todos.push(response.data);
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    },
    async editTodo(id: number, content: string) {
      try {
        const response = await api.put(`/todos/${id}`, { content });
        const index = this.todos.findIndex((todo) => todo.id === id);
        if (index !== -1) {
          this.todos[index] = response.data;
        }
      } catch (error) {
        console.error('Error editing todo:', error);
      }
    },
    async updateCompleted(id: number, completed: boolean) {
      try {
        const response = await api.patch(`/todos/${id}/completed`, { completed });
        const index = this.todos.findIndex((todo) => todo.id === id);
        if (index !== -1) {
          this.todos[index] = response.data;
        }
      } catch (error) {
        console.error('Error updating todo status:', error);
      }
    },
    async deleteTodo(id: number) {
      try {
        await api.delete(`/todos/${id}`);
        this.todos = this.todos.filter((todo) => todo.id !== id);
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTodoStore, import.meta.hot));
}
