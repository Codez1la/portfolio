import * as THREE from "three";

export const w = window.innerWidth;
export const h = window.innerHeight;

export const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
renderer.shadowMap.enabled = true;

export const scene = new THREE.Scene();
scene.background = new THREE.Color(0x171717);

export const camera = new THREE.PerspectiveCamera(100, w / h, 0.1, 100);
camera.position.set(0, 1, 2);
camera.lookAt(0, 0, 0);

window.scene = scene;
window.camera = camera;
window.renderer = renderer;

export const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const planeGeometry = new THREE.PlaneGeometry(10, 10, 10, 10, 10); // Add more segments for finer wireframe
const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff, // White wireframe lines
    wireframe: true, // Enable wireframe
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -0.5; // Position the plane as needed
scene.add(plane);



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
