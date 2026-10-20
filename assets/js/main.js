
/* =====================================================
   SHAMMAS QAZI - SECURITY PORTFOLIO
   MAIN JAVASCRIPT

   FEATURES:
   1. Hero terminal typing animation
   2. Mobile navigation
   3. Vault lock/unlock animations
   4. Scroll reveal animations
   5. Reduced-motion accessibility
===================================================== */

"use strict";

/* =====================================================
   01 - GLOBAL SETTINGS
===================================================== */

const CONFIG = {
    typingSpeed: 30,
    lineDelay: 280,
    vaultTypingSpeed: 24,
    vaultLineDelay: 320
};

/*
   Respect the user's reduced-motion preference.
*/

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
);

function sleep(milliseconds) {
    if (prefersReducedMotion.matches) {
        return Promise.resolve();
    }

    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}


/* =====================================================
   02 - HERO TERMINAL CONTENT

   Edit terminalText to change the introduction
   displayed on the LEFT side of the hero section.

   The RIGHT status panel is defined in index.html.
===================================================== */

const terminalText = [
    "$ whoami",
    "Shammas Qazi",
    "Security Engineer | Offensive Security | Automation | Research",
    "",
    "$ cat mission.txt",
    "Building secure systems.",
    "Breaking insecure ones.",
    "Automating security workflows.",
    "Documenting the journey.",
    "",
    "$ echo $MINDSET",
    "Stay Curious. Keep Learning. Never Stop Exploring."
];


/* =====================================================
   03 - TERMINAL TYPEWRITER FUNCTION

   Creates a new line and types characters one by one.
   Uses textContent to avoid interpreting text as HTML.
===================================================== */

async function typeTerminalLine(container, text, speed) {

    const line = document.createElement("div");

    line.classList.add("terminal-line");

    /*
       Highlight command lines that begin with "$".
    */

    if (text.startsWith("$")) {
        line.classList.add("terminal-command");
    }

    container.appendChild(line);

    /*
       Preserve empty lines in the terminal.
    */

    if (text === "") {
        line.textContent = "\u00A0";
        return;
    }

    /*
       Display instantly when reduced motion is enabled.
    */

    if (prefersReducedMotion.matches) {
        line.textContent = text;
        return;
    }

    for (const character of text) {
        line.textContent += character;

        await sleep(speed);
    }
}


/* =====================================================
   04 - HERO TERMINAL ANIMATION

   Automatically runs when the page loads.
===================================================== */

async function initializeHeroTerminal() {

    const terminal = document.querySelector(
        ".terminal-flow"
    );

    if (!terminal) {
        return;
    }

    /*
       Clear any existing terminal content.
    */

    terminal.textContent = "";

    /*
       Type each line sequentially.
    */

    for (const line of terminalText) {

        await typeTerminalLine(
            terminal,
            line,
            CONFIG.typingSpeed
        );

        await sleep(CONFIG.lineDelay);
    }

    /*
       Add a blinking cursor after the final line.
    */

    const cursorLine = document.createElement("div");

    cursorLine.classList.add("terminal-line");

    const cursor = document.createElement("span");

    cursor.classList.add("terminal-cursor");

    cursor.textContent = "█";

    cursorLine.appendChild(cursor);

    terminal.appendChild(cursorLine);
}


/* =====================================================
   05 - MOBILE NAVIGATION

   Opens and closes the hamburger navigation.
===================================================== */

function initializeMobileNavigation() {

    const menuButton = document.querySelector(
        ".menu-toggle"
    );

    const navigation = document.querySelector(
        ".nav-links"
    );

    if (!menuButton || !navigation) {
        return;
    }

    function closeMenu() {

        navigation.classList.remove("active");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );
    }

    /*
       Toggle navigation on hamburger click.
    */

    menuButton.addEventListener("click", () => {

        const isOpen = navigation.classList.toggle(
            "active"
        );

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );
    });

    /*
       Close menu after selecting a navigation link.
    */

    navigation.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", closeMenu);

    });

    /*
       Close menu when Escape is pressed.
    */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });

    /*
       Close mobile navigation when returning
       to desktop screen width.
    */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 768) {
            closeMenu();
        }

    });
}


/* =====================================================
   06 - VAULT TERMINAL MESSAGE

   These messages appear when unlocking a section.

   This is a visual terminal simulation,
   not real encryption or authentication.
===================================================== */

function getVaultMessages(vaultName) {

    return [
        `$ access ${vaultName}`,
        "[*] Establishing secure session...",
        "[*] Verifying archive integrity...",
        "[*] Loading requested directory...",
        "[+] Access granted.",
        "[+] Archive unlocked successfully."
    ];
}


/* =====================================================
   07 - VAULT TERMINAL ANIMATION

   Displays simulated security terminal messages
   one line at a time.
===================================================== */

async function runVaultTerminal(
    terminal,
    vaultName
) {

    /*
       Reveal terminal output.
    */

    terminal.hidden = false;

    /*
       Clear previous messages.
    */

    terminal.textContent = "";

    const messages = getVaultMessages(vaultName);

    for (const message of messages) {

        await typeTerminalLine(
            terminal,
            message,
            CONFIG.vaultTypingSpeed
        );

        await sleep(CONFIG.vaultLineDelay);
    }
}


/* =====================================================
   08 - VAULT LOCK/UNLOCK ENGINE

   Only the following sections have vault functionality:

   - Passions
   - Writeups
   - Future Roadmap

   About, Portfolio, Certifications, and Contact
   remain visible at all times.
===================================================== */

function initializeVaultSystem() {

    const vaultButtons = document.querySelectorAll(
        "#passions .vault-toggle, " +
        "#writeups .vault-toggle, " +
        "#future .vault-toggle"
    );

    vaultButtons.forEach(button => {

        /*
           Read target elements from HTML data attributes.
        */

        const contentId = button.dataset.target;

        const terminalId = button.dataset.terminal;

        const vaultName = button.dataset.name || "archive/";

        const openLabel = button.dataset.open || "[ unlock ]";

        const closeLabel = button.dataset.close || "[ lock ]";

        const content = document.getElementById(contentId);

        const terminal = document.getElementById(terminalId);

        if (!content || !terminal) {
            return;
        }

        /*
           Ensure vault starts locked.
        */

        content.hidden = true;

        terminal.hidden = true;

        button.textContent = openLabel;

        button.setAttribute(
            "aria-expanded",
            "false"
        );

        /*
           Prevent repeated clicks while the
           unlocking animation is running.
        */

        let isBusy = false;

        button.addEventListener("click", async () => {

            if (isBusy) {
                return;
            }

            /*
               If the vault is already open,
               lock it immediately.
            */

            if (!content.hidden) {

                content.hidden = true;

                content.classList.remove("show");

                terminal.hidden = true;

                terminal.textContent = "";

                button.textContent = openLabel;

                button.setAttribute(
                    "aria-expanded",
                    "false"
                );

                return;
            }

            /*
               Begin unlocking sequence.
            */

            isBusy = true;

            button.disabled = true;

            button.setAttribute(
                "aria-busy",
                "true"
            );

            try {

                await runVaultTerminal(
                    terminal,
                    vaultName
                );

                /*
                   Reveal vault content after
                   terminal animation completes.
                */

                content.hidden = false;

                content.classList.add("show");

                button.textContent = closeLabel;

                button.setAttribute(
                    "aria-expanded",
                    "true"
                );

            } finally {

                isBusy = false;

                button.disabled = false;

                button.removeAttribute("aria-busy");

            }

        });

    });
}


/* =====================================================
   09 - SCROLL REVEAL ANIMATION

   Animates sections and cards when they enter
   the viewport.

   Vault content is not selected here because
   it has its own unlock animation.
===================================================== */

function initializeScrollReveal() {

    const revealElements = document.querySelectorAll(
        ".section, " +
        ".card, " +
        ".cert-card, " +
        ".terminal-window, " +
        ".profile-card"
    );

    /*
       If reduced motion is enabled, do not
       apply scroll-based animations.
    */

    if (prefersReducedMotion.matches) {

        revealElements.forEach(element => {
            element.classList.add("active");
        });

        return;
    }

    /*
       Fallback for older browsers.
    */

    if (!("IntersectionObserver" in window)) {

        revealElements.forEach(element => {
            element.classList.add("active");
        });

        return;
    }

    /*
       Apply reveal class before observation.
    */

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });

    const observer = new IntersectionObserver(
        (entries, observerInstance) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("active");

                observerInstance.unobserve(
                    entry.target
                );

            });

        },
        {
            threshold: 0.08,
            rootMargin: "0px 0px -30px 0px"
        }
    );

    revealElements.forEach(element => {
        observer.observe(element);
    });
}


/* =====================================================
   10 - SMOOTH NAVIGATION

   Allows navigation links to scroll smoothly
   to their corresponding sections.
===================================================== */

function initializeSmoothScrolling() {

    const internalLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    internalLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(
                targetId
            );

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: prefersReducedMotion.matches
                    ? "auto"
                    : "smooth",
                block: "start"
            });

            /*
               Preserve the destination in the URL.
            */

            if (window.history.replaceState) {

                window.history.replaceState(
                    null,
                    "",
                    targetId
                );

            }

        });

    });
}


/* =====================================================
   11 - INITIALIZE WEBSITE

   Runs after the HTML document is ready.
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeMobileNavigation();

    initializeVaultSystem();

    initializeScrollReveal();

    initializeSmoothScrolling();

    initializeHeroTerminal();

});
