import {
  VuexModule,
  Module,
  Mutation,
  Action,
  config,
  getModule,
} from "vuex-module-decorators";
import Post from "@/models/Post";
import { store } from "@/store";
import messageStore from "@/store/modules/messageModule";
import {
  getAllPosts,
  createPost,
  removePost,
  getPost,
  updatePost,
} from "@/services/PostService";

// checking localStorage before variables inicialization
const storedPostList = localStorage.getItem("store");
const storedPost = localStorage.getItem("post");

config.rawError = true;
@Module({
  name: "postStore",
  dynamic: true,
  namespaced: true,
  store,
})
class PostModule extends VuexModule {
  // state
  posts: Post[] = storedPostList ? JSON.parse(storedPostList) : null;
  post: Post = storedPost ? JSON.parse(storedPost) : null;
  loading = false;

  // mutations
  @Mutation
  createPost(post: Post) {
    this.posts.push(post);
  }

  @Mutation
  setPosts(postParam: Post[]) {
    this.posts = postParam;
  }

  @Mutation
  setPost(post: Post) {
    this.post = post;
  }

  @Mutation
  removePost(id: string) {
    this.posts = this.posts.filter((post) => post.id !== id);
  }

  @Mutation
  updatePost(updatedPost: Post) {
    this.posts = this.posts.map((item) => {
      return item.id === updatedPost.id ? updatedPost : item;
    });
  }

  // actions
  @Action({ commit: "setPosts" })
  async getPosts() {
    try {
      const { data } = await getAllPosts();
      localStorage.setItem("posts", JSON.stringify(data));
      return data as Post[];
    } catch (error: any) {
      messageStore.setErrorMessage(error.response.data);
    }
  }

  @Action({ commit: "setPost" })
  async getPost(id: string) {
    try {
      const { data } = await getPost(id);
      localStorage.setItem("post", JSON.stringify(data));
      return data;
    } catch (error: any) {
      messageStore.setErrorMessage(error.response.data);
    }
  }

  @Action({ commit: "createPost" })
  async addPost(post: Post) {
    try {
      const { data } = await createPost(post);
      messageStore.setSuccessAction("post created succesfully");
      return data;
    } catch (error: any) {
      messageStore.setErrorMessage("Please fill some text");
    }
  }

  @Action({ commit: "removePost" })
  async deletePost(id: number) {
    try {
      await removePost(id);
      messageStore.setSuccessAction("post deleted succesfully");
      return id;
    } catch (error: any) {
      messageStore.setErrorMessage(error.response.data);
    }
  }

  @Action({ commit: "updatePost" })
  async editPost(post: Post) {
    try {
      const { data } = await updatePost(post, post.id);
      messageStore.setSuccessAction("post updated succesfully");
      return data;
    } catch (error: any) {
      messageStore.setErrorMessage(error.response.data);
    }
  }

  @Action({ commit: "setPosts" })
  clear() {
    return null;
  }
}

export default getModule(PostModule);
