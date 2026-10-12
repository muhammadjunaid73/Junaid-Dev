// ================================
// Hero Title — Character by Character Animation
// ================================

(function () {
    const heroTitle = document.querySelector("[data-animate-chars]");
    if (!heroTitle) return;

    const accentWord = heroTitle.dataset.accentWord || "";
    const words = heroTitle.textContent.trim().split(/\s+/);

    heroTitle.textContent = "";
    let charIndex = 0;

    words.forEach((word, wordIndex) => {
        const wordSpan = document.createElement("span");
        wordSpan.className = "hero__word" + (word === accentWord ? " hero__word--accent" : "");

        word.split("").forEach((ch) => {
            const chSpan = document.createElement("span");
            chSpan.className = "hero__char";
            chSpan.textContent = ch;
            chSpan.style.animationDelay = (charIndex * 0.055) + "s";
            wordSpan.appendChild(chSpan);
            charIndex++;
        });

        heroTitle.appendChild(wordSpan);

        if (wordIndex < words.length - 1) {
            heroTitle.appendChild(document.createTextNode(" "));
            charIndex++;
        }
    });
})();

// ================================
// Mobile Menu
// ================================

const menuToggle = document.querySelector(".navbar__toggle");
const menu = document.querySelector(".navbar__menu");

function closeMenu() {
    menu.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
}

function openMenu() {
    menu.classList.add("is-open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");
}

menuToggle.addEventListener("click", () => {
    menu.classList.contains("is-open") ? closeMenu() : openMenu();
});

// Nav link par click karne se menu band ho
const navLinks = document.querySelectorAll(".navbar__link");
navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
});

// Menu ke bahar (hero, about, koi bhi section) click karne se band ho
document.addEventListener("click", (event) => {
    const clickedInsideMenu = menu.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle && menu.classList.contains("is-open")) {
        closeMenu();
    }
});

// Escape key se bhi band ho (accessibility)
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("is-open")) {
        closeMenu();
        menuToggle.focus();
    }
});

// ================================
// Dark Mode / Light Mode
// ================================

const themeToggle = document.querySelector(".theme-toggle");
const root = document.documentElement;

function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    themeToggle.setAttribute("aria-pressed", theme === "dark");
    try { localStorage.setItem("theme", theme); } catch { }
}

// Page load par button ki state theme se sync karo

themeToggle.setAttribute("aria-pressed", root.getAttribute("data-theme") === "dark");

themeToggle.addEventListener("click", () => {
    const isDark = root.getAttribute("data-theme") === "dark";
    setTheme(isDark ? "light" : "dark");
});


// Contact Form Validation
const contactForm = document.querySelector("#contact-form");
contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.querySelector("#name");
    const email = document.querySelector("#email");
    const message = document.querySelector("#message");

    const nameError = document.querySelector("#name-error");
    const emailError = document.querySelector("#email-error");
    const messageError = document.querySelector("#message-error");
    const formSuccess = document.querySelector("#form-success");

    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    formSuccess.textContent = "";

    let isValid = true;

    if (name.value.trim() === "") {
        nameError.textContent = "Please enter your name.";
        isValid = false;
    }

    if (email.value.trim() === "") {
        emailError.textContent = "Please enter your email.";
        isValid = false;
    } else if (!email.validity.valid) {
        emailError.textContent = "Please enter a valid email.";
        isValid = false;
    }

    if (message.value.trim() === "") {
        messageError.textContent = "Please enter your message.";
        isValid = false;
    }

    if (!isValid) return;

    const submitBtn = contactForm.querySelector(".contact__button");
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    try {
        const response = await fetch(contactForm.action, {
            method: "POST",
            body: new FormData(contactForm),
            headers: { Accept: "application/json" },
        });

        if (response.ok) {
            formSuccess.textContent = "Thanks! Your message has been sent.";
            contactForm.reset();
        } else {
            formSuccess.textContent = "Something went wrong. Please try again or email me directly.";
        }
    } catch (error) {
        formSuccess.textContent = "Network error. Please try again or email me directly.";
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
    }
});

const sections = document.querySelectorAll("main section[id]");
const links = document.querySelectorAll(".navbar__link");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) =>
            link.classList.toggle(
                "navbar__link--active",
                link.getAttribute("href") === `#${entry.target.id}`
            )
        );
    });
}, { rootMargin: "-40% 0px -55% 0px" });

sections.forEach((section) => observer.observe(section));

// ================================
// Scroll To Top
// ================================

const scrollTopBtn = document.querySelector(".scroll-top");

function toggleScrollTop() {
    scrollTopBtn.classList.toggle("is-visible", window.scrollY > 400);
}

window.addEventListener("scroll", toggleScrollTop, { passive: true });
toggleScrollTop(); // refresh ke baad bhi sahi state

scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0 });
});






