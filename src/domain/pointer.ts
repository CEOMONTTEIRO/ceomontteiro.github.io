export interface PointerFrame {
  left: number;
  top: number;
  width: number;
  height: number;
}

/** Keep spring targets finite and bounded, including during a layout resize. */
export function portraitPointer(
  frame: PointerFrame,
  clientX: number,
  clientY: number,
  viewportWidth: number,
  viewportHeight: number,
) {
  const clamp = (value: number) =>
    Math.max(-1, Math.min(1, Number.isFinite(value) ? value : 0));
  return {
    x: clamp(
      (clientX - frame.left - frame.width / 2) / Math.max(1, viewportWidth / 2),
    ),
    y: clamp(
      (clientY - frame.top - frame.height * 0.4) /
        Math.max(1, viewportHeight / 2),
    ),
  };
}
