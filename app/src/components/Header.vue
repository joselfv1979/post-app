<template>
  <div>
    <nav class="navbar navbar-dark bg-dark">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand mb-0 h1">Posts</router-link>
        <li class="nav-item nav-link">
          <router-link to="/about">About</router-link>
        </li>
        <li v-if="logged" class="nav-item nav-link">
          <router-link to="/post-list">Posts</router-link>
        </li>
        <li v-if="logged" class="nav-item nav-link">
          <router-link to="/post-add">New Post</router-link>
        </li>
        <li v-if="isAdmin" class="nav-item nav-link">
          <router-link to="/user-list">Users</router-link>
        </li>
        <li v-if="logged && !isAdmin" class="nav-item nav-link">
          <router-link
            :to="{ name: 'UserEdit', params: { id: `${loggedUser.id}` } }"
            >Profile</router-link
          >
        </li>
        <li v-if="logged" class="login">
          {{ loggedUser.username }}
          <fa icon="sign-out-alt" class="logout" @click="handleLogout"></fa>
        </li>
        <li v-else class="nav-item nav-link login">
          <router-link to="/login">Login</router-link>
        </li>
        <li v-if="!logged" class="nav-item nav-link">
          <router-link to="/register">Register</router-link>
        </li>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { AuthResponse } from "@/models/AuthUser";
import userStore from "@/store/modules/userModule";
import postStore from "@/store/modules/postModule";

@Options({
  name: "Header",
})
export default class Header extends Vue {

  get loggedUser(): AuthResponse {
    return userStore.loggedUser;
  }

  get isAdmin(): boolean {
    return userStore.loggedUser.role === "admin";
  }

  get logged(): boolean {
    return userStore.logged;
  }

  handleLogout(): void {
    userStore.logout();
    postStore.clear()
    localStorage.clear();
    this.$router.push({
      name: "Home",
    });
  }

}
</script>

<style lang="scss" scoped>
.login {
  color: #fff;
  margin-left: auto;
}

.logout {
  cursor: pointer;
  margin-left: 0.5rem;
  &:hover {
    color: #42b983;
  }
}
</style>
