import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import FontAwesomeIcon from "@/utils/fontawesome-icons";

createApp(App)
  .use(store)
  .use(router)
  .component("fa", FontAwesomeIcon)
  .mount("#app");

