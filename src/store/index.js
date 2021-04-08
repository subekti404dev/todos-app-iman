import todoStore from "./todos"

class AppStore {
  static _initialized = false;

  static async init() {
    await todoStore.initialize();
    this._initialized = true;
  }

  static get todos() {
    return todoStore
  }
}

export default AppStore;