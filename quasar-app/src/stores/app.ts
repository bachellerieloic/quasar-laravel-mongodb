import { defineStore, acceptHMRUpdate } from 'pinia';

export const useAppStore = defineStore('appStore', {
  state: () => ({
    darkMode: false,
  }),
  getters: {},
  actions: {},
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot));
}
