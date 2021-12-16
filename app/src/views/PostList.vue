<template>
  <div>
    <PostListComponent />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import PostListComponent from "@/components/PostListComponent.vue";

@Options({
  name: "PostList",
  components: {
    PostListComponent,
  },
})
export default class PostList extends Vue {}
</script>

<style scoped></style>
