<template>
  <div class="post-form">
    <h1>{{ pageTitle }}</h1>
    <div class="mb-3">
      <label for="formGroupExampleInput" class="form-label">Text</label>
      <textarea
        type="text"
        class="form-control"
        id="formGroupExampleInput"
        placeholder="Post text"
        v-model="currentPost.content"
      />
    </div>
    <div class="col-auto">
      <button type="submit" @click="validatePost" class="btn btn-primary mb-3">
        Save Post
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import postStore from "@/store/modules/postModule";
import message from "@/store/modules/messageModule";
import Post from "@/models/Post";
import { validatePost } from "@/services/ValidatePost";

@Options({
  name: "PostForm",
})
export default class PostForm extends Vue {
  public pageTitle?: string = "";
  public postId = "";

  public currentPost: Post = {
    id: "",
    content: "",
    created: new Date(),
  };
  validatePost() {
    try {
      const newPost = validatePost(this.currentPost);
      this.savePost(newPost);
    } catch (error) {
      message.setErrorMessage(error.message);
    }
  }

  async savePost(newPost: Post): Promise<void> {
    this.postId
      ? await postStore.editPost(newPost)
      : await postStore.addPost(newPost);
    setTimeout(() => {
      this.$router.push({
        name: "PostList",
      });
    }, 2000);
  }

  async created(): Promise<void> {
    this.postId = this.$route.params.id as string;
    if (!this.postId) {
      this.pageTitle = "Create new Post";
    } else {
      this.pageTitle = "Modify Post";
      this.currentPost = (await postStore.getPost(this.postId)) as Post;
    }
  }
}
</script>

<style lang="scss" scoped>
.post-form {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-dark-rgb), var(--bs-bg-opacity));
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  color: #fff;
  height: 30rem;
  margin-top: 2.5rem;
  padding: 2rem;
  width: 30rem;

  textarea {
    height: 12rem;
  }

  .mb-3,
  .col-auto {
    margin-top: 2rem;
  }
}
</style>
