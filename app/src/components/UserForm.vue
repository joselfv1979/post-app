<template>
  <div class="user-form">
    <h1>{{ pageTitle }}</h1>
    <div class="mb-3">
      <label for="formGroupExampleInput" class="form-label">Name</label>
      <input
        type="text"
        class="form-control"
        placeholder="name"
        v-model="currentUser.name"
      />
    </div>
    <div class="mb-3">
      <label for="formGroupExampleInput" class="form-label">Username</label>
      <input
        type="text"
        class="form-control"
        placeholder="username"
        v-model="currentUser.username"
      />
    </div>
    <div class="mb-3">
      <label for="formGroupExampleInput" class="form-label">Email</label>
      <input
        type="email"
        class="form-control"
        placeholder="email"
        v-model="currentUser.email"
      />
    </div>
    <div v-if="showPasswordField" class="mb-3">
      <label for="formGroupExampleInput" class="form-label">Text</label>
      <input
        type="password"
        class="form-control"
        placeholder="password"
        v-model="currentUser.password"
      />
    </div>

    <div class="col-auto">
      <button type="submit" @click="validateUser" class="btn btn-primary mb-3">
        Save
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import User from "@/models/User";
import { AuthResponse } from "@/models/AuthUser";
import userStore from "@/store/modules/userModule";
import messageStore from "@/store/modules/messageModule";
import { validateUser } from "@/services/ValidateUser";

@Options({
  name: "UserForm",
})
export default class UserForm extends Vue {
  public pageTitle?: string = "";
  public userId = "";

  get user(): User {
    return userStore.user;
  }

  get isAdmin(): boolean {
    return userStore.loggedUser.role === "admin";
  }

  get showPasswordField(): boolean {
    return this.$route.params.id ? false : true;
  }

  public currentUser: User = {
    id: "",
    name: "",
    username: "",
    email: "",
    password: "",
    role: "user",
  };

  validateUser() {
    try {
      const newUser = validateUser(this.currentUser);
      this.saveUser(newUser);
    } catch (error) {
      messageStore.setErrorMessage(error.message);
    }
  }

  async saveUser(newUser: User): Promise<void> {
    console.log({ newUser });
    const res = this.userId
      ? await userStore.editUser(newUser)
      : await userStore.addUser(newUser);

    if (res && this.isAdmin) {
      setTimeout(() => {
        this.$router.push({
          name: "UserList",
        });
      }, 2000);
    }
    if (res && !this.userId) {
      setTimeout(() => {
        this.$router.push({
          name: "Login",
        });
      }, 2000);
    }
  }

  async created(): Promise<void> {
    this.userId = this.$route.params.id as string;

    if (!this.userId) {
      this.pageTitle = "Register";
    } else {
      this.pageTitle = "Edit Profile";
      this.currentUser = (await userStore.getUser(this.userId)) as User;
    }
  }
}
</script>

<style scoped>
.user-form {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-dark-rgb), var(--bs-bg-opacity));
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  color: #fff;
  padding: 2rem;
  width: 30rem;
}

.form-label {
  width: 100%;
  text-align: justify;
}

button {
  margin-top: 1rem;
}
</style>
