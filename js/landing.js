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
    h("p", { class: "land-role" }, job.role),
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
  const meta = [Profile.location, Profile.years + " лет опыта"];
  if (Profile.openToOffers) meta.push("открыт к предложениям");
  document.getElementById("land-meta").textContent = meta.join("  •  ");

  const about = document.getElementById("land-about");
  Profile.about.forEach((p) => about.appendChild(h("p", null, p)));

  const soft = document.getElementById("land-soft");
  Profile.softSkills.forEach((s) => soft.appendChild(h("li", null, s)));
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
}

export function wireLanding(onOpenTerminal, onShowLanding) {
  for (const id of ["open-terminal-hero", "open-terminal-footer"]) {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener("click", onOpenTerminal);
  }
  const back = document.getElementById("terminal-back");
  if (back) back.addEventListener("click", onShowLanding);
}
