<template>
  <div class="post-add">
    <PostForm />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import PostForm from "@/components/PostForm.vue";

@Options({
  name: "PostAdd",
  components: {
    PostForm,
  },
})
export default class PostAdd extends Vue {}
</script>

<style scoped>
.post-add {
  display: flex;
  height: 100%;
  justify-content: center;
}
</style>
