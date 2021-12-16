<template>
  <div class="user-container">
    <UserForm />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import UserForm from "@/components/UserForm.vue";

@Options({
  name: "UserEdit",
  components: {
    UserForm,
  },
})
export default class UserEdit extends Vue {}
</script>
<style scoped>
.user-container {
  display: flex;
  height: 100%;
  justify-content: center;
}
</style>
