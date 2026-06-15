const terminalText = [
    "$ whoami",
    "Shammas Qazi",
    "Security Engineer | Offensive Security | Automation | Research",
    "Building secure systems.",
    "Breaking insecure ones.",
    "Documenting the journey."
];

const terminalContainer = document.querySelector(".terminal-flow");

let lineIndex = 0;
let charIndex = 0;

function typeLine() {
    if (lineIndex < terminalText.length) {
        let currentLine = terminalText[lineIndex];

        if (charIndex === 0) {
            const line = document.createElement("p");
            line.classList.add("typed-line");
            terminalContainer.appendChild(line);
        }

        const currentParagraph = terminalContainer.lastChild;
        currentParagraph.textContent += currentLine.charAt(charIndex);
        charIndex++;

        if (charIndex < currentLine.length) {
            setTimeout(typeLine, 45);
        } else {
            charIndex = 0;
            lineIndex++;
            setTimeout(typeLine, 350);
        }
    } else {
        const cursor = document.createElement("span");
        cursor.classList.add("cursor");
        cursor.textContent = "█";
        terminalContainer.appendChild(cursor);
    }
}

document.addEventListener("DOMContentLoaded", typeLine);

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

const revealElements = document.querySelectorAll(".section, .card");

revealElements.forEach((element) => {
    element.classList.add("reveal");
});

function revealOnScroll() {
    revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 80) {
            element.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);