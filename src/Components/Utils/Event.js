class DispatcherEvent {
  constructor(eventName) {
    this._eventName = eventName;
    this._callbacks = [];
  }

  get name() {
    return this._eventName;
  }

  get callbacks() {
    return this._callbacks;
  }

  register(callback) {
    this._callbacks.push(callback);
  }

  unregister(callback) {
    const index = this._callbacks.indexOf(callback);
    if (index > -1) {
      this._callbacks.splice(index, 1);
    }
  }

  fire(...args) {
    const callbacks = this._callbacks.slice(0);
    callbacks.forEach(c => {
      c(...args);
    });
  }

  clear() {
    this._callbacks = [];
  }
}

class Dispatcher {
  constructor() {
    this._events = {};
  }

  getEvent(eventName) {
    return this._events[eventName];
  }

  dispatch(eventName, data) {
    const event = this.getEvent(eventName);
    if (event) {
      event.fire(data);
    }
  }

  on(eventName, callback) {
    let event = this.getEvent(eventName);
    if (!event) {
      event = new DispatcherEvent(eventName);
      this._events[eventName] = event;
    }
    event.register(callback);
  }

  off(eventName, callback) {
    const event = this.getEvent(eventName);
    if (event) {
      event.unregister(callback);
      if (event.callbacks.length === 0) {
        delete this._events[eventName];
      }
    }
  }
}

export { Dispatcher, DispatcherEvent };
