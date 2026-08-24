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

        element.style.setProperty(
          "--animation-delay",
          `${index * 0.12}s`
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

    star.style.transform =
      `translateY(${wrappedOffset}px)`;
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
