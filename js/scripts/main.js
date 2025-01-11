import { renderer, scene, camera } from "./sceneSetup.js";
import { addLights } from "./lighting.js";
import { loadModel } from "./modelLoader.js";
import { setupZoomAnimation } from "./uiAnimations.js";
import { showLoadingScreen, hideLoadingScreen } from "../utils/loading.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Attach the renderer to the DOM
const canvasContainer = document.getElementById("canvas-container");
canvasContainer.appendChild(renderer.domElement);

// Show loading screen
showLoadingScreen(
    document.getElementById("loading-screen"),
    document.getElementById("typing-text")
);


// Initialize scene
addLights(scene);

// Load model and setup animations
let model;
loadModel(scene).then((loadedModel) => {
    model = loadedModel;

    // Hide loading screen after loading
    setTimeout(() => {
        hideLoadingScreen(document.getElementById("loading-screen"));
    }, 4000); // Simulate loading for 8 seconds
    

    setupZoomAnimation(scene, camera);
});

// Enable OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.enableZoom = false;
controls.enablePan = false;
controls.maxPolarAngle = Math.PI / 2;

// Animation loop
let isRotating = true;
window.isRotating = isRotating; // Attach isRotating to the global window object

let rotationSpeed = 0.001;

function animate() {
    requestAnimationFrame(animate);

    if (scene && window.isRotating) {
        scene.rotation.y += rotationSpeed;
    }

    controls.update();
    renderer.render(scene, camera);
}
animate();


