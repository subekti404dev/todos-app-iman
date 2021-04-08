import PouchyStore from 'pouchy-store';
import env from "react-dotenv";

class TodoStore extends PouchyStore {
  get name() {
    return env.DB_NAME;
  }

  get urlRemote() {
    return env.DB_HOST;
  }

  get optionsRemote() {
    return {
      auth: {
        username: env.DB_USER,
        password: env.DB_PASS
      },
    };
  }
}

export default new TodoStore();