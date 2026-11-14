// =====================================================
// 1. THEME + PALETTE
// Theme: light / dark. Palette: navy-pink, cream-coral, forest-sand.
// Both are saved in localStorage so they persist between visits.
// =====================================================
const htmlEl = document.documentElement;
const themeBtn = document.getElementById("theme-toggle");
const paletteButtons = document.querySelectorAll("[data-p]");

function applyTheme(theme) {
  htmlEl.setAttribute("data-theme", theme);
  if (themeBtn) themeBtn.textContent = theme === "dark" ? "☀️" : "🌙";
  localStorage.setItem("theme", theme);
}

function applyPalette(palette) {
  htmlEl.setAttribute("data-palette", palette);
  localStorage.setItem("palette", palette);
  paletteButtons.forEach((b) =>
    b.setAttribute("aria-pressed", String(b.dataset.p === palette))
  );
}

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const next = htmlEl.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
  });
}

paletteButtons.forEach((b) =>
  b.addEventListener("click", () => applyPalette(b.dataset.p))
);

applyTheme(localStorage.getItem("theme") || "light");
applyPalette(localStorage.getItem("palette") || "navy-pink");

// =====================================================
// 2. SPLIT-FLAP ROLE SWITCHER (auto + click to flip)
// =====================================================
const roles = [
  "Data Scientist",
  "Python Backend Engineer",
  "ML & NLP Developer",
  "PostgreSQL & ERP Architect"
];
let roleIndex = 0;
const roleCard = document.getElementById("role-card");
const roleText = document.getElementById("role-text");
const flapTrigger = document.getElementById("flap-trigger");

function flipRole() {
  if (!roleCard || !roleText) return;
  roleCard.classList.add("flipping");
  setTimeout(() => {
    roleIndex = (roleIndex + 1) % roles.length;
    roleText.textContent = roles[roleIndex];
    roleCard.classList.remove("flipping");
  }, 260);
}

let autoFlip = setInterval(flipRole, 2800);

if (flapTrigger) {
  flapTrigger.addEventListener("click", () => {
    clearInterval(autoFlip);
    flipRole();
    autoFlip = setInterval(flipRole, 2800);
  });
}

// =====================================================
// 3. PROJECT DATA + MODAL
// =====================================================
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
    github: "https://github.com/zanishcodes7/Text-Classifier-Engine"
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

function openModal(key) {
  const data = projectData[key];
  if (!data || !modal) return;

  document.getElementById("modal-tag").textContent = data.tag;
  document.getElementById("modal-title").textContent = data.title;
  document.getElementById("modal-desc").textContent = data.desc;
  document.getElementById("modal-github").href = data.github;
  document.getElementById("modal-stack").innerHTML =
    data.stack.map((tech) => `<span>${tech}</span>`).join("");
  document.getElementById("modal-bullets").innerHTML =
    data.bullets.map((b) => `<li>${b}</li>`).join("");

  modal.classList.remove("hidden");
}

document.querySelectorAll(".door-wrapper").forEach((door) => {
  door.addEventListener("click", () => openModal(door.getAttribute("data-project")));
});

if (closeModalBtn) {
  closeModalBtn.addEventListener("click", () => modal.classList.add("hidden"));
}
if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
  });
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal) modal.classList.add("hidden");
});

// =====================================================
// 4. STICKY TIMELINE YEAR UPDATER ON SCROLL
// =====================================================
const timelineCards = document.querySelectorAll(".timeline-card");
const activeYearEl = document.getElementById("active-year");

if (activeYearEl && timelineCards.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeYearEl.textContent = entry.target.getAttribute("data-year");
        }
      });
    },
    { threshold: 0.55 }
  );
  timelineCards.forEach((card) => observer.observe(card));
}