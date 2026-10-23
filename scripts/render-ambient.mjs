/** Original cinematic light study. Rebuild with ffmpeg installed. */
import { spawnSync } from "node:child_process";
const phase = "2*PI*T/8";
const glow = `exp(-16*pow(X/W-(0.62+0.14*sin(${phase})),2)-9*pow(Y/H-(0.52+0.12*cos(${phase})),2))`;
const beam = `exp(-110*pow(Y/H-0.48-0.14*sin(X/W*4+${phase}),2))*exp(-4*pow(X/W-.65,2))`;
const filter = `geq=r='5+7*${glow}+2*${beam}':g='8+30*${glow}+7*${beam}':b='10+27*${glow}+8*${beam}'`;
const result = spawnSync(
  "ffmpeg",
  [
    "-y",
    "-loglevel",
    "error",
    "-f",
    "lavfi",
    "-i",
    "color=c=black:s=1280x720:r=24:d=8",
    "-vf",
    filter,
    "-c:v",
    "libx264",
    "-crf",
    "23",
    "-preset",
    "medium",
    "-pix_fmt",
    "yuv420p",
    "-an",
    "-movflags",
    "+faststart",
    "public/media/ambient-loop.mp4",
  ],
  { stdio: "inherit" },
);
if (result.status !== 0) throw new Error("Ambient film generation failed.");
const poster = spawnSync(
  "ffmpeg",
  [
    "-y",
    "-loglevel",
    "error",
    "-i",
    "public/media/ambient-loop.mp4",
    "-frames:v",
    "1",
    "public/media/ambient-poster.webp",
  ],
  { stdio: "inherit" },
);
if (poster.status !== 0) throw new Error("Poster generation failed.");
console.log("Original ambient film ready: 8 seconds / 24 fps.");
