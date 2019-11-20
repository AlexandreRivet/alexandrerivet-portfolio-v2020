import { Dispatcher } from "../../Utils";
import { AudioLoader, Texture, VideoTexture } from "three";

import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

export default class Loader extends Dispatcher {
  constructor() {
    super();

    this._numResourcesToLoad = 0;
    this._numResourcesLoaded = 0;

    this._resources = {};

    this.prepareLoaders();
  }

  load(resources) {
    if (!resources || resources.length === 0) {
      return;
    }

    for (const resource of resources) {
      this._numResourcesToLoad++;
      const extensionMatch = resource.src.match(/\.([a-z]+)$/);
      const extension = extensionMatch[1];
      if (typeof extension !== "undefined") {
        const loader = this.__loaders.find(loader =>
          loader.extensions.find(lExtension => lExtension === extension)
        );

        if (loader) {
          loader.load(resource);
        } else {
          console.warn(`Loader not found for ${resource}`);
        }
      } else {
        console.warn(`Extension not found for ${resource}`);
      }
    }
  }

  getResource(resourceName) {
    return this._resources[resourceName];
  }

  prepareLoaders() {
    this.__loaders = [];

    // JSON
    this.__loaders.push({
      extensions: ["json"],
      load: resource => {
        fetch(resource.src)
          .then(response => response.json())
          .then(response => this._fileLoaded(resource, response))
          .catch(error => this._fileLoaded(resource, { error }));
      }
    });

    // Images
    this.__loaders.push({
      extensions: ["jpg", "jpeg", "png"],
      load: resource => {
        const image = new Image();
        image.addEventListener("load", () => {
          this._fileLoaded(resource, image);
        });

        image.addEventListener("error", () => {
          this._fileLoaded(resource, image);
        });

        image.src = resource.src;
      }
    });

    // Videos
    this.__loaders.push({
      extensions: ["mp4", "ogg"],
      load: resource => {
        const videoElement = document.createElement("video");
        videoElement.style.display = "none";
        document.body.appendChild(videoElement);
        videoElement.src = resource.src;
        videoElement.addEventListener("canplaythrough", () => {
          this._fileLoaded(resource, videoElement);
        });
        videoElement.addEventListener("error", () => {
          document.body.removeChild(videoElement);
          this._fileLoaded(resource, null);
        });
      }
    });

    // Music
    // TODO
    const audioLoader = new AudioLoader();
    this.__loaders.push({
      extensions: ["mp3", "wav"],
      load: resource => {
        // audioLoader.load(resource.source, ())
      }
    });

    // OBJ
    const objLoader = new OBJLoader();
    this.__loaders.push({
      extensions: ["obj"],
      load: resource => {
        objLoader.load(resource.src, obj => {
          this._fileLoaded(resource, obj);
        });
      }
    });

    // GLTF / GLB
    const gltfLoader = new GLTFLoader();
    this.__loaders.push({
      extensions: ["gltf", "glb"],
      load: resource => {
        gltfLoader.load(resource.src, gltf => {
          this._fileLoaded(resource, gltf);
        });
      }
    });

    // FBX
    const fbxLoader = new FBXLoader();
    this.__loaders.push({
      extensions: ["fbx"],
      load: resource => {
        fbxLoader.load(resource.src, fbx => {
          this._fileLoaded(resource, fbx);
        });
      }
    });
  }

  _fileLoaded(resource, data) {
    this._numResourcesLoaded++;

    this._resources[resource.name] = data;

    if (resource.type === "texture") {
      const texture = new Texture(data);
      texture.needsUpdate = true;
      this._resources[`${resource.name}Texture`] = texture;
    } else if (resource.type === "video") {
      const video = new VideoTexture(data);
      video.needsUpdate = true;
      this._resources[`${resource.name}VideoTexture`] = video;
    }

    this.dispatch("fileLoaded", { resource, data });

    if (this._numResourcesLoaded === this._numResourcesToLoad) {
      this.dispatch("allFilesLoaded");
    }
  }
}
