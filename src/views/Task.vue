<template>
  <div>
    <div v-if="task">
      <h1>{{task.title}}</h1>
      <!-- <span class="title-date">Reserved till: {{new Date(task.date).toLocaleDateString() }}</span>
      <div>{{task.description}}</div>-->

      <form @submit.prevent="submitHandler">
        <div class="chips" ref="chips"></div>
        <div class="input-field">
          <textarea v-model="description" id="description" class="materialize-textarea"></textarea>
          <label for="description">Description</label>
          <span
            class="character-counter"
            style="float: right; font-size: 12px;"
          >{{description.length}}/2048</span>
        </div>

        <input type="text" ref="datepicker" />
        <div class="btn-section">
          <div v-if="task.status !== 'completed'" class="upd-task-btns">
            <button class="btn submit-btn" type="submit">Update</button>
            <button class="btn blue" type="button" @click="completeTask">Complete Task</button>
          </div>
          <button class="btn button-small red darken-3" type="button" @click="deleteTask">Delete</button>
        </div>
      </form>
    </div>
    <p class="not-found-txt" v-else>Task not found</p>
  </div>
</template>

<script>
export default {
  computed: {
    task() {
      return this.$store.getters.taskById(+this.$route.params.id);
    }
  },
  data: () => ({
    description: "",
    chips: null,
    date: null
  }),
  mounted() {
    this.description = this.task.description;
    this.chips = M.Chips.init(this.$refs.chips, {
      placeholder: "Task tags",
      data: this.task.tags
    });
    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: "dd.mmm.yyyy",
      date: this.task.date,
      defaultDate: new Date(this.task.date),
      setDefaultDate: true
    });
    setTimeout(() => {
      M.updateTextFields();
      M.textareaAutoResize();
    }, 0);
  },
  methods: {
    submitHandler() {
      this.$store.dispatch("updateTask", {
        id: this.task.id,
        description: this.description,
        date: this.date.date
      });
      this.$router.push("/list");
    },
    completeTask() {
      this.$store.dispatch("completeTask", this.task.id);
      this.$router.push("/list");
    },
    deleteTask() {
      this.$store.dispatch("deleteTask", this.task);
      this.$router.push("/list");
    }
  },
  destroyed() {
    if (this.date && this.date.destroy) {
      this.date.destroy();
    }
    if (this.chips && this.chips.destroy) {
      this.chips.destroy();
    }
  }
};
</script>

<style lang="scss" scoped>
.not-found-txt {
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  color: crimson;
}
.title-date {
  font-size: 28px;
}
.btn-section {
  display: flex;
  .upd-task-btns {
    margin-right: 1rem;
  }
}
.submit-btn {
  margin-right: 1rem;
}
</style>

