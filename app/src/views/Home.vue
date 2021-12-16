<template>
  <div class="home">
    <h1>Create your posts</h1>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  components: {},
})
export default class Home extends Vue {}
</script>
<style lang="scss" scoped>
.home {
  background-image: linear-gradient(to left, #42275a, #734b6d);
  display: flex;
  justify-content: center;
  height: 75vh;
  width: 100%;
  h1 {
    margin-top: 8rem;
  }
}

/* img {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
} */
</style>
