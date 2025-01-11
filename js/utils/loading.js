export function showLoadingScreen(loadingScreen, typingText) {
    console.log("Loading started");
    loadingScreen.style.display = "flex";

    // Add the text "[CD]" dynamically
    typingText.textContent = "[CD]";
}

export function hideLoadingScreen(loadingScreen) {
    console.log("Loading complete");

    // Add a fade-out effect
    loadingScreen.classList.add("fade-out");
    setTimeout(() => {
        loadingScreen.style.display = "none";
    }, 1500); // Match the fade-out duration
    const animationButton = document.getElementById("start-animation");

    setTimeout(() => {
        animationButton.classList.add("fade-in");
      }, 600);
}
