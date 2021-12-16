<template>
  <div>
    <div v-if="message" :class="isError">
      {{ message }}
    </div>
    <div v-else class="message-container"></div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import message from "@/store/modules/messageModule";

@Options({
  name: "Message",
})
export default class MessageComponent extends Vue {
  get message() {
    return message.description;
  }

  get isError() {
    return message.isError
      ? "alert alert-danger alert-dismissible"
      : "alert alert-success alert-dismissible";
  }
}
</script>

<style lang="scss" scoped>
.message-container {
  border: 1px solid transparent;
  position: relative;
  padding: 1.5rem;
  background-image: linear-gradient(to left, #42275a, #734b6d);
}
.alert {
  border-radius: 0;
  margin: 0;
  padding: 0.75rem;
}
</style>
