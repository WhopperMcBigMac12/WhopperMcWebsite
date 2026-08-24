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

        const element = entry.target;

        const siblings = Array.from(
          element.parentElement.children
        ).filter((child) =>
          child.classList.contains("animate")
        );

        const index = siblings.indexOf(element);

        const staggerDelay = element.classList.contains("project-card")
          ? index * 0.08
          : index * 0.12;

        element.style.setProperty(
          "--animation-delay",
          `${staggerDelay}s`
        );

        element.classList.add("visible");

        observer.unobserve(element);
      }

    });

  }, {
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

const STAR_LAYERS = [{
    count: 90,
    speed: 0.04,
    minSize: 0.5,
    maxSize: 1.2,
    minOpacity: 0.2,
    maxOpacity: 0.5
  },
  {
    count: 55,
    speed: 0.10,
    minSize: 0.8,
    maxSize: 1.8,
    minOpacity: 0.3,
    maxOpacity: 0.7
  },
  {
    count: 25,
    speed: 0.18,
    minSize: 1.2,
    maxSize: 2.8,
    minOpacity: 0.5,
    maxOpacity: 1
  }
];

function createBackgroundStars() {

  STAR_LAYERS.forEach((layer) => {

    for (let i = 0; i < layer.count; i++) {

      const star = document.createElement("span");

      star.classList.add("background-star");
      if (Math.random() < 0.08) {
        star.classList.add("bright-star");
      }
      const size =
        (
          Math.random()
          * (layer.maxSize - layer.minSize)
          + layer.minSize
        ).toFixed(2);

      const opacity =
        (
          Math.random()
          * (layer.maxOpacity - layer.minOpacity)
          + layer.minOpacity
        ).toFixed(2);

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
      star.dataset.depth = (layer.speed * 1.5).toFixed(2);
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

}, {
  passive: true
});


function updateStarParallax() {

  currentScrollY +=
    (targetScrollY - currentScrollY) * 0.08;

  parallaxStars.forEach((star) => {

    const speed =
      parseFloat(star.dataset.speed);

    const offset =
      currentScrollY * speed;

    /*
     * Keep the movement inside a small range.
     * This prevents stars from drifting endlessly
     * down the page.
     */
    const wrappedOffset =
      ((offset % 300) + 300) % 300 - 150;

    star.style.setProperty(
    "--scroll-y",
    `${wrappedOffset}px`
);
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
// MOUSE GLOW
// ==============================

const mouseGlow = document.querySelector(".mouse-glow");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let glowX = mouseX;
let glowY = mouseY;

window.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

function animateMouseGlow() {

  glowX += (mouseX - glowX) * 0.12;
  glowY += (mouseY - glowY) * 0.12;

  if (mouseGlow) {

    mouseGlow.style.left = `${glowX}px`;
    mouseGlow.style.top = `${glowY}px`;
  }

  requestAnimationFrame(animateMouseGlow);
}

animateMouseGlow();
/* =========================================================
   MOUSE STAR PARALLAX
========================================================= */

const mouseParallaxStars =
    document.querySelectorAll(".background-star");

let targetMouseX = 0;
let targetMouseY = 0;

let currentMouseX = 0;
let currentMouseY = 0;

window.addEventListener("mousemove", (event) => {

    targetMouseX =
        (event.clientX / window.innerWidth - 0.5) * 2;

    targetMouseY =
        (event.clientY / window.innerHeight - 0.5) * 2;

});


function animateStarMouseParallax() {

    currentMouseX +=
        (targetMouseX - currentMouseX) * 0.04;

    currentMouseY +=
        (targetMouseY - currentMouseY) * 0.04;


    mouseParallaxStars.forEach((star) => {

        const speed =
            parseFloat(star.dataset.speed);

        const depth =
			parseFloat(star.dataset.depth);

		const mouseStrength =
			depth * 18;

        const x =
            currentMouseX * mouseStrength;

        const y =
            currentMouseY * mouseStrength;

        star.style.setProperty(
            "--mouse-x",
            `${x}px`
        );

        star.style.setProperty(
            "--mouse-y",
            `${y}px`
        );

    });


    requestAnimationFrame(
        animateStarMouseParallax
    );
}

animateStarMouseParallax();

/* =========================================================
   PROJECT CARD TILT + CURSOR GLOW
========================================================= */

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (!prefersReducedMotion && window.matchMedia("(hover: hover)").matches) {
  document.querySelectorAll(".project-card").forEach((card) => {
    let animationFrame;
    let pointerX = 0;
    let pointerY = 0;

    const updateCard = () => {
      const rect = card.getBoundingClientRect();
      const x = (pointerX - rect.left) / rect.width;
      const y = (pointerY - rect.top) / rect.height;
      const tilt = 4;

      card.style.setProperty("--card-tilt-x", `${(0.5 - y) * tilt}deg`);
      card.style.setProperty("--card-tilt-y", `${(x - 0.5) * tilt}deg`);
      card.style.setProperty("--glow-x", `${x * 100}%`);
      card.style.setProperty("--glow-y", `${y * 100}%`);
      animationFrame = undefined;
    };

    card.addEventListener("pointerenter", (event) => {
      if (event.pointerType !== "mouse") return;

      card.classList.add("is-tilting");
    });

    card.addEventListener("pointermove", (event) => {
      if (event.pointerType !== "mouse") return;

      pointerX = event.clientX;
      pointerY = event.clientY;

      if (!animationFrame) {
        animationFrame = requestAnimationFrame(updateCard);
      }
    });

    card.addEventListener("pointerleave", () => {
      card.classList.remove("is-tilting");
      card.style.setProperty("--card-tilt-x", "0deg");
      card.style.setProperty("--card-tilt-y", "0deg");
    });
  });
}

/* =========================================================
   HERO PARALLAX + LOGO PARTICLES
========================================================= */

const heroContent = document.querySelector(".hero-content");
const heroLogoMotion = document.querySelector(".hero-logo-motion");
const logoParticles = document.querySelector(".logo-particles");
const supportsHeroParallax = window.matchMedia(
  "(hover: hover) and (min-width: 801px)"
).matches;

if (!prefersReducedMotion && logoParticles) {
  const particleCount = 11;

  for (let index = 0; index < particleCount; index += 1) {
    const particle = document.createElement("span");
    const size = (Math.random() * 2 + 1.5).toFixed(1);
    const duration = (Math.random() * 3 + 3.5).toFixed(2);

    particle.className = "logo-particle";
    particle.style.setProperty("--particle-size", `${size}px`);
    particle.style.setProperty("--particle-x", `${(Math.random() * 88 + 6).toFixed(1)}%`);
    particle.style.setProperty("--particle-y", `${(Math.random() * 82 + 8).toFixed(1)}%`);
    particle.style.setProperty("--particle-duration", `${duration}s`);
    particle.style.setProperty("--particle-delay", `-${(Math.random() * 4).toFixed(2)}s`);

    logoParticles.appendChild(particle);
  }
}

if (!prefersReducedMotion && supportsHeroParallax && heroContent && heroLogoMotion) {
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  window.addEventListener("mousemove", (event) => {
    targetX = event.clientX / window.innerWidth - 0.5;
    targetY = event.clientY / window.innerHeight - 0.5;
  }, { passive: true });

  const updateHeroParallax = () => {
    currentX += (targetX - currentX) * 0.06;
    currentY += (targetY - currentY) * 0.06;

    heroContent.style.transform = `translate3d(${-currentX * 12}px, ${-currentY * 12}px, 0)`;
    heroLogoMotion.style.transform = `translate3d(${currentX * 20}px, ${currentY * 20}px, 0)`;

    requestAnimationFrame(updateHeroParallax);
  };

  updateHeroParallax();
}
