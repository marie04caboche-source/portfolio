(() => {
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
})();
