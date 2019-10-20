<template>
  <div>
    <div class="header">
      <h1>List</h1>
      <button type="button" class="btn btn-clear" @click="deleteAllTasks">Clear All Tasks</button>
    </div>

    <hr />

    <table v-if="tasks.length">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Date</th>
          <th>Description</th>
          <th>Status</th>
          <th>Open</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(task, idx) of tasks"
          :key="task.id"
          :class="[(task.status == 'completed') ? 'complted-col':'',
          (task.status == 'outdated') ? 'outdated-col':''] "
        >
          <td>{{idx + 1}}</td>
          <td>{{task.title}}</td>
          <td>{{new Date(task.date).toLocaleDateString()}}</td>
          <td class="table-el">
            <div class="text-desc">{{task.description}}</div>
          </td>
          <td>{{task.status}}</td>
          <td>
            <router-link tag="button" class="btn button-small" :to="'/task/' + task.id">Edit</router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No tasks</p>
  </div>
</template>

<script>
// import Vue from "vue";
// export default Vue.extend({});
export default {
  computed: {
    tasks() {
      return this.$store.getters.tasks;
    }
  },
  methods: {
    deleteAllTasks() {
      this.$store.dispatch("deleteAllTasks", this.tasks);
    }
  }
};
</script>

<style lang="scss" scoped>
.table-el {
  max-width: 400px;
}
.text-desc {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.btn-clear {
  background: crimson;
}
</style>

