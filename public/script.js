new Typed(".typed-text", {
  strings: [
    "Full-Stack Developer",
    "UI Designer",
    "Open-Source Contributor",
    "BCA Student",
    "Problem Solver",
  ],
  typeSpeed: 75,
  backSpeed: 45,
  backDelay: 1800,
  loop: true,
});

(function () {
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");
  let W = (canvas.width = window.innerWidth);
  let H = (canvas.height = window.innerHeight);
  window.addEventListener("resize", () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });
  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.r = Math.random() * 1.2 + 0.2;
      this.vx = (Math.random() - 0.5) * 0.22;
      this.vy = (Math.random() - 0.5) * 0.22;
      this.a = Math.random() * 0.25 + 0.04;
      this.pulse = Math.random() * Math.PI * 2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.pulse += 0.015;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245,200,66,${this.a + Math.sin(this.pulse) * 0.07})`;
      ctx.fill();
    }
  }
  const particles = Array.from({ length: 55 }, () => new Particle());
  function drawLines() {
    for (let i = 0; i < particles.length; i++)
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x,
          dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 125) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(245,200,66,${(1 - d / 125) * 0.05})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
  }
  (function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    drawLines();
    requestAnimationFrame(loop);
  })();
})();

const header = document.getElementById("header");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");
function updateNav() {
  const sy = window.scrollY;
  header.classList.toggle("scrolled", sy > 50);
  sections.forEach((s) => {
    const top = s.offsetTop - 110;
    if (sy >= top && sy < top + s.offsetHeight) {
      navLinks.forEach((l) => l.classList.remove("active"));
      const a = document.querySelector(`.nav-link[data-section="${s.id}"]`);
      if (a) a.classList.add("active");
    }
  });
}
window.addEventListener("scroll", updateNav);

const hamburger = document.getElementById("hamburger");
const navbar = document.querySelector(".navbar");
hamburger.addEventListener("click", () => navbar.classList.toggle("open"));
navLinks.forEach((l) =>
  l.addEventListener("click", () => navbar.classList.remove("open")),
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), i * 70);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08 },
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    document
      .querySelectorAll(".portfolio-card")
      .forEach((card) =>
        card.classList.toggle(
          "hidden",
          filter !== "all" && card.dataset.cat !== filter,
        ),
      );
  });
});

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
      setTimeout(() => successMsg.classList.remove("show"), 5000);
    }, 1200);
  });
}

document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", function (e) {
    const t = document.querySelector(this.getAttribute("href"));
    if (t) {
      e.preventDefault();
      t.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
