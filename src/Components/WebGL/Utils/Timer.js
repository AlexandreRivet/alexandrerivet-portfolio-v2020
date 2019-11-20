import { Dispatcher } from "../../Utils";

import { Clock } from "three";

export default class Timer extends Dispatcher {
  constructor() {
    super();

    this._clock = new Clock();

    this._tick = this._tick.bind(this);
    this._tick();
  }

  _tick() {
    this._ticker = window.requestAnimationFrame(this._tick);

    this.dispatch("tick", {
      delta: this._clock.getDelta() * 1000,
      elapsed: this._clock.getElapsedTime() * 1000
    });
  }

  stop() {
    window.cancelAnimationFrame(this._tick);
    this._ticker = null;
  }
}
