import { gsap } from "gsap";
import * as THREE from "three";
import { setupWaves } from "./bkgAnimatedSetup.js";

export function setupZoomAnimation(scene, camera) {
    const startButton = document.getElementById("start-animation");

    startButton.addEventListener("click", () => {
        // Stop the rotation
        window.isRotating = false; //stop the rotation

        if (scene) {
            gsap.to(scene.rotation, { y: 0, duration: 0.5, ease: "power2.out" });
        }

        gsap.to(camera.position, {
            x: 0,
            y: 1,
            z: 4,
            duration: 1,
            ease: "power2.out",
            onComplete: () => {
                gsap.to(camera.position, {
                    x: 0,
                    y: 0,
                    z: 0.5,
                    duration: 2,
                    ease: "power2.out",
                    onUpdate: () => {
                        camera.lookAt(new THREE.Vector3(0, 0, 0));
                    },
                    onComplete: () => {
                        showNewContent();
                    },
                });
            },
        });
    });
}


function showNewContent() {
    console.log("Transitioning to new content...");

    const canvasContainer = document.getElementById("canvas-container");
    const titleSection = document.getElementById("title-section");
    const newContent = document.getElementById("new-content");

    if (canvasContainer) {
        canvasContainer.style.display = "none";
    } else {
        console.error("Canvas container not found.");
    }

    if (titleSection) {
        titleSection.style.display = "none";
    } else {
        console.error("Title section not found.");
    }

    if (newContent) {
        newContent.style.display = "flex";
        newContent.style.opacity = 1;
        setupWaves("waves-container");
    } else {
        console.error("New content section not found.");
    }
}

// Add event listener for the home button
document.getElementById("home-button").addEventListener("click", () => {
    transitionToHome();
});

function transitionToHome() {
    const newContent = document.getElementById("new-content");
    const titleSection = document.getElementById("title-section");
    const canvasContainer = document.getElementById("canvas-container");

    if (newContent) {
        newContent.style.opacity = 0;
        newContent.style.transition = "opacity 0.5s";
        setTimeout(() => {
            newContent.style.display = "none";
        }, 500);
    }

    if (titleSection && canvasContainer) {
        titleSection.style.display = "block";
        titleSection.style.opacity = 1;
        titleSection.style.transition = "opacity 0.5s";
        canvasContainer.style.display = "block";
    }

    restartInitialAnimation(); // Reset Three.js animation
}


function restartInitialAnimation() {
    console.log("Restarting initial animation...");
    const camera = window.camera; // Access global camera
    const scene = window.scene;  // Access global scene
    const renderer = window.renderer;

    if (!scene || !camera || !renderer) {
        console.error("Scene, camera, or renderer not found.");
        return;
    }

    // Reset camera position
    camera.position.set(0, 1, 2);
    camera.lookAt(0, 0, 0);

    // Reset scene rotation
    scene.rotation.y = 0;

    // Re-render the scene
    renderer.render(scene, camera);

    // Restart the animation loop
    window.isRotating = true; // Ensure the scene rotation resumes
}

document.getElementById("home-button").addEventListener("click", () => {
    transitionToHome();
    restartInitialAnimation();
});


