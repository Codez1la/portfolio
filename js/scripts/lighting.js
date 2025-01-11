import * as THREE from "three";

export function addLights(scene) {
    const light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(0, 3, 1);
    light.castShadow = true;

    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 10;

    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3); // Ensure ambient light is soft
    scene.add(ambientLight);
}
