var typed = new Typed(".typed-text", {
  strings: ["BCA Student", "Full-stack Developer", "UI Designer", "Programmer"],
  typeSpeed: 80,
  backSpeed: 50,
  backDelay: 1500,
  loop: true,
});

/* ===== PARTICLE SYSTEM ===== */
(function () {
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");
  let W = window.innerWidth,
    H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;

  window.addEventListener("resize", () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });

  const PARTICLE_COUNT = 80;
  const particles = [];

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.r = Math.random() * 1.5 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.alpha = Math.random() * 0.5 + 0.1;
      this.pulse = Math.random() * Math.PI * 2;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.pulse += 0.02;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 238, 255, ${this.alpha + Math.sin(this.pulse) * 0.1})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

  // Draw connecting lines
  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 238, 255, ${(1 - dist / 120) * 0.08})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    drawLines();
    requestAnimationFrame(loop);
  }
  loop();
})();

/* ===== HEADER SCROLL ===== */
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 50);
  updateActiveNav();
});

/* ===== HAMBURGER ===== */
const hamburger = document.getElementById("hamburger");
const navbar = document.querySelector(".navbar");
hamburger.addEventListener("click", () => {
  navbar.classList.toggle("open");
});
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => navbar.classList.remove("open"));
});

/* ===== ACTIVE NAV ON SCROLL ===== */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveNav() {
  const scrollY = window.scrollY;
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionH = section.offsetHeight;
    const id = section.getAttribute("id");
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionH) {
      navLinks.forEach((l) => l.classList.remove("active"));
      const active = document.querySelector(`.nav-link[data-section="${id}"]`);
      if (active) active.classList.add("active");
    }
  });
}

/* ===== SCROLL REVEAL ===== */
const revealEls = document.querySelectorAll(
  ".about-grid, .skills-wrapper, .portfolio-card, .contact-wrapper, .section-header, .service-card, .stat",
);
revealEls.forEach((el) => el.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), i * 80);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);

revealEls.forEach((el) => observer.observe(el));

/* ===== ANIMATED SKILL BARS ===== */
const skillBars = document.querySelectorAll(".progress-fill");
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 },
);
skillBars.forEach((bar) => skillObserver.observe(bar));

/* ===== PORTFOLIO FILTER ===== */
const filterBtns = document.querySelectorAll(".filter-btn");
const portfolioCards = document.querySelectorAll(".portfolio-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    portfolioCards.forEach((card) => {
      const cat = card.dataset.cat;
      if (filter === "all" || cat === filter) {
        card.classList.remove("hidden");
        card.style.animation = "fadeUp 0.4s ease forwards";
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

/* ===== CONTACT FORM ===== */
const form = document.getElementById("contactForm");
const successMsg = document.getElementById("formSuccess");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector(".submit-btn span");
    btn.textContent = "Sending...";
    setTimeout(() => {
      btn.textContent = "Send Message";
      successMsg.classList.add("show");
      form.reset();
      setTimeout(() => successMsg.classList.remove("show"), 4000);
    }, 1200);
  });
}

/* ===== SMOOTH SCROLL for anchor links ===== */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
