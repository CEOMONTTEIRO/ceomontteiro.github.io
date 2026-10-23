export interface Point3 {
  x: number;
  y: number;
  z: number;
}

/** Closed spatial path. Every term is periodic over 2π. */
export function ribbonCenter(t: number, expression = 1): Point3 {
  const radius = 1.16 + 0.24 * Math.cos(3 * t);
  return {
    x: radius * Math.cos(t),
    y: expression * (0.55 * Math.sin(2 * t) + 0.15 * Math.sin(3 * t)),
    z: radius * Math.sin(t) * 0.82,
  };
}

export function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

/** Shared mesh for GPU and software renderers. */
export function ribbonMesh(expression = 1, segments = 120, sides = 12) {
  const positions = new Float32Array((segments + 1) * (sides + 1) * 3);
  const indices = new Uint32Array(segments * sides * 6);
  let vertex = 0,
    triangle = 0;
  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * Math.PI * 2;
    const point = ribbonCenter(t, expression);
    const a = ribbonCenter(t + 0.0001, expression),
      b = ribbonCenter(t - 0.0001, expression);
    const length = Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
    const tangent = {
      x: (a.x - b.x) / length,
      y: (a.y - b.y) / length,
      z: (a.z - b.z) / length,
    };
    const sideLength = Math.hypot(tangent.z, tangent.x);
    const side = { x: -tangent.z / sideLength, z: tangent.x / sideLength };
    const normal = {
      x: -side.z * tangent.y,
      y: side.z * tangent.x - side.x * tangent.z,
      z: side.x * tangent.y,
    };
    const twist = t + 0.4 * Math.sin(2 * t),
      width = 0.255 + 0.055 * Math.cos(3 * t);
    for (let j = 0; j <= sides; j++) {
      const angle = (j / sides) * Math.PI * 2,
        u = Math.cos(angle) * width,
        v = Math.sin(angle) * 0.065;
      const horizontal = u * Math.cos(twist) - v * Math.sin(twist),
        vertical = u * Math.sin(twist) + v * Math.cos(twist);
      positions[vertex++] = point.x + side.x * horizontal + normal.x * vertical;
      positions[vertex++] = point.y + normal.y * vertical;
      positions[vertex++] = point.z + side.z * horizontal + normal.z * vertical;
      if (i < segments && j < sides) {
        const current = i * (sides + 1) + j,
          next = current + sides + 1;
        indices.set(
          [current, next, current + 1, current + 1, next, next + 1],
          triangle,
        );
        triangle += 6;
      }
    }
  }
  return { positions, indices };
}
