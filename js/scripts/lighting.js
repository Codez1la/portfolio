import * as THREE from "three";

export function addLights(scene) {
    const light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(0, 3, 1);

    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3); // Ensure ambient light is soft
    scene.add(ambientLight);
}
