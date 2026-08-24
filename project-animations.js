/* =========================================================
   PROJECT PAGE REVEALS
========================================================= */

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const revealElements = document.querySelectorAll(
  ".content-grid > div:first-child, .sidebar, .screenshots > h2, .screenshot, .video"
);

revealElements.forEach((element) => {
  element.classList.add("reveal");
});

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const element = entry.target;
      const siblings = Array.from(element.parentElement.children)
        .filter((child) => child.classList.contains("reveal"));
      const index = Math.max(siblings.indexOf(element), 0);

      element.style.setProperty("--reveal-delay", `${index * 0.08}s`);
      element.classList.add("visible");
      observer.unobserve(element);
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

/* =========================================================
   PROJECT SPACE BACKGROUND
========================================================= */

const starContainer = document.querySelector(".stars");
const spaceBackground = document.querySelector(".space-background");
const mouseGlow = document.querySelector(".mouse-glow");

if (starContainer && !prefersReducedMotion) {
  const layers = [
    { count: 55, speed: 0.04, minSize: 0.5, maxSize: 1.2, minOpacity: 0.2, maxOpacity: 0.5 },
    { count: 30, speed: 0.1, minSize: 0.8, maxSize: 1.8, minOpacity: 0.3, maxOpacity: 0.7 },
    { count: 14, speed: 0.18, minSize: 1.2, maxSize: 2.5, minOpacity: 0.5, maxOpacity: 0.9 }
  ];

  layers.forEach((layer) => {
    for (let index = 0; index < layer.count; index += 1) {
      const star = document.createElement("span");
      const size = Math.random() * (layer.maxSize - layer.minSize) + layer.minSize;
      const opacity = Math.random() * (layer.maxOpacity - layer.minOpacity) + layer.minOpacity;

      star.className = "background-star";
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.setProperty("--size", `${size.toFixed(2)}px`);
      star.style.setProperty("--opacity", opacity.toFixed(2));
      star.style.setProperty("--duration", `${(Math.random() * 4 + 3).toFixed(2)}s`);
      star.style.setProperty("--delay", `-${(Math.random() * 5).toFixed(2)}s`);
      star.dataset.speed = layer.speed;
      starContainer.appendChild(star);
    }
  });

  const stars = starContainer.querySelectorAll(".background-star");
  let targetScrollY = window.scrollY;
  let currentScrollY = window.scrollY;
  let targetMouseX = 0;
  let targetMouseY = 0;
  let currentMouseX = 0;
  let currentMouseY = 0;

  window.addEventListener("scroll", () => {
    targetScrollY = window.scrollY;
  }, { passive: true });

  if (window.matchMedia("(hover: hover)").matches) {
    window.addEventListener("mousemove", (event) => {
      targetMouseX = event.clientX / window.innerWidth - 0.5;
      targetMouseY = event.clientY / window.innerHeight - 0.5;
    }, { passive: true });
  }

  const updateStars = () => {
    currentScrollY += (targetScrollY - currentScrollY) * 0.08;
    currentMouseX += (targetMouseX - currentMouseX) * 0.04;
    currentMouseY += (targetMouseY - currentMouseY) * 0.04;

    stars.forEach((star) => {
      const offset = currentScrollY * Number(star.dataset.speed);
      const wrappedOffset = ((offset % 300) + 300) % 300 - 150;
      const mouseStrength = Number(star.dataset.speed) * 24;

      star.style.setProperty("--scroll-y", `${wrappedOffset}px`);
      star.style.setProperty("--mouse-x", `${currentMouseX * mouseStrength}px`);
      star.style.setProperty("--mouse-y", `${currentMouseY * mouseStrength}px`);
    });

    requestAnimationFrame(updateStars);
  };

  updateStars();
}

if (mouseGlow && !prefersReducedMotion && window.matchMedia("(hover: hover)").matches) {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let glowX = mouseX;
  let glowY = mouseY;

  window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  }, { passive: true });

  const updateGlow = () => {
    glowX += (mouseX - glowX) * 0.12;
    glowY += (mouseY - glowY) * 0.12;
    mouseGlow.style.left = `${glowX}px`;
    mouseGlow.style.top = `${glowY}px`;
    requestAnimationFrame(updateGlow);
  };

  updateGlow();
}

if (spaceBackground && !prefersReducedMotion) {
  const createShootingStar = () => {
    const star = document.createElement("span");
    const startX = Math.random() * 100;
    const startY = Math.random() * 65;
    const angle = 25 + Math.random() * 25;
    const distance = 90 + Math.random() * 45;
    const duration = 1.2 + Math.random() * 1.1;

    star.className = "project-shooting-star";
    star.style.left = `${startX}%`;
    star.style.top = `${startY}%`;
    star.style.setProperty("--shooting-duration", `${duration}s`);
    star.style.transform = `rotate(${angle}deg)`;
    spaceBackground.appendChild(star);

    requestAnimationFrame(() => {
      star.style.opacity = "0.8";
      star.style.transform = `rotate(${angle}deg) translateX(${distance}vw)`;
    });

    window.setTimeout(() => {
      star.style.opacity = "0";
    }, duration * 1000 - 250);

    window.setTimeout(() => star.remove(), duration * 1000);
  };

  const scheduleShootingStar = () => {
    window.setTimeout(() => {
      createShootingStar();
      scheduleShootingStar();
    }, 5000 + Math.random() * 7000);
  };

  scheduleShootingStar();
}

/* =========================================================
   SCREENSHOT LIGHTBOX
========================================================= */

const screenshots = document.querySelectorAll("main img");

if (screenshots.length) {
  const lightbox = document.createElement("div");
  const lightboxImage = document.createElement("img");
  const closeButton = document.createElement("button");
  let activeTrigger;
  let previousOverflow = "";

  lightbox.className = "screenshot-lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-label", "Expanded screenshot");
  closeButton.className = "screenshot-lightbox__close";
  closeButton.type = "button";
  closeButton.textContent = "Close";
  lightbox.append(lightboxImage, closeButton);
  document.body.appendChild(lightbox);

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = previousOverflow;
    activeTrigger?.focus();
  };

  const openLightbox = (image, trigger) => {
    activeTrigger = trigger;
    previousOverflow = document.body.style.overflow;
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt;
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
    closeButton.focus();
  };

  screenshots.forEach((image) => {
    const trigger = image.closest(".screenshot, .hero-image") || image;
    trigger.classList.add("image-lightbox-trigger");
    trigger.setAttribute("role", "button");
    trigger.setAttribute("tabindex", "0");
    trigger.setAttribute("aria-label", `Expand ${image.alt || "screenshot"}`);

    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      openLightbox(image, trigger);
    });
    trigger.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(image, trigger);
      }
    });
  });

  closeButton.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
}
