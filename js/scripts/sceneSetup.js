import * as THREE from "three";

export const w = window.innerWidth;
export const h = window.innerHeight;

export const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
renderer.shadowMap.enabled = true;

export const scene = new THREE.Scene();
scene.background = new THREE.Color(0xF2F2F2);

export const camera = new THREE.PerspectiveCamera(30, w / h, 0.1, 100);
camera.position.set(3, 2, 5);
camera.lookAt(0, 0, 0);

window.scene = scene;
window.camera = camera;
window.renderer = renderer;

export const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0xF2F2F2
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.z = -.45; // Position the plane as needed
scene.add(plane);

const plane2Geometry = new THREE.PlaneGeometry(5, 5);
const plane2Material = new THREE.MeshBasicMaterial({
    color: 0xF2F2F2
});
const plane2 = new THREE.Mesh(plane2Geometry, plane2Material);
plane2.rotation.x = -Math.PI / 2;
plane2.position.y = -1;
scene.add(plane2);

window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

export function resetScene(scene, camera) {
    scene.rotation.y = 0; // Reset scene rotation
    camera.position.set(0, 1, 2); // Reset camera position
    camera.lookAt(0, 0, 0); // Ensure camera faces the origin
}
