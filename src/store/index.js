import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]')
  },
  mutations: {
    createTask(state, task) {
      state.tasks.push(task);

      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    deleteTask(state, task) {
      const idx = state.tasks.findIndex(t => t.id === task.id)
      let tasks = state.tasks.concat();
      tasks.splice(idx, 1);
      this.state.tasks = tasks;
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    deleteAllTasks(state, tasks) {
      let tasksArr = [];
      this.state.tasks = tasksArr;
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    updateTask(state, { id, description, date }) {
      const tasks = state.tasks.concat();

      const idx = tasks.findIndex(t => t.id === id)
      const task = tasks[idx];
      const status = new Date(date) > new Date() ? 'active' : 'outdated'

      tasks[idx] = { ...task, date: date, description: description, status }

      state.tasks = tasks;
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    completeTask(state, id) {
      const idx = state.tasks.findIndex(t => t.id === id)
      state.tasks[idx].status = 'completed'
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    }
  },
  actions: {
    createTask({ commit }, task) {
      commit('createTask', task)
    },
    deleteTask({ commit }, task) {
      commit('deleteTask', task)
    },
    deleteAllTasks({ commit }, tasks) {
      commit('deleteAllTasks', tasks)
    },
    updateTask({ commit }, task) {
      commit('updateTask', task)
    },
    completeTask({ commit }, id) {
      commit('completeTask', id)
    }
  },
  modules: {
  },
  getters: {
    tasks: s => s.tasks,
    taskById: s => id => s.tasks.find(t => t.id === id)
  }
})
