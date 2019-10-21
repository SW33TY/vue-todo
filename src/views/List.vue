<template>
  <div>
    <div class="header">
      <h1>List</h1>
      <button type="button" class="btn btn-clear" @click="deleteAllTasks">Clear All Tasks</button>
    </div>
    <div class="row">
      <div class="input-filed col s3">
        <select ref="select" v-model="filterByDate">
          <option value disabled selected>Choose your option</option>
          <option value="active">Active</option>
          <option value="outdated">Outdated</option>
          <option value="completed">Completed</option>
        </select>
        <label>Materialize Select</label>
      </div>
      <button class="btn btn-clear btn-small" @click="filterByDate = null">Clear Filter</button>
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
          v-for="(task, idx) of displayTasks"
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
  data: () => ({
    filterByDate: null
  }),
  computed: {
    tasks() {
      return this.$store.getters.tasks;
    },
    displayTasks() {
      return this.tasks.filter(t => {
        if (!this.filterByDate) {
          return true;
        }
        return t.status === this.filterByDate;
      });
    }
  },
  methods: {
    deleteAllTasks() {
      this.$store.dispatch("deleteAllTasks", this.tasks);
    }
  },
  mounted() {
    M.FormSelect.init(this.$refs.select);
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

