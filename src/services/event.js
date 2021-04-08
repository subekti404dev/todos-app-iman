

class Event {
  static _events = {};

  static on(eventName, action) {
    if (typeof eventName === 'string') {
      this._events[eventName] = action;
    }
    if (typeof eventName === 'object' && eventName.length > 0) {
      for (const en of eventName) {
        this._events[en] = action;
      }
    }
  }

  static emit(eventName, data) {
    const doAction = (eventName) => {
      const action = this._events[eventName];
      if (action) {
        data ? action(data) : action();
      }
    }
    if (typeof eventName === 'string') {
      doAction(eventName);
    }
    if (typeof eventName === 'object' && eventName.length > 0) {
      for (const en of eventName) {
        doAction(en);
      }
    }
  }

  static remove(eventName) {
   if (this._events[eventName]) this._events[eventName] = undefined;
  }
}

export default Event;