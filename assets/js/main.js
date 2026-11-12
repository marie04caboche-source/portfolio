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


  // Assises: the sun follows the reading progress and progressively powers the solar panels.
  const energyPage = document.querySelector(".assises-world");
  if (energyPage && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const panels = [...energyPage.querySelectorAll(".solar-panel i")];
    const headings = [...energyPage.querySelectorAll(".detail-body h2")];
    let ticking = false;
    const updateEnergyScene = () => {
      const rect = energyPage.getBoundingClientRect();
      const scrollable = Math.max(1, energyPage.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      const x = 88 - Math.sin(progress * Math.PI) * 34;
      const y = 4 + progress * 91;
      energyPage.style.setProperty("--sun-x", x.toFixed(2) + "%");
      energyPage.style.setProperty("--sun-y", y.toFixed(2) + "%");
      const light = Math.max(0, Math.min(1, (progress - .48) / .34));
      energyPage.style.setProperty("--daylight", light.toFixed(2));
      const litCount = Math.round(light * panels.length);
      panels.forEach((panel,index) => panel.classList.toggle("is-lit", index < litCount));
      headings.forEach((heading,index) => heading.classList.toggle("is-lit", progress > Math.min(.95, .18 + index * .19)));
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) { window.requestAnimationFrame(updateEnergyScene); ticking = true; }
    };
    window.addEventListener("scroll", onScroll, {passive:true});
    window.addEventListener("resize", onScroll);
    updateEnergyScene();
  }


  // Explorations créatives: accessible coverflow gallery with keyboard, arrows and pointer depth.
  const creativeCarousel = document.querySelector("[data-creative-carousel]");
  if (creativeCarousel) {
    const slides = [...creativeCarousel.querySelectorAll(".creative-slide")];
    const counter = creativeCarousel.querySelector(".creative-counter b");
    const progress = creativeCarousel.querySelector(".creative-progress i");
    const prev = creativeCarousel.querySelector(".creative-arrow-prev");
    const next = creativeCarousel.querySelector(".creative-arrow-next");
    let active = 0;
    const renderGallery = () => {
      slides.forEach((slide, index) => {
        slide.classList.remove("is-active", "is-before", "is-after");
        slide.removeAttribute("aria-current");
        if (index === active) { slide.classList.add("is-active"); slide.setAttribute("aria-current", "true"); }
        else if (index === (active - 1 + slides.length) % slides.length) slide.classList.add("is-before");
        else if (index === (active + 1) % slides.length) slide.classList.add("is-after");
      });
      if (counter) counter.textContent = String(active + 1).padStart(2, "0");
      if (progress) progress.style.width = ((active + 1) / slides.length * 100) + "%";
    };
    const move = (direction) => { active = (active + direction + slides.length) % slides.length; renderGallery(); };
    prev?.addEventListener("click", () => move(-1));
    next?.addEventListener("click", () => move(1));
    creativeCarousel.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
      if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
    });
    const stage = creativeCarousel.querySelector(".creative-stage");
    if (stage && window.matchMedia("(hover: hover) and (pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      stage.addEventListener("pointermove", (event) => {
        const rect = stage.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        const art = stage.querySelector(".creative-slide.is-active .creative-art");
        if (art) art.style.transform = "perspective(1000px) rotateY(" + (x * 3) + "deg) rotateX(" + (y * -3) + "deg)";
      });
      stage.addEventListener("pointerleave", () => {
        const art = stage.querySelector(".creative-slide.is-active .creative-art");
        if (art) art.style.transform = "";
      });
    }
    renderGallery();
  }

})();
