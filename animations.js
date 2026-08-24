/* =========================================================
   SCROLL REVEAL ANIMATIONS
========================================================= */

const animatedElements = document.querySelectorAll(
    ".section-title, .section-subtitle, .about-text, .about-box, .project-card, .skill, .contact-content"
);

animatedElements.forEach((element) => {
    element.classList.add("animate");
});

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });
    },
    {
        threshold: 0.15
    }
);

animatedElements.forEach((element) => {
    observer.observe(element);
});


/* =========================================================
   BACKGROUND STAR FIELD
========================================================= */

const starContainer = document.querySelector(".stars");

/* =========================================================
   PARALLAX STAR FIELD
========================================================= */

const STAR_LAYERS = [
    {
        count: 70,
        speed: 0.08
    },
    {
        count: 40,
        speed: 0.18
    },
    {
        count: 20,
        speed: 0.35
    }
];

function createBackgroundStars() {

    STAR_LAYERS.forEach((layer) => {

        for (let i = 0; i < layer.count; i++) {

            const star = document.createElement("span");

            star.classList.add("background-star");

            const size =
                (Math.random() * 2 + 0.7).toFixed(2);

            const opacity =
                (Math.random() * 0.55 + 0.25).toFixed(2);

            const duration =
                (Math.random() * 4 + 3).toFixed(2) + "s";

            const delay =
                (Math.random() * 5).toFixed(2) + "s";

            star.style.setProperty("--size", `${size}px`);
            star.style.setProperty("--opacity", opacity);
            star.style.setProperty("--duration", duration);
            star.style.setProperty("--delay", delay);

            star.style.left =
                `${Math.random() * 100}%`;

            star.style.top =
                `${Math.random() * 100}%`;

            star.dataset.speed = layer.speed;

            starContainer.appendChild(star);
        }
    });
}

createBackgroundStars();
/* =========================================================
   STAR PARALLAX
========================================================= */

const parallaxStars =
    document.querySelectorAll(".background-star");

let targetScrollY = window.scrollY;
let currentScrollY = window.scrollY;

window.addEventListener("scroll", () => {

    targetScrollY = window.scrollY;

}, { passive: true });


function updateStarParallax() {

    currentScrollY +=
        (targetScrollY - currentScrollY) * 0.08;

    parallaxStars.forEach((star) => {

        const speed =
            parseFloat(star.dataset.speed);

        const offset =
            currentScrollY * speed;

        star.style.transform =
            `translateY(${offset}px)`;
    });

    requestAnimationFrame(updateStarParallax);
}

updateStarParallax();
/* =========================================================
   SHOOTING STARS
========================================================= */

const spaceBackground = document.querySelector(".space-background");

function createShootingStar() {

    const star = document.createElement("span");

    star.classList.add("shooting-star");

    const startX = Math.random() * 100;
    const startY = Math.random() * 70;

    const angle = 25 + Math.random() * 25;
    const distance = 100 + Math.random() * 40;

    const duration = 1.2 + Math.random() * 1.2;

    star.style.left = `${startX}%`;
    star.style.top = `${startY}%`;

    star.style.transform = `rotate(${angle}deg)`;

    spaceBackground.appendChild(star);

    requestAnimationFrame(() => {

        star.style.transition =
            `transform ${duration}s linear, opacity 0.25s ease`;

        star.style.opacity = "0.8";

        star.style.transform =
            `translate(${distance}vw, ${distance * 0.65}vh)
             rotate(${angle}deg)`;
    });

    setTimeout(() => {

        star.style.opacity = "0";

    }, duration * 1000 - 250);

    setTimeout(() => {

        star.remove();

    }, duration * 1000);
}


/* Create a shooting star every few seconds */

function scheduleShootingStar() {

    const delay = 3000 + Math.random() * 7000;

    setTimeout(() => {

        createShootingStar();

        scheduleShootingStar();

    }, delay);
}

scheduleShootingStar();
// ==============================
// STAR PARALLAX
// ==============================

window.addEventListener("scroll", () => {

    if (!spaceBackground) return;

    const scrollY = window.scrollY;

    spaceBackground.style.transform =
        `translateY(${scrollY * 0.08}px)`;

});