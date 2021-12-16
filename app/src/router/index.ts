import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import PostAdd from "../views/PostAdd.vue";
import PostEdit from "../views/PostEdit.vue";
import PostList from "../views/PostList.vue";
import UserList from "../views/UserList.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import UserEdit from "../views/UserEdit.vue";
import About from "../views/About.vue";
import Home from "../views/Home.vue";
import messageStore from "@/store/modules/messageModule";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/post-list",
    name: "PostList",
    component: PostList,
  },
  {
    path: "/user-list",
    name: "UserList",
    component: UserList,
  },
  {
    path: "/post-edit/:id",
    name: "PostEdit",
    component: PostEdit,
    props: true,
  },
  {
    path: "/post-add",
    name: "PostAdd",
    component: PostAdd,
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/user-edit/:id",
    name: "UserEdit",
    component: UserEdit,
    props: true,
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/",
    name: "Home",
    component: Home
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/about' ,'/'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  messageStore.clearMessageAction();
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;
