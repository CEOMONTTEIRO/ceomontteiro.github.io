import test from "node:test";
import assert from "node:assert/strict";
import { portraitPointer } from "../src/domain/pointer.ts";
const frame = { left: 100, top: 50, width: 400, height: 500 };

test("portrait faces its neutral focus point without an offset", () => {
  assert.deepEqual(portraitPointer(frame, 300, 250, 1000, 800), { x: 0, y: 0 });
});
test("extreme cursor positions remain inside the perspective limits", () => {
  assert.deepEqual(portraitPointer(frame, -10000, 10000, 1000, 800), {
    x: -1,
    y: 1,
  });
});
test("a transient zero-sized viewport never produces an infinite transform", () => {
  const point = portraitPointer(
    { left: 0, top: 0, width: 0, height: 0 },
    0,
    0,
    0,
    0,
  );
  assert.ok(Number.isFinite(point.x) && Number.isFinite(point.y));
  assert.deepEqual(point, { x: 0, y: 0 });
});
