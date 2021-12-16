import {
  VuexModule,
  Module,
  Mutation,
  Action,
  config,
  getModule,
} from "vuex-module-decorators";
import User from "@/models/User";
import { AuthRequest, AuthResponse } from "@/models/AuthUser";
import { store } from "@/store";
import messageStore from "@/store/modules/messageModule";
import {
  createUser,
  removeUser,
  login,
  getAllUsers,
  getUser,
  updateUser,
} from "@/services/UserService";

// checking localStorage before variables inicialization
const storedUser = localStorage.getItem("user");

config.rawError = true;
@Module({ name: "userStore", dynamic: true, namespaced: true, store })
class UserModule extends VuexModule {
  
  // state
  userList: User[] = [];
  user!: User;
  loggedUser: AuthResponse = storedUser ? JSON.parse(storedUser) : {};
  logged = storedUser ? true : false;
  loading = false;

  // mutations
  @Mutation
  setUsers(userParam: User[]) {
    this.userList = userParam;
  }

  @Mutation
  register(user: User) {
    this.userList.push(user);
  }

  @Mutation
  setUser(user: User) {
    this.user = user;
    this.logged = true;
  }

  @Mutation
  setLoggedUser(user: AuthResponse) {
    this.loggedUser = user;
    this.logged = true;
  }

  @Mutation
  setLogout() {
    this.loggedUser = {} as AuthResponse;
    this.user = {} as User;
    this.logged = false;
  }

  @Mutation
  removeUser(id: string) {
    this.userList = this.userList.filter((user) => {
      user.id !== id;
    });
  }

  @Mutation
  updateUser(user: User) {
    this.userList = this.userList.map((item) => {
      return item.id === user.id ? user : item;
    });
    if (user.id === this.loggedUser.id) {
      this.loggedUser.username = user.username;
    }
  }

  @Mutation
  setLoader() {
    this.loading = true;
  }

  @Mutation
  removeLoader() {
    this.loading = false;
  }

  // actions
  @Action({ commit: "setUsers" })
  async getUsers() {
    try {
      const { data } = await getAllUsers();
      return data;
    } catch (error: any) {
      messageStore.setErrorMessage(error.response.data);
    }
  }

  @Action({ commit: "setUser" })
  async getUser(id: string) {
    try {
      const { data } = await getUser(id);
      return data as User;
    } catch (error: any) {
      messageStore.setErrorMessage(error.response.data);
    }
  }

  @Action({ commit: "register" })
  async addUser(user: User) {
    try {
      const { data } = await createUser(user);
      messageStore.setSuccessAction("user created succesfully");
      return data;
    } catch (error: any) {
      messageStore.setErrorMessage(error.response.data);
    }
  }

  @Action
  async loginUser(user: AuthRequest) {
    try {
      const { data } = await login(user);
      localStorage.setItem("user", JSON.stringify(data));
      this.context.commit("setLoggedUser", data);
      this.context.commit("setLoader");
      setTimeout(() => {
        this.context.commit("removeLoader");
      }, 2000);
      return data;
    } catch (error: any) {
      this.context.commit("setLoader");
      setTimeout(() => {
        this.context.commit("removeLoader");
      }, 1000);
      messageStore.setErrorMessage(
        error.response ? error.response.data : error.message
      );
    }
  }

  @Action
  logout() {
    this.context.commit("setLogout");   
  }

  @Action({ commit: "removeUser" })
  async deleteUser(id: string) {
    try {
      await removeUser(id);
      messageStore.setSuccessAction("user deleted succesfully");
      return id;
    } catch (error: any) {
      messageStore.setErrorMessage(error.response.data);
    }
  }

  @Action({ commit: "updateUser" })
  async editUser(user: User) {
    try {
      console.log({user});
      const { data } = await updateUser(user);
      messageStore.setSuccessAction("user updated succesfully");
      return data;
    } catch (error: any) {
      messageStore.setErrorMessage(error.response.data);
    }
  }
}

export default getModule(UserModule);
