<template>
  <div class="card text-dark mb-3">
    <div class="card-header bg-secondary text-light">{{ formatDate }}</div>
    <div class="card-body">
      <h5 class="card-title">Post:</h5>
      <p class="card-text">{{ post.content }}</p>
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
import Moment from "moment";

export default defineComponent({
  name: "PostComponent",
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formatDate() {
      return Moment(this.post.created).format("LLL");
    }
  },
  methods: {
    remove() {
      this.$emit("delete", this.post.id);
    },
    edit() {
      this.$router.push({
        name: "PostEdit",
        params: {
          id: this.post.id,
        },
      });
    },
  },
});
</script>

<style scoped lang="scss">
.btn {
  margin: 1rem;
}
</style>
