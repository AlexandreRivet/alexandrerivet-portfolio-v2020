import { WebGLRenderer, Scene } from "three";
import Timer from "./Utils/Timer";
import Resources from "./Resources.js";

import * as dat from "dat.gui";

export default class WebGLApplication {
  constructor(options) {
    this._canvas = options.canvas;
    this._debug = options.debug;

    this._init();
  }

  destroy() {
    this._timer.off("tick");
    this._timer.stop();

    this._renderer.dispose();
    if (this._debug) {
      this._debugUI.destroy();
    }
  }

  _init() {
    this._timer = new Timer();
    this._resources = new Resources();

    this._prepareDebug();
    this._prepareRenderer();
    this._prepareScene();
    this._bindEvents();
  }

  _prepareDebug() {
    if (this._debug) {
      this._debugUI = new dat.GUI({ width: 400 });
    }
  }

  _prepareRenderer() {
    this._renderer = new WebGLRenderer({
      canvas: this._canvas,
      alpha: true,
      antialias: true
    });
    this._renderer.setClearColor(0xffffff, 1);
    this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this._renderer.setSize(
      this._canvas.clientWidth,
      this._canvas.clientHeight,
      false
    );
  }

  _prepareScene() {
    this._scene = new Scene();

    this._camera = null;

    this._world = null;
  }

  _bindEvents() {
    this._timer.on("tick", ({ delta, elapsed }) => {
      // check for dimension
      const { clientWidth, clientHeight } = this._canvas;
      if (this._cW !== clientWidth || this._cH !== clientHeight) {
        console.log("resizing");
        this._cW = clientWidth;
        this._cH = clientHeight;

        this._renderer.setSize(this._cW, this._cH, false);
      }

      // this._renderer.render(this._scene, this._camera);
    });
  }
}
