import * as THREE from "three";
import { ribbonMesh } from "@/domain/ribbon";

export function createRibbonGeometry(
  expression = 1,
  segments = 240,
  sides = 12,
) {
  const { positions, indices } = ribbonMesh(expression, segments, sides);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));
  geometry.computeVertexNormals();
  return geometry;
}
