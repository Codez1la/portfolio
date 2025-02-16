import { gsap } from "gsap";
import * as THREE from "three";
import { setupWaves } from "./bkgAnimatedSetup.js";

export function setupZoomAnimation(scene, camera) {
    const startButton = document.getElementById("start-animation");

    startButton.addEventListener("click", () => {
        startButton.classList.add("unclick");
        // Stop the rotation
        window.isRotating = false; //stop the rotation

        showNewContent();
    });
}


function showNewContent() {
    console.log("Transitioning to new content...");
    const startButton = document.getElementById("start-animation"); // im lazy
    startButton.classList.remove("unclick");

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
    }}

document.getElementById("home-button").addEventListener("click", () => {
    transitionToHome();
});


