<template>
  <div class="card text-dark mb-3">
    <div class="card-header bg-secondary text-light">{{ user.name }}</div>
    <div class="card-body">
      <h5 class="card-title">User:</h5>
      <p class="card-text">{{ user.username }}</p>
      <button type="button" class="btn btn-success" @click="edit">
        Update
      </button>
      <button type="button" class="btn btn-danger" @click="remove">
        Delete
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "UserComponent",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    remove() {
      this.$emit("delete", this.user.id);
    },
    edit() {
      this.$router.push({
        name: "UserEdit",
        params: {
          id: this.user.id,
        },
      });
    },
  },
});
</script>

<style scoped>
.card {
  width: 20rem;
  margin: auto;
}
.btn {
  margin: 1rem;
}
</style>
