import { Commands } from "./commands.js";
import { Terminal } from "./terminal.js";
import { Profile, Stack, Experience } from "./data.js";
import { projects } from "./projects.js";

function hAppend(node, child) {
  if (child === null || child === undefined) return;
  node.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
}

function h(tag, attrs, ...children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs || {})) {
    if (key === "class") node.className = value;
    else if (key === "dataset") Object.assign(node.dataset, value);
    else node[key] = value;
  }
  for (const child of children) {
    if (Array.isArray(child)) child.forEach((c) => hAppend(node, c));
    else hAppend(node, child);
  }
  return node;
}

function anchor(href, label) {
  const a = document.createElement("a");
  a.href = href;
  a.target = "_blank";
  a.rel = "noopener";
  a.textContent = label;
  return a;
}

function sectionTitle(text) {
  return h("div", { class: "section-title" }, text);
}

function whoamiCard() {
  return h(
    "div",
    null,
    h("div", null, Profile.name + " — " + Profile.role),
    h("div", null, "Специализация: ", h("span", { class: "muted" }, Profile.spec)),
    h("div", null, "Локация: ", h("span", { class: "muted" }, Profile.location)),
    h("div", null, "Опыт: ", h("span", { class: "muted" }, Profile.years + " лет"))
  );
}

function aboutSection() {
  Terminal.append(sectionTitle("# Обо мне"));
  Terminal.append(
    h(
      "div",
      { class: "line" },
      "Бэкенд-разработчик с " +
        Profile.years +
        " годами опыта. Строю REST API, микросервисы и высоконагруженные системы. Люблю чистую архитектуру, автотесты и документацию, которую не стыдно показать."
    )
  );
  Terminal.append(h("div", { class: "line" }, "Сейчас работаю над " + Profile.current + "."));
  Terminal.append(
    h(
      "ul",
      { class: "bullets" },
      h("li", null, "Чистый код важнее «работающего»"),
      h("li", null, "Тесты — часть разработки, не отдельная фаза"),
      h("li", null, "Документация — тоже код")
    )
  );
}

function projectsList() {
  Terminal.append(sectionTitle("# Проекты"));
  Terminal.append(h("div", { class: "line" }, "total " + projects.length));
  const list = h("div", { class: "project-list" });
  projects.forEach((project) => {
    list.appendChild(
      h(
        "div",
        { class: "project-row", dataset: { cmd: "cat " + project.id + "/README.md" } },
        h("span", { class: "perms" }, "drwxr-xr-x"),
        h("span", { class: "name" }, project.id + "/"),
        h("span", { class: "desc" }, project.title)
      )
    );
  });
  Terminal.append(list);
}

function findProject(rawId) {
  let id = rawId;
  const readmeMatch = id.match(/^(.+)\/README\.md$/);
  if (readmeMatch) id = readmeMatch[1];
  return projects.find(function (p) {
    return p.id === id;
  });
}

function projectCard(project) {
  const { id, title, description, role, stack, features, links } = project;
  const body = [
    h("div", { class: "card-title" }, title),
    h("div", null, "Описание: ", description),
  ];
  if (stack && stack.length) {
    body.push(
      h("div", { class: "card-meta" }, "Стек: ", h("span", { class: "type" }, stack.join(", ")))
    );
  }
  if (role) {
    body.push(h("div", { class: "card-meta" }, "Роль: ", role));
  }
  if (features && features.length) {
    body.push(h("div", { class: "card-meta" }, "Особенности:"));
    body.push(h("ul", { class: "bullets" }, features.map((f) => h("li", null, f))));
  }
  if (links && (links.github || links.live || links.docs)) {
    const linksSpan = h("span");
    const items = [];
    if (links.github) items.push(anchor(links.github, "GitHub"));
    if (links.live) items.push(anchor(links.live, "Live"));
    if (links.docs) items.push(anchor(links.docs, "Docs"));
    items.forEach((item, i) => {
      if (i > 0) linksSpan.appendChild(document.createTextNode(" "));
      linksSpan.appendChild(item);
    });
    body.push(h("div", { class: "card-meta" }, "Ссылки: ", linksSpan));
  }
  Terminal.append(
    h(
      "div",
      { class: "card" },
      h("div", { class: "card-header" }, id + "/README.md"),
      h("div", { class: "card-body" }, body)
    )
  );
}

function catCommand(args) {
  if (args.length === 0) {
    Terminal.print("Usage: cat <id>/README.md", "error");
    return;
  }
  const project = findProject(args[0]);
  if (!project) {
    Terminal.print("cat: " + args[0] + ": No such file or directory", "error");
    return;
  }
  projectCard(project);
}

function stackSection() {
  const wrap = h("div", { class: "stack-yaml" });
  Object.keys(Stack).forEach((key) => {
    wrap.appendChild(h("div", null, h("span", { class: "yaml-key" }, key + ":")));
    Stack[key].forEach((item) => wrap.appendChild(h("div", { class: "yaml-item" }, item)));
  });
  Terminal.append(wrap);
}

function experienceSection() {
  Terminal.append(sectionTitle("# Опыт работы"));
  Experience.forEach((job) => {
    Terminal.append(
      h(
        "div",
        { class: "card" },
        h("div", { class: "card-header" }, job.company),
        h(
          "div",
          { class: "card-body" },
          h("div", { class: "card-meta" }, job.role, "  |  ", job.period),
          h("ul", { class: "bullets" }, job.bullets.map((b) => h("li", null, b))),
          h("div", { class: "card-meta" }, "Стек: ", job.stack)
        )
      )
    );
  });
}

function contactSection() {
  Terminal.append(sectionTitle("# Контакты"));
  const list = h("div", { class: "contact-list" });
  Profile.contacts.forEach((c) => {
    list.appendChild(
      h(
        "div",
        { class: "contact-row" },
        h("span", { class: "contact-label" }, c.label),
        anchor(c.url, c.display)
      )
    );
  });
  Terminal.append(list);
  const statusClass = Profile.openToOffers ? "status-open" : "status-closed";
  const statusText = Profile.openToOffers
    ? "Статус: открыт к предложениям ●"
    : "Статус: закрыт ●";
  Terminal.append(h("div", { class: "status " + statusClass }, statusText));
}

function helpSection() {
  Terminal.append(h("div", { class: "line" }, "Доступные команды:"));
  const entries = Object.values(Commands.registry)
    .filter((entry) => !entry.hidden)
    .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
  const list = h("div", { class: "help-list" });
  entries.forEach((entry) => {
    list.appendChild(
      h(
        "div",
        { class: "help-row" },
        h("span", { class: "help-cmd" }, entry.name),
        h("span", { class: "help-alias" }, entry.aliases.length ? entry.aliases.join(", ") : "—"),
        h("span", { class: "help-desc" }, entry.description)
      )
    );
  });
  Terminal.append(list);
}

export function registerSections() {
  Commands.register("whoami", () => Terminal.append(whoamiCard()), [], "краткая визитка");
  Commands.register("about", aboutSection, ["a"], "обо мне");
  Commands.register("projects", projectsList, ["p", "ls"], "проекты");
  Commands.register("cat", catCommand, [], "детали проекта");
  Commands.register("stack", stackSection, ["s"], "технологии");
  Commands.register("experience", experienceSection, ["exp", "work"], "опыт работы");
  Commands.register("contact", contactSection, ["c"], "контакты");
  Commands.register("help", helpSection, ["h", "?"], "список команд");
  Commands.register("clear", () => Terminal.clear(), ["cls"], "очистить экран");
}
