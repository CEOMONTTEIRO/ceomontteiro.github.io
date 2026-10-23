import test from "node:test";
import assert from "node:assert/strict";
import { ribbonCenter, ribbonMesh, clamp } from "../src/domain/ribbon.ts";

test("the sculpture closes without a discontinuity at the seam", () => {
  for (const expression of [0.35, 1, 1.8]) {
    const start = ribbonCenter(0, expression);
    const end = ribbonCenter(Math.PI * 2, expression);
    for (const axis of ["x", "y", "z"])
      assert.ok(Math.abs(start[axis] - end[axis]) < 1e-9);
    const mesh = ribbonMesh(expression, 48, 10);
    const rowSize = 11 * 3;
    for (let i = 0; i < rowSize; i++)
      assert.ok(
        Math.abs(mesh.positions[i] - mesh.positions[48 * rowSize + i]) < 1e-5,
      );
  }
});

test("all supported expressions produce finite geometry and valid triangle indices", () => {
  for (const expression of [0.35, 0.6, 1, 1.4, 1.8]) {
    const mesh = ribbonMesh(expression, 72, 10);
    assert.ok(mesh.positions.every(Number.isFinite));
    assert.ok(mesh.indices.every((index) => index < mesh.positions.length / 3));
    assert.ok(mesh.indices.length > 0);
  }
});

test("pointer and scroll values stay inside their intended boundaries", () => {
  assert.equal(clamp(-2, -1, 1), -1);
  assert.equal(clamp(3, -1, 1), 1);
  assert.equal(clamp(0.45, 0, 1), 0.45);
});
