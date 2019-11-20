import { Dispatcher } from "../Utils";
import Loader from "./Utils/Loader.js";

export default class Resources extends Dispatcher {
  constructor() {
    super();

    this._loader = new Loader();

    this._loader.on("fileLoaded", () => {
      this.dispatch("progress", {
        progress:
          this._loader._numResourcesLoaded / this._loader._numResourcesToLoad
      });
    });

    this._loader.on("allFilesLoaded", () => {
      this.dispatch("ready");
    });

    // Add here all resources to load
    this._loader.load([]);
  }
}
