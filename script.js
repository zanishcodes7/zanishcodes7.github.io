// 1. Theme Switcher (Dark / Light)
const themeBtn = document.getElementById("theme-toggle");
const htmlEl = document.documentElement;

themeBtn.addEventListener("click", () => {
  const current = htmlEl.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  htmlEl.setAttribute("data-theme", next);
  themeBtn.textContent = next === "dark" ? "☀️" : "🌙";
});

// Trigger Curtain Reveal on Page Load
window.addEventListener("load", () => {
  setTimeout(() => {
    document.querySelector(".hero").classList.add("revealed");
  }, 200);
});

// 2. Dynamic Role Cycling
const roles = [
  "Data Scientist",
  "Python Backend Engineer",
  "ML & NLP Developer",
  "PostgreSQL & ERP Architect"
];
let roleIndex = 0;
const roleText = document.getElementById("role-text");

setInterval(() => {
  roleIndex = (roleIndex + 1) % roles.length;
  roleText.style.opacity = 0;
  setTimeout(() => {
    roleText.textContent = roles[roleIndex];
    roleText.style.opacity = 1;
  }, 200);
}, 3000);

// 3. Project Details Data for Interactive Doors
const projectData = {
  nlp: {
    tag: "NLP & Inference Pipeline",
    title: "3-Tier Hybrid Text Classification Engine",
    desc: "A low-latency production text classification pipeline engineered to optimize inference speed and compute cost by cascading requests across deterministic rules, classical ML, and LLM fallbacks.",
    stack: ["Python", "Flask", "Scikit-Learn", "TF-IDF", "Regex", "pytest"],
    bullets: [
      "Tier 1 deterministic Regex routing resolves common intents in under 2ms.",
      "Tier 2 Statistical ML (TF-IDF) handles nuanced classification without API overhead.",
      "Tier 3 LLM fallback processes complex edge cases while updating real-time telemetry counters (Total, Praises, Complaints, Questions)."
    ],
    github: "https://github.com/zanishcodes7/Text-Classification-Engine"
  },
  nasa: {
    tag: "ETL & Hypothesis Testing",
    title: "NASA Asteroid Hazard Statistical Analysis",
    desc: "An automated ETL and statistical inference system ingesting live near-Earth object telemetry from NASA REST APIs to evaluate physical variance across hazardous asteroids.",
    stack: ["Python", "pandas", "SciPy", "Flask", "Chart.js"],
    bullets: [
      "Normalized nested JSON payloads from live NASA telemetry endpoints into clean relational tables.",
      "Executed two-sample Welch's t-tests in SciPy to measure diameter variance between hazardous and non-hazardous objects.",
      "Rendered statistical findings inside an interactive Chart.js analytics dashboard."
    ],
    github: "https://github.com/zanishcodes7/nasa-asteroid-hazard-analysis"
  },
  recommender: {
    tag: "Vectorization & Similarity Search",
    title: "Content-Based Movie Recommender System",
    desc: "A high-speed similarity search engine built over the 5,000-title TMDB dataset utilizing TF-IDF feature vectorization and cosine similarity matrices.",
    stack: ["Python", "Scikit-Learn", "pandas", "NumPy", "Flask"],
    bullets: [
      "Engineered multi-feature metadata embeddings across genres, keywords, cast, and plot overviews.",
      "Computed sparse cosine similarity matrices for instant top-N retrieval.",
      "Deployed a low-latency Flask search API with live autocomplete and similarity confidence scores."
    ],
    github: "https://github.com/zanishcodes7/movie-recommender-tfidf"
  },
  erp: {
    tag: "Production Database & ERP Engineering",
    title: "Enterprise Odoo & PostgreSQL Systems",
    desc: "Production software engineering work designing relational database schemas, automated financial/operational wizards, and structured analytical reports.",
    stack: ["Python", "PostgreSQL", "Odoo ORM", "SQL", "QWeb"],
    bullets: [
      "Customized relational PostgreSQL models for sales, project operations, and financial reporting.",
      "Built automated data-conversion wizards and computed business logic fields with strict validation.",
      "Authored structured QWeb/PDF analytical reports directly with business stakeholders."
    ],
    github: "https://github.com/zanishcodes7"
  }
};

const modal = document.getElementById("project-modal");
const closeModalBtn = document.getElementById("close-modal");

document.querySelectorAll(".door-wrapper").forEach((door) => {
  door.addEventListener("click", () => {
    const key = door.getAttribute("data-project");
    const data = projectData[key];
    if (!data) return;

    document.getElementById("modal-tag").textContent = data.tag;
    document.getElementById("modal-title").textContent = data.title;
    document.getElementById("modal-desc").textContent = data.desc;
    document.getElementById("modal-github").href = data.github;

    const stackEl = document.getElementById("modal-stack");
    stackEl.innerHTML = data.stack.map((tech) => `<span>${tech}</span>`).join("");

    const bulletsEl = document.getElementById("modal-bullets");
    bulletsEl.innerHTML = data.bullets.map((b) => `<li>${b}</li>`).join("");

    modal.classList.remove("hidden");
  });
});

closeModalBtn.addEventListener("click", () => modal.classList.add("hidden"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.add("hidden");
});

// 4. Sticky Timeline Year Updater on Scroll
const timelineCards = document.querySelectorAll(".timeline-card");
const activeYearEl = document.getElementById("active-year");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeYearEl.textContent = entry.target.getAttribute("data-year");
      }
    });
  },
  { threshold: 0.6 }
);

timelineCards.forEach((card) => observer.observe(card));