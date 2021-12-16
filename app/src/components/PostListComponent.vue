<template>
  <div id="post-list">
    <div v-if="posts">
      <h3>Post List</h3>
      <p v-if="postsIsEmpty">No post found</p>
      <ul v-else class="container">
        <li class="container" v-for="post in posts" :key="post.content">
          <PostComponent :post="post" @delete="deletePost" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import postStore from "@/store/modules/postModule";
import Post from "@/models/Post";
import PostComponent from "@/components/PostComponent.vue";

@Options({
  name: "PostListComponent",
  components: {
    PostComponent,
  },
})
export default class PostListComponent extends Vue {
  get posts(): Post[] {
    return postStore.posts;
  }

  get postsIsEmpty(): boolean {
    return postStore.posts.length === 0;
  }

  async deletePost(id: number): Promise<void> {
    await postStore.deletePost(id);
  }

  async created(): Promise<void> {
    await postStore.getPosts();
  }
}
</script>

<style scoped lang="scss">
#post-list {
  padding: 0.5rem;
}

li {
  width: 40rem;
}
</style>
