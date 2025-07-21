import { defineStore, acceptHMRUpdate } from 'pinia';
import type { Todo } from 'components/models';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [
      { id: 1, content: 'ct1', completed: false },
      { id: 2, content: 'ct2', completed: false },
      { id: 3, content: 'ct3', completed: false },
      { id: 4, content: 'ct4', completed: false },
      { id: 5, content: 'ct5', completed: false },
    ] as Todo[],
  }),
  getters: {
    todoActive: (state) => state.todos.filter((todo) => !todo.completed),
    todoCompleted: (state) => state.todos.filter((todo) => todo.completed),
  },
  actions: {
    addTodo(todo: Todo) {
      this.todos.push(todo);
    },
    editTodo(id: number, content: string) {
      const todo = this.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.content = content;
      }
    },
    updateCompleted(id: number, completed: boolean) {
      const todo = this.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.completed = completed;
      }
    },
    deleteTodo(id: number) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTodoStore, import.meta.hot));
}
