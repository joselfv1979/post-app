<template>
  <div class="user-container">
    <UserForm />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import UserForm from "@/components/UserForm.vue";

@Options({
  name: "Register",
  components: {
    UserForm,
  },
})
export default class Register extends Vue {}
</script>

<style scoped>
.user-container {
  display: flex;
  height: 100%;
  justify-content: center;
}
</style>
