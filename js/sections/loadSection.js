// loadSection.js
import { aboutContent, aboutLogic } from "./about.js";
import { certsContent, certLogic } from "./certs.js";
import { contactContent, contactLogic } from "./contact.js";
import { creditsContent, creditsLogic } from "./credits.js";
import { educationContent, educationLogic } from "./education";
import { hobbiesContent, hobbiesLogic } from "./hobbies.js";
import { projectsContent, projectsLogic } from "./projects.js";

// Map section IDs to their content and logic
const sections = {
    About: { content: aboutContent, logic: aboutLogic },
    Education: { content: educationContent, logic: educationLogic },
    Certifications: { content: certsContent, logic: certLogic },
    Projects: { content: projectsContent, logic: projectsLogic },
    Hobbies: { content: hobbiesContent, logic: hobbiesLogic },
    Connect: { content: contactContent, logic: contactLogic },
    Credits: { content: creditsContent, logic: creditsLogic },
    // Add other sections here...
};

function updateIndicators(activeIndex) {
    const indicators = document.querySelectorAll(".indicator");
    indicators.forEach((indicator, index) => {
        if (index === activeIndex) {
            indicator.classList.add("active");
        } else {
            indicator.classList.remove("active");
        }
    });
}

function setupIndicators() {
    const indicators = document.querySelectorAll(".indicator");
    const sectionNames = Object.keys(sections);

    indicators.forEach((indicator, index) => {
        indicator.addEventListener("click", () => {
            const sectionName = sectionNames[index];
            loadSection(sectionName); // Navigate to the section corresponding to the clicked indicator
        });
    });
}

function loadSection(sectionName) {
    const dynamicContent = document.getElementById("dynamic-content");
    const sectionNames = Object.keys(sections);
    const activeIndex = sectionNames.indexOf(sectionName);

    if (!sections[sectionName]) {
        console.error(`Section "${sectionName}" does not exist.`);
        return;
    }

    // Update dynamic content
    dynamicContent.innerHTML = sections[sectionName].content;

    // Execute section-specific logic
    if (typeof sections[sectionName].logic === "function") {
        sections[sectionName].logic();
    }

    // Update indicators
    updateIndicators(activeIndex);
}



// Setup navigation to load sections dynamically
function setupNavigation() {
    const navLinks = document.querySelectorAll("#nav-bar a");

    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault(); // Prevent default link behavior
            const sectionName = link.textContent.trim(); // Fetch text from the clicked link
            console.log(`User clicked on: ${sectionName}`); // Log clicked section
            loadSection(sectionName);
        });
    });
}

// Initialize navigation setup
setupIndicators();
setupNavigation();
loadSection("About"); // Default section