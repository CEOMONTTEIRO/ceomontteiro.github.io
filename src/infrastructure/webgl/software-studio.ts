import { clamp, ribbonMesh } from "@/domain/ribbon";
import type { StudioController, StudioOptions } from "./studio";

/** Real 3D projection on Canvas 2D when WebGL is unavailable. */
export function createSoftwareStudio(
  container: HTMLElement,
  initial: StudioOptions,
): StudioController {
  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  const context = canvas.getContext("2d", { alpha: true });
  if (!context) throw new Error("Canvas indisponível.");
  const ctx = context;
  container.appendChild(canvas);
  let options = { ...initial };
  const compact = window.matchMedia("(max-width: 720px)").matches;
  let mesh = ribbonMesh(options.expression, compact ? 48 : 72, 10);
  let frame = 0,
    previous = 0,
    elapsed = 0,
    visible = true,
    disposed = false,
    width = 500,
    height = 500;
  const pointer = { x: 0, y: 0 };

  function render() {
    if (disposed) return;
    ctx.clearRect(0, 0, width, height);
    const rx = 0.55 + pointer.y * 0.25,
      ry = -0.35 + elapsed * 0.22 + pointer.x * 0.4,
      rz = -0.4 + Math.sin(elapsed * 0.3) * 0.05;
    const cosX = Math.cos(rx),
      sinX = Math.sin(rx),
      cosY = Math.cos(ry),
      sinY = Math.sin(ry),
      cosZ = Math.cos(rz),
      sinZ = Math.sin(rz);
    const transformed: number[][] = [];
    const scale = Math.min(width, height) * 0.294;
    for (let i = 0; i < mesh.positions.length; i += 3) {
      const x = mesh.positions[i],
        y = mesh.positions[i + 1],
        z = mesh.positions[i + 2];
      const y1 = y * cosX - z * sinX,
        z1 = y * sinX + z * cosX;
      const x2 = x * cosY + z1 * sinY,
        z2 = -x * sinY + z1 * cosY;
      const x3 = x2 * cosZ - y1 * sinZ,
        y3 = x2 * sinZ + y1 * cosZ;
      transformed.push([
        width / 2 + (x3 * scale) / (1 - z2 / 9),
        height / 2 - (y3 * scale) / (1 - z2 / 9),
        z2,
      ]);
    }
    const triangles: { points: number[][]; depth: number; light: number }[] =
      [];
    for (let i = 0; i < mesh.indices.length; i += 3) {
      const points = [
        transformed[mesh.indices[i]],
        transformed[mesh.indices[i + 1]],
        transformed[mesh.indices[i + 2]],
      ];
      const [a, b, c] = points;
      const ux = b[0] - a[0],
        uy = b[1] - a[1],
        uz = (b[2] - a[2]) * scale;
      const vx = c[0] - a[0],
        vy = c[1] - a[1],
        vz = (c[2] - a[2]) * scale;
      let nx = uy * vz - uz * vy,
        ny = uz * vx - ux * vz,
        nz = ux * vy - uy * vx;
      const length = Math.hypot(nx, ny, nz) || 1;
      nx /= length;
      ny /= length;
      nz /= length;
      if (nz < 0) {
        nx = -nx;
        ny = -ny;
        nz = -nz;
      }
      const diffuse = Math.max(0, nx * -0.3 + ny * -0.4 + nz * 0.86);
      const specular = Math.pow(
        Math.max(0, nx * -0.15 + ny * -0.18 + nz * 0.97),
        35,
      );
      triangles.push({
        points,
        depth: a[2] + b[2] + c[2],
        light: 0.28 + diffuse * 0.7 + specular * 0.65,
      });
    }
    triangles.sort((a, b) => a.depth - b.depth);
    const color = options.color.slice(1),
      rgb = [0, 2, 4].map((offset) =>
        parseInt(color.slice(offset, offset + 2), 16),
      );
    for (const triangle of triangles) {
      const shade = rgb.map((channel) =>
        Math.round(
          clamp(
            channel * triangle.light + Math.max(0, triangle.light - 1) * 100,
            0,
            255,
          ),
        ),
      );
      ctx.fillStyle = `rgb(${shade.join(",")})`;
      ctx.strokeStyle = ctx.fillStyle;
      ctx.lineWidth = 0.65;
      ctx.beginPath();
      triangle.points.forEach((point, index) =>
        index ? ctx.lineTo(point[0], point[1]) : ctx.moveTo(point[0], point[1]),
      );
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
  }

  function loop(time: number) {
    if (!visible || disposed || !options.playing) {
      frame = 0;
      return;
    }
    if (time - previous >= 1000 / (compact ? 20 : 30)) {
      elapsed += previous
        ? Math.min((time - previous) / 1000, 0.09) * options.speed
        : 0;
      previous = time;
      render();
    }
    frame = requestAnimationFrame(loop);
  }
  function synchronize() {
    cancelAnimationFrame(frame);
    frame = 0;
    previous = 0;
    if (visible && options.playing && !disposed)
      frame = requestAnimationFrame(loop);
    else if (visible) render();
  }
  function resize() {
    const bounds = container.getBoundingClientRect();
    width = Math.max(1, Math.round(bounds.width));
    height = Math.max(1, Math.round(bounds.height));
    canvas.width = width;
    canvas.height = height;
    render();
  }
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);
  resize();
  synchronize();
  return {
    canvas,
    update(next) {
      if (next.expression !== options.expression)
        mesh = ribbonMesh(next.expression, compact ? 48 : 72, 10);
      const playbackChanged = next.playing !== options.playing;
      options = { ...next };
      if (playbackChanged) synchronize();
      else if (visible) render();
    },
    pointer(x, y) {
      pointer.x = clamp(x, -1, 1);
      pointer.y = clamp(y, -1, 1);
      if (visible) render();
    },
    setVisible(next) {
      visible = next;
      synchronize();
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      canvas.remove();
    },
  };
}
