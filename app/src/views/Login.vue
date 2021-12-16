<template>
  <div class="container">
    <div class="login-form">
      <h1>Login</h1>
      <div class="mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Username"
          v-model="userData.username"
        />
      </div>
      <div class="mb-3">
        <input
          type="password"
          class="form-control"
          id="formGroupExampleInput"
          placeholder="Password"
          v-model="userData.password"
        />
      </div>
      <div class="col-auto">
        <button type="submit" @click="handleLogin" class="btn btn-primary mb-3">
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { AuthRequest, AuthResponse } from "@/models/AuthUser";
import userStore from "@/store/modules/userModule";

@Options({
  name: "Login",
})
export default class Login extends Vue {
  userData: AuthRequest = {
    username: "",
    password: "",
  };

  get loggedUser(): AuthResponse {
    return userStore.loggedUser;
  }

  async handleLogin(): Promise<void> {
    let loggedUser = await userStore.loginUser(this.userData);

    if (loggedUser) {
      setTimeout(() => {
        this.$router.push({
          name: "PostList",
        });
      }, 1900);
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  height: 100%;
  justify-content: center;
  .login-form {
    margin-top: 2rem;
    width: 25rem;
  }
}
.mb-3 {
  margin: 2rem;
}
h1 {
  margin-top: 1rem;
}
</style>
