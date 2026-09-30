import { h, anchor } from "./dom.js";
import { Profile, PlainSkills, Experience } from "./data.js";
import { projects } from "./projects.js";

function jobCard(job) {
  return h(
    "article",
    { class: "land-card" },
    h(
      "div",
      { class: "land-card-head" },
      h("h3", null, job.company),
      h("span", { class: "land-period" }, job.period)
    ),
    h("p", { class: "land-role-card" }, job.role),
    h("p", { class: "land-summary" }, job.summary),
    h("ul", { class: "land-bullets" }, job.plainBullets.map((b) => h("li", null, b)))
  );
}

function landProjectCard(project) {
  return h(
    "article",
    { class: "land-card" },
    h("h3", null, project.title),
    h("p", { class: "land-what" }, project.plain),
    h("p", { class: "land-result" }, "Результат: " + project.result)
  );
}

function skillsGrid() {
  const grid = h("div", { class: "land-skills" });
  Object.keys(PlainSkills).forEach((group) => {
    grid.appendChild(
      h(
        "div",
        { class: "land-skill-group" },
        h("div", { class: "land-skill-name" }, group),
        h(
          "div",
          { class: "land-skill-tags" },
          PlainSkills[group].map((tag) => h("span", { class: "land-tag" }, tag))
        )
      )
    );
  });
  return grid;
}

function contactsRow() {
  const row = h("div", { class: "land-contacts" });
  Profile.contacts.forEach((c) => {
    row.appendChild(anchor(c.url, c.label + ": " + c.display));
  });
  return row;
}

function fillStatic() {
  document.getElementById("land-name").textContent = Profile.name;
  document.getElementById("land-role").textContent = Profile.role;
  document.getElementById("land-tagline").textContent = Profile.tagline;
  document.getElementById("land-meta").textContent =
    [Profile.location, Profile.years + " лет опыта"].join("  •  ");

  const badge = document.getElementById("land-badge");
  if (Profile.openToOffers) {
    document.getElementById("land-badge-text").textContent = "Открыт к предложениям";
  } else if (badge && badge.style) {
    badge.style.display = "none";
  }

  const about = document.getElementById("land-about");
  Profile.about.forEach((p) => about.appendChild(h("p", null, p)));
  const soft = document.getElementById("land-soft");
  Profile.softSkills.forEach((s) => soft.appendChild(h("li", null, s)));
}

function initReveal() {
  const root = document.getElementById("view-landing");
  if (
    !root ||
    !root.classList ||
    typeof root.querySelectorAll !== "function" ||
    typeof IntersectionObserver === "undefined"
  ) {
    return;
  }
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  root.classList.add("js-reveal");
  const items = root.querySelectorAll("[data-reveal]");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  items.forEach((item) => io.observe(item));
}

function scrollToContacts() {
  const target = document.getElementById("land-contacts-block");
  if (!target || typeof target.scrollIntoView !== "function") return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

export function renderLanding() {
  fillStatic();
  document.getElementById("land-jobs").appendChild(
    h("div", { class: "land-cards" }, Experience.map(jobCard))
  );
  document.getElementById("land-skills").appendChild(skillsGrid());
  document.getElementById("land-projects").appendChild(
    h("div", { class: "land-cards" }, projects.map(landProjectCard))
  );
  document.getElementById("land-contacts").appendChild(contactsRow());
  initReveal();
}

export function wireLanding(onOpenTerminal, onShowLanding) {
  for (const id of ["open-terminal-hero", "open-terminal-footer"]) {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener("click", onOpenTerminal);
  }
  const back = document.getElementById("terminal-back");
  if (back) back.addEventListener("click", onShowLanding);
  const write = document.getElementById("land-write");
  if (write) write.addEventListener("click", scrollToContacts);
}
