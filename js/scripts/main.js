import { renderer, scene, camera } from "./sceneSetup.js";
import { addLights } from "./lighting.js";
import { loadModel } from "./modelLoader.js";
import { setupZoomAnimation } from "./uiAnimations.js";
import { showLoadingScreen, hideLoadingScreen } from "../utils/loading.js";

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

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();


