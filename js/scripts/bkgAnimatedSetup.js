import * as THREE from "three";

export function setupWaves(containerId) {
    // Create the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(95, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.domElement.id = "waves-canvas"; // Add ID for debugging

    // Find container and append canvas
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with id '${containerId}' not found.`);
        return;
    }
    console.log(`Appending canvas to: `, container); // Debugging
    container.innerHTML = ""; // Clear existing content
    container.appendChild(renderer.domElement);

    // Set up 3D scene
    const geometry = new THREE.PlaneGeometry(40, 40, 30, 30);
    const material = new THREE.MeshStandardMaterial({
        color: 0xffffff, // Base color of the waves
        flatShading: true,
        wireframe: true,
        emissive: 0xaaaaaa, // Add emissive light to make it glow
        emissiveIntensity: 1.0, // Adjust intensity of the glow
    });

    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);

    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(0, 10, 10);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0); // Set higher intensity for brighter lighting
    scene.add(ambientLight);


    camera.position.set(0, 10, 20);

    function animate() {
        requestAnimationFrame(animate);
        const time = Date.now() * 0.001;
        for (let i = 0; i < geometry.attributes.position.count; i++) {
            const x = geometry.attributes.position.getX(i);
            const y = geometry.attributes.position.getY(i);
            geometry.attributes.position.setZ(i, Math.sin(x * 0.5 + time) * Math.cos(y * 0.5 + time));
        }
        geometry.attributes.position.needsUpdate = true;
        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
