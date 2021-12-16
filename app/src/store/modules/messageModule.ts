import {
  VuexModule,
  Module,
  Mutation,
  Action,
  config,
  getModule,
} from "vuex-module-decorators";
import { store } from "@/store";

config.rawError = true;
@Module({
  name: "messageStore",
  dynamic: true,
  namespaced: true,
  store,
})
class MessageModule extends VuexModule {
  // state
  description = "";
  isError = false;

  // mutations
  @Mutation
  setErrorMessage(message: string) {
    this.description = message;
    this.isError = true;
  }

  @Mutation
  setSuccessMessage(message: string) {
    this.description = message;
    this.isError = false;
  }

  @Mutation
  clearMessage(message: string) {
    this.description = message;
    this.isError = false;
  }

  // actions
  @Action({ commit: "setErrorMessage" })
  setErrorAction(message: string) {
    return message;
  }

  @Action
  setSuccessAction(message: string) {
    this.context.commit("setSuccessMessage", message);
    setTimeout(() => {
      this.context.commit("clearMessage", null);
    }, 2000);
  }

  @Action({ commit: "clearMessage" })
  clearMessageAction() {
    return null;
  }
}

export default getModule(MessageModule);
