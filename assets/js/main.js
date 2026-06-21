
// =========================
// FILE: assets/js/main.js
// =========================



// =========================
// HERO TERMINAL TYPING LOGIC
// =========================

const terminalText = [
    "$ whoami",
    "Shammas Qazi",
    "Security Engineer | Offensive Security | Automation | Research",
    "STATUS: OPERATIONAL",
    "Primary: Offensive Security",
    "Expanding: AI Security",
    "Building: Public Projects + Writeups",
    "Objective: Understand Systems. Break Assumptions."
];

const terminalContainer = document.querySelector(".terminal-flow");

let lineIndex = 0;
let charIndex = 0;

function typeLine() {
    if (!terminalContainer) {
        return;
    }

    if (lineIndex < terminalText.length) {
        const currentLine = terminalText[lineIndex];

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





// =========================
// MOBILE NAVBAR TOGGLE LOGIC
// =========================

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}





// =========================
// UNIVERSAL HACKER VAULT LOGIC
// This powers About, Portfolio, Certs, Passions, Writeups, Future, and Contact.
// Each button uses data-target, data-terminal, data-name, data-open, and data-close.
// =========================

const vaultButtons = document.querySelectorAll(".vault-toggle");

vaultButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const targetId = button.getAttribute("data-target");
        const terminalId = button.getAttribute("data-terminal");
        const vaultName = button.getAttribute("data-name");
        const openText = button.getAttribute("data-open") || `[ unlock ${vaultName} ]`;
        const closeText = button.getAttribute("data-close") || `[ lock ${vaultName} ]`;

        const targetContent = document.getElementById(targetId);
        const terminalBox = document.getElementById(terminalId);

        if (!targetContent || !terminalBox) {
            return;
        }

        const isOpen = targetContent.classList.contains("show");

        if (isOpen) {
            targetContent.classList.remove("show");
            terminalBox.textContent = "";
            button.textContent = openText;
            return;
        }

        terminalBox.textContent = "";
        button.textContent = "[ decrypting... ]";

        const vaultMessages = [
            `> locating ${vaultName}...`,
            "> verifying access token...",
            "> decrypting archive...",
            "> rendering secure output...",
            "> access granted."
        ];

        let messageIndex = 0;

        const interval = setInterval(() => {
            terminalBox.textContent += vaultMessages[messageIndex] + "\n";
            messageIndex++;

            if (messageIndex === vaultMessages.length) {
                clearInterval(interval);

                setTimeout(() => {
                    targetContent.classList.add("show");
                    button.textContent = closeText;
                }, 350);
            }
        }, 420);
    });
});





// =========================
// CLOSE MOBILE MENU AFTER CLICK LOGIC
// =========================

const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach((item) => {
    item.addEventListener("click", () => {
        if (navLinks) {
            navLinks.classList.remove("active");
        }
    });
});





// =========================
// SCROLL REVEAL ANIMATION LOGIC
// Applies fade-up animation to sections, cards, certs, profile panel, and terminal.
// =========================

const revealElements = document.querySelectorAll(
    ".section, .card, .cert-card, .profile-card, .terminal-window"
);

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
