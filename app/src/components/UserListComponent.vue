<template>
  <div id="user-list">
    <ul>
      <li v-for="user in userList" :key="user.id">
        <UserComponent :user="user" @delete="deleteUser" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import userStore from "@/store/modules/userModule";
import User from "@/models/User";
import UserComponent from "@/components/UserComponent.vue";

@Options({
  name: "UserListComponent",
  components: {
    UserComponent,
  },
})
export default class UserListComponent extends Vue {

  get userList(): User[] {
    return userStore.userList;
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await userStore.deleteUser(id);
      await userStore.getUsers();
    } catch (error) {
      console.log(error);
    }
  }

  async created(): Promise<void> {
    await userStore.getUsers();
  }
}
</script>

<style scoped>
#user-list {
  padding: 0.5rem;
}

ul {
  display: flex;
  flex-wrap: wrap;
}

li {
  margin: 1rem; 
}
</style>
