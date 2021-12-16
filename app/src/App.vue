<template>
  <Loading v-if="loading" />
  <div v-else id="content">
    <Header />
    <main>
      <Message />
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script lang="ts">
import Loading from "@/components/Loading.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Message from "@/components/Message.vue";
import user from "@/store/modules/userModule";
import { store } from "@/store";
import { computed } from "vue";

export default {
  components: {
    Header,
    Footer,
    Message,
    Loading,
  },
  // to dispatch the spinner while loading the user's data
  computed: {
    loading() {
      return user.loading;
    },
  },
};
</script>

<style lang="scss">
#app {
  background-image: linear-gradient(to left, #42275a, #734b6d);
  font-family: Avenir, Helvetica, Arial, sans-serif;
  height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

main {
  min-height: 80vh;
}

#content {
  background-image: linear-gradient(to left, #42275a, #734b6d);
}

nav {
  height: 10vh;
  padding: 4rem;

  a {
    font-weight: bold;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

footer {
  height: 10vh;
  background-image: linear-gradient(to left, #42275a, #734b6d);
  display: flex;
  align-items: center;
  justify-content: center;
}

li {
  list-style: none;
}
</style>
