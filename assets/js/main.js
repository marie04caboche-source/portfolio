(() => {
  // The Assises page reveals its editorial elements as the visitor enters each chapter.
  document.querySelectorAll(".assises-entry-grid, .assises-data-line, .assises-role-intro, .assises-content h2, .assises-content h3, .assises-content p, .assises-content li, .assises-outro-mark, .assises-outro-kicker, .assises-outro h2, .assises-outro > p, .assises-outro-bottom").forEach((item) => item.classList.add("reveal"));
  const items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach((item) => observer.observe(item));
  } else {
    items.forEach((item) => item.classList.add("is-visible"));
  }

  // Draw the tattoo paths progressively on hover/focus.
  document.querySelectorAll(".tattoo-art .tattoo-svg path, .tattoo-art .tattoo-svg circle").forEach((path, index) => {
    try {
      const length = path.getTotalLength();
      path.style.setProperty("--path-length", length);
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
      path.style.transitionDelay = ((index % 9) * 0.035) + "s";
    } catch (e) {}
  });
  document.querySelectorAll(".tattoo-art").forEach((art) => {
    art.addEventListener("pointerenter", () => art.classList.add("is-lit"));
    art.addEventListener("pointerleave", () => art.classList.remove("is-lit"));
    art.addEventListener("focus", () => art.classList.add("is-lit"));
    art.addEventListener("blur", () => art.classList.remove("is-lit"));
  });
  if (window.matchMedia("(hover: none)").matches && "IntersectionObserver" in window) {
    const tattooObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-lit");
          tattooObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    document.querySelectorAll(".tattoo-art").forEach((art) => tattooObserver.observe(art));
  }

  // Assises universe: subtle image depth on pointer devices, disabled on touch/reduced motion.
  const assisesHero = document.querySelector(".assises-hero");
  const assisesImage = document.querySelector(".assises-hero-image");
  if (assisesHero && assisesImage && window.matchMedia("(hover: hover) and (pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    assisesHero.addEventListener("pointermove", (event) => {
      const rect = assisesHero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      assisesImage.style.transform = "scale(1.07) translate(" + (x * -12) + "px," + (y * -9) + "px)";
    });
    assisesHero.addEventListener("pointerleave", () => {
      assisesImage.style.transform = "scale(1.035)";
    });
  }

})();
