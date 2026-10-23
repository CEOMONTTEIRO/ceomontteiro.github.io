import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { createRibbonGeometry } from "./sculpture";
import { clamp } from "@/domain/ribbon";

export interface StudioOptions {
  color: string;
  speed: number;
  expression: number;
  playing: boolean;
  dark: boolean;
}

export interface StudioController {
  update: (options: StudioOptions) => void;
  setVisible: (visible: boolean) => void;
  pointer: (x: number, y: number) => void;
  canvas: HTMLCanvasElement;
  dispose: () => void;
}

export function createStudio(
  container: HTMLElement,
  initial: StudioOptions,
  onContextLost: () => void,
): StudioController {
  let options = { ...initial };
  let visible = true;
  let disposed = false;
  let frame = 0;
  let lastFrame = 0;
  let elapsed = 0;
  const pointerTarget = new THREE.Vector2();
  const pointerCurrent = new THREE.Vector2();
  const compact = window.matchMedia("(max-width: 720px)").matches;
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: !compact,
    powerPreference: "low-power",
    preserveDrawingBuffer: false,
  });
  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, compact ? 1.25 : 1.7),
  );
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.5;
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.setAttribute("aria-hidden", "true");
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 30);
  camera.position.set(0, 0, 6.5);
  const environmentSource = new RoomEnvironment();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environment = pmrem.fromScene(environmentSource, 0.035);
  scene.environment = environment.texture;
  environmentSource.dispose();
  pmrem.dispose();

  const material = new THREE.MeshPhysicalMaterial({
    color: initial.color,
    metalness: 0.87,
    roughness: 0.19,
    clearcoat: 1,
    clearcoatRoughness: 0.18,
    side: THREE.DoubleSide,
  });
  const ribbon = new THREE.Mesh(
    createRibbonGeometry(initial.expression, compact ? 180 : 280),
    material,
  );
  const group = new THREE.Group();
  group.add(ribbon);
  group.rotation.set(0.27, -0.2, -0.28);
  scene.add(group);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x43665f, 2.2));
  const keyLight = new THREE.DirectionalLight(0xffffff, 4);
  keyLight.position.set(3, 5, 4);
  scene.add(keyLight);
  const rimLight = new THREE.DirectionalLight(0x8ce8d6, 3);
  rimLight.position.set(-4, 1, -3);
  scene.add(rimLight);

  function render() {
    if (disposed) return;
    pointerCurrent.lerp(pointerTarget, 0.07);
    group.rotation.x = 0.28 + pointerCurrent.y * 0.22;
    group.rotation.y = -0.2 + elapsed * 0.22 + pointerCurrent.x * 0.36;
    group.rotation.z = -0.28 + Math.sin(elapsed * 0.32) * 0.09;
    group.position.y = Math.sin(elapsed * 0.7) * 0.07;
    renderer.render(scene, camera);
  }

  function loop(time: number) {
    frame = 0;
    if (disposed || !visible || !options.playing) return;
    const interval = compact ? 1000 / 30 : 1000 / 60;
    if (time - lastFrame >= interval) {
      const delta = lastFrame ? Math.min((time - lastFrame) / 1000, 0.06) : 0;
      elapsed += delta * options.speed;
      lastFrame = time;
      render();
    }
    frame = requestAnimationFrame(loop);
  }

  function synchronizeLoop() {
    cancelAnimationFrame(frame);
    frame = 0;
    lastFrame = 0;
    if (visible && options.playing && !disposed)
      frame = requestAnimationFrame(loop);
    else if (visible) render();
  }

  function resize() {
    const { width, height } = container.getBoundingClientRect();
    if (width <= 0 || height <= 0 || disposed) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    render();
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);
  const handleContextLost = (event: Event) => {
    event.preventDefault();
    cancelAnimationFrame(frame);
    visible = false;
    onContextLost();
  };
  renderer.domElement.addEventListener("webglcontextlost", handleContextLost);
  resize();
  synchronizeLoop();

  return {
    canvas: renderer.domElement,
    pointer(x, y) {
      pointerTarget.set(clamp(x, -1, 1), clamp(y, -1, 1));
      if (!options.playing && visible) render();
    },
    setVisible(next) {
      visible = next;
      synchronizeLoop();
    },
    update(next) {
      const expressionChanged = next.expression !== options.expression;
      const playbackChanged = next.playing !== options.playing;
      options = { ...next };
      material.color.set(next.color);
      material.roughness = next.color === "#343f3a" ? 0.28 : 0.19;
      if (expressionChanged) {
        const old = ribbon.geometry;
        ribbon.geometry = createRibbonGeometry(
          next.expression,
          compact ? 180 : 280,
        );
        old.dispose();
      }
      if (playbackChanged) synchronizeLoop();
      if (visible && !options.playing) render();
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener(
        "webglcontextlost",
        handleContextLost,
      );
      ribbon.geometry.dispose();
      material.dispose();
      environment.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
