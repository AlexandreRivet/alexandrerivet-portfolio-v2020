import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three';

export interface ApplicationParams {
  view: HTMLCanvasElement;
}

export default class Application {
  #view: HTMLCanvasElement;

  #scene: Scene;

  #renderer: WebGLRenderer;

  #camera: PerspectiveCamera;

  #rafID: number | null = null;

  #storedWidth: number;

  #storedHeight: number;

  #material: MeshBasicMaterial;

  constructor(parameters: ApplicationParams) {
    this.#view = parameters.view;

    this.initRenderer();
    this.initWorld();
  }

  set rafID(value: number | null) {
    if (this.#rafID && value === null) {
      cancelAnimationFrame(this.#rafID);
      this.#rafID = null;
    }
  }

  public destroy() {
    this.rafID = null;
  }

  public keepSizeUpToDate() {
    if (this.#storedWidth === this.#view.clientWidth && this.#storedHeight === this.#view.clientHeight) {
      return;
    }

    this.#storedWidth = this.#view.clientWidth;
    this.#storedHeight = this.#view.clientHeight;

    // Refresh renderer
    this.#renderer.setSize(this.#storedWidth, this.#storedHeight, false);

    // Refresh camera
    this.#camera.aspect = this.#storedWidth / this.#storedHeight;
    this.#camera.updateProjectionMatrix();
  }

  private initRenderer() {
    this.#scene = new Scene();

    this.#camera = new PerspectiveCamera(60, 1, 0.1, 1000);

    this.#renderer = new WebGLRenderer({
      canvas: this.#view,
      alpha: true,
    });

    this.#renderer.setClearColor(0x000000, 1);
    this.#renderer.setPixelRatio(2);

    this.keepSizeUpToDate();
  }

  private initWorld() {
    const geometry = new BoxGeometry();
    const material = new MeshBasicMaterial({ color: 0x00FF00 });
    const cube = new Mesh(geometry, material);

    this.#scene.add(cube);
    this.#camera.position.z = 5;

    this.#material = material;

    const animate = () => {
      this.#rafID = requestAnimationFrame(animate);

      this.keepSizeUpToDate();

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      this.#renderer.render(this.#scene, this.#camera);
    }

    animate();
  }

  public setColor(color: number) {
    this.#material.color.setHex(color);
  } 

}