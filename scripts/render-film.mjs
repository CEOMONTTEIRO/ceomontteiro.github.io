/** Regenerate the authored film: Node 24+, sharp, and ffmpeg on PATH. */
import { mkdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import sharp from "sharp";
import { ribbonMesh } from "../src/domain/ribbon.ts";

const size = 800;
const frameCount = 144;
const directory = join(tmpdir(), "mateus-original-film");
await mkdir(directory, { recursive: true });
const mesh = ribbonMesh(1, 120, 14);
const rotate = ([x, y, z], rx, ry, rz) => {
  const y1 = y * Math.cos(rx) - z * Math.sin(rx);
  const z1 = y * Math.sin(rx) + z * Math.cos(rx);
  const x2 = x * Math.cos(ry) + z1 * Math.sin(ry);
  const z2 = -x * Math.sin(ry) + z1 * Math.cos(ry);
  return [
    x2 * Math.cos(rz) - y1 * Math.sin(rz),
    x2 * Math.sin(rz) + y1 * Math.cos(rz),
    z2,
  ];
};
for (let frame = 0; frame < frameCount; frame++) {
  const phase = (frame / frameCount) * Math.PI * 2;
  const vertices = [];
  for (let i = 0; i < mesh.positions.length; i += 3) {
    vertices.push(
      rotate(
        Array.from(mesh.positions.slice(i, i + 3)),
        0.55 + Math.sin(phase) * 0.12,
        -0.35 + phase,
        -0.4 + Math.sin(phase * 2) * 0.06,
      ),
    );
  }
  const triangles = [];
  for (let i = 0; i < mesh.indices.length; i += 3) {
    const points = [
      vertices[mesh.indices[i]],
      vertices[mesh.indices[i + 1]],
      vertices[mesh.indices[i + 2]],
    ];
    const [a, b, c] = points;
    const u = b.map((n, j) => n - a[j]),
      v = c.map((n, j) => n - a[j]);
    let normal = [
      u[1] * v[2] - u[2] * v[1],
      u[2] * v[0] - u[0] * v[2],
      u[0] * v[1] - u[1] * v[0],
    ];
    const length = Math.hypot(...normal) || 1;
    normal = normal.map((n) => (n / length) * (normal[2] < 0 ? -1 : 1));
    const diffuse = Math.max(
      0,
      normal[0] * -0.3 + normal[1] * 0.4 + normal[2] * 0.86,
    );
    const shine = Math.pow(
      Math.max(0, normal[0] * -0.15 + normal[1] * 0.18 + normal[2] * 0.97),
      32,
    );
    const color = [100, 190, 160].map((channel) =>
      Math.round(
        Math.min(255, channel * (0.25 + diffuse * 0.75) + shine * 130),
      ),
    );
    const path = points
      .map(
        ([x, y, z]) =>
          `${(size / 2 + (x * 242) / (1 - z / 9)).toFixed(2)},${(size / 2 - (y * 242) / (1 - z / 9)).toFixed(2)}`,
      )
      .join(" ");
    triangles.push({
      depth: a[2] + b[2] + c[2],
      path,
      color: `rgb(${color.join(",")})`,
    });
  }
  triangles.sort((a, b) => a.depth - b.depth);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><rect width="800" height="800" fill="#101613"/>${triangles.map((t) => `<polygon points="${t.path}" fill="${t.color}" stroke="${t.color}" stroke-width=".55" stroke-linejoin="round"/>`).join("")}</svg>`;
  await sharp(Buffer.from(svg))
    .png()
    .toFile(join(directory, `${String(frame).padStart(4, "0")}.png`));
  if (frame % 36 === 0) console.log(`Rendered ${frame}/${frameCount}`);
}
const result = spawnSync(
  "ffmpeg",
  [
    "-y",
    "-loglevel",
    "error",
    "-framerate",
    "24",
    "-i",
    join(directory, "%04d.png"),
    "-c:v",
    "libx264",
    "-preset",
    "slow",
    "-crf",
    "22",
    "-g",
    "12",
    "-keyint_min",
    "12",
    "-pix_fmt",
    "yuv420p",
    "-an",
    "-movflags",
    "+faststart",
    "public/media/forma-film.mp4",
  ],
  { stdio: "inherit" },
);
if (result.status !== 0) throw new Error("Could not encode the film.");
await rm(directory, { recursive: true, force: true });
console.log("Original film: 144 frames / 6 seconds / 800 × 800.");
