<template>
  <div class="post-edit">
    <PostForm />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import PostForm from "@/components/PostForm.vue";

@Options({
  name: "PostEdit",
  components: {
    PostForm,
  },
})
export default class PostEdit extends Vue {}
</script>

<style scoped>
.post-edit {
  display: flex;
  height: 100%;
  justify-content: center;
}
</style>
