<template>
  <div>
    <UserListComponent />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import UserListComponent from "@/components/UserListComponent.vue";

@Options({
  name: "UserList",
  components: {
    UserListComponent,
  },
})
export default class UserList extends Vue {}
</script>
