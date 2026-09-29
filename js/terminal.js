const Commands = {
  registry: {},

  register(name, run, aliases, description) {
    this.registry[name] = {
      name: name,
      run: run,
      aliases: aliases || [],
      description: description || "",
    };
  },

  resolve(name) {
    if (this.registry[name]) return this.registry[name];
    for (const entry of Object.values(this.registry)) {
      if (entry.aliases.indexOf(name) !== -1) return entry;
    }
    return null;
  },

  allNames() {
    const names = [];
    for (const entry of Object.values(this.registry)) {
      names.push(entry.name);
      for (const alias of entry.aliases) names.push(alias);
    }
    return names.filter((name, i) => names.indexOf(name) === i);
  },
};

const Profile = {
  name: "[Имя Фамилия]",
  role: "Backend Developer",
  spec: "PHP / Laravel / API / PostgreSQL",
  location: "Россия, удалённо",
  years: "5+",
  current: "[краткое описание текущего проекта/роли]",
  openToOffers: true,
  contacts: [
    { label: "Email", display: "your@email.com", url: "mailto:your@email.com" },
    { label: "GitHub", display: "github.com/username", url: "https://github.com/username" },
    { label: "Telegram", display: "@username", url: "https://t.me/username" },
    {
      label: "LinkedIn",
      display: "linkedin.com/in/username",
      url: "https://linkedin.com/in/username",
    },
  ],
};

const Stack = {
  languages: ["PHP 8.2", "Go 1.21", "Python 3.12", "SQL"],
  frameworks: ["Laravel 11", "Symfony 7", "Gin (Go)", "FastAPI"],
  databases: ["PostgreSQL", "MySQL", "Redis", "MongoDB"],
  tools: ["Docker", "Git", "GitHub Actions", "Nginx", "PHPUnit", "Composer", "Make"],
  architecture: [
    "REST API",
    "Микросервисы",
    "Очереди (RabbitMQ, Redis Queue)",
    "CI/CD",
  ],
};

const Experience = [
  {
    company: "Company Name 1",
    role: "Senior Backend Developer",
    period: "2023 — наст.",
    bullets: [
      "Спроектировал микросервисную архитектуру",
      "Настроил CI/CD, снизил время деплоя на 70%",
      "Проводил код-ревью, менторил junior",
    ],
    stack: "PHP, Laravel, PostgreSQL, Docker, K8s",
  },
  {
    company: "Company Name 2",
    role: "Backend Developer",
    period: "2021 — 2023",
    bullets: [
      "Разработал REST API для 50K+ RPS",
      "Внедрил автотесты, покрытие 80%+",
      "Оптимизировал запросы к БД, -40% latency",
    ],
    stack: "PHP, Symfony, MySQL, Redis, RabbitMQ",
  },
  {
    company: "Company Name 3",
    role: "Junior Backend Developer",
    period: "2019 — 2021",
    bullets: ["Поддержка и развитие legacy-систем", "Миграция с монолита на Laravel"],
    stack: "PHP, Laravel, MySQL, jQuery",
  },
];

const Terminal = {
  history: [],
  historyIndex: -1,
  output: null,
  input: null,
  prompt: "$ ",

  init() {
    this.output = document.getElementById("terminal-output");
    this.input = document.getElementById("terminal-input");

    this.input.addEventListener("keydown", (e) => this.handleKey(e));
    this.output.addEventListener("click", (e) => {
      const clickable = e.target.closest("[data-cmd]");
      if (clickable && clickable.dataset.cmd) this.execute(clickable.dataset.cmd);
    });
  },

  async boot() {
    const bootLines = [
      [{ text: "$ ", class: "prompt" }, { text: "./start.sh" }],
      [{ text: "Bootstrapping portfolio...", class: "muted" }],
      [
        { text: "[", class: "muted" },
        { text: "████████████████████", class: "success" },
        { text: "] ", class: "muted" },
        { text: "100%", class: "success" },
      ],
    ];

    await Typewriter.type(this.output, bootLines);
    await this.type("Ready.", 40, "success");
    await Typewriter.type(this.output, this.heroLines(), () => {
      if (window.matchMedia("(pointer: fine)").matches) this.input.focus();
    });
  },

  heroLines() {
    const commands = [
      ["about", "обо мне"],
      ["projects", "проекты"],
      ["stack", "технологии"],
      ["experience", "опыт работы"],
      ["contact", "контакты"],
      ["help", "список команд"],
      ["clear", "очистить экран"],
    ];

    const lines = [
      [{ text: "$ ", class: "prompt" }, { text: "whoami" }],
      [{ text: Profile.name + " — " + Profile.role }],
      [],
      [
        { text: "Специализация: ", class: "muted" },
        { text: Profile.spec },
      ],
      [{ text: "Локация: ", class: "muted" }, { text: Profile.location }],
      [{ text: "Опыт: ", class: "muted" }, { text: Profile.years + " лет" }],
      [],
      [{ text: "Доступные команды:", class: "muted" }],
    ];

    for (const [cmd, desc] of commands) {
      lines.push([
        { text: "  " },
        { text: cmd, class: "cmd-hint", cmd },
        { text: " ".repeat(12 - cmd.length) + "— " + desc, class: "muted" },
      ]);
    }

    return lines;
  },

  handleKey(e) {
    if (e.key === "Enter") {
      const cmd = this.input.value;
      this.input.value = "";
      if (cmd.trim() === "") return;
      this.history.push(cmd);
      this.historyIndex = this.history.length;
      this.execute(cmd);
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      this.historyPrev();
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      this.historyNext();
      return;
    }

    if (e.key === "Tab") {
      e.preventDefault();
      this.autocomplete();
    }
  },

  historyPrev() {
    if (this.historyIndex <= 0) return;
    this.historyIndex -= 1;
    this.input.value = this.history[this.historyIndex];
    this.caretToEnd();
  },

  historyNext() {
    if (this.historyIndex >= this.history.length) return;
    this.historyIndex += 1;
    this.input.value =
      this.historyIndex === this.history.length
        ? ""
        : this.history[this.historyIndex];
    this.caretToEnd();
  },

  caretToEnd() {
    const end = this.input.value.length;
    this.input.setSelectionRange(end, end);
  },

  parseCommand(input) {
    const parts = input.trim().split(/\s+/);
    return { name: parts[0].toLowerCase(), args: parts.slice(1) };
  },

  execute(cmd) {
    this.printHTML(
      "<span class=\"prompt\">" + this.prompt + "</span>" + escapeHtml(cmd)
    );
    const trimmed = cmd.trim();
    if (trimmed === "") return;

    const parsed = this.parseCommand(trimmed);
    const entry = Commands.resolve(parsed.name);
    if (entry) {
      entry.run(parsed.args);
    } else {
      this.print("command not found: " + parsed.name, "error");
    }
    this.input.focus();
  },

  autocomplete() {
    const parts = this.input.value.trim().split(/\s+/);
    if (parts.length > 1) return;
    const current = parts[0] || "";
    if (current === "") return;

    const matches = Commands.allNames().filter(function (name) {
      return name.startsWith(current);
    });
    if (matches.length === 0) return;

    if (matches.length === 1) {
      this.input.value = matches[0] + " ";
      this.caretToEnd();
      return;
    }

    const prefix = commonPrefix(matches);
    if (prefix.length > current.length) {
      this.input.value = prefix;
      this.caretToEnd();
    } else {
      this.print(matches.join("   "), "muted");
    }
  },

  print(text, className) {
    const row = document.createElement("div");
    row.className = "line";
    if (className) {
      const span = document.createElement("span");
      span.className = className;
      span.textContent = text;
      row.appendChild(span);
    } else {
      row.textContent = text;
    }
    this.output.appendChild(row);
    this.scrollToBottom();
  },

  printHTML(html) {
    const row = document.createElement("div");
    row.className = "line";
    row.innerHTML = html;
    this.output.appendChild(row);
    this.scrollToBottom();
  },

  appendHTML(html) {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = html;
    while (wrapper.firstChild) {
      this.output.appendChild(wrapper.firstChild);
    }
    this.scrollToBottom();
  },

  clear() {
    this.output.innerHTML = "";
  },

  scrollToBottom() {
    this.output.scrollTop = this.output.scrollHeight;
  },

  focus() {
    this.input.focus();
  },

  type(text, speed, className) {
    const segment = className ? { text, class: className } : { text };
    return Typewriter.type(this.output, [[segment]], { speed });
  },
};

function whoamiCard() {
  return [
    "<div>",
    `<div>${escapeHtml(Profile.name)} — ${escapeHtml(Profile.role)}</div>`,
    `<div>Специализация: <span class='muted'>${escapeHtml(Profile.spec)}</span></div>`,
    `<div>Локация: <span class='muted'>${escapeHtml(Profile.location)}</span></div>`,
    `<div>Опыт: <span class='muted'>${escapeHtml(Profile.years)} лет</span></div>`,
    "</div>",
  ].join("");
}

function aboutSection() {
  Terminal.printHTML("<div class='section-title'># Обо мне</div>");
  Terminal.print(
    "Бэкенд-разработчик с " +
      Profile.years +
      " годами опыта. Строю REST API, микросервисы и высоконагруженные системы. Люблю чистую архитектуру, автотесты и документацию, которую не стыдно показать."
  );
  Terminal.print("Сейчас работаю над " + Profile.current + ".");
  Terminal.appendHTML(
    "<ul class='bullets'>" +
    "<li>Чистый код важнее «работающего»</li>" +
    "<li>Тесты — часть разработки, не отдельная фаза</li>" +
    "<li>Документация — тоже код</li>" +
    "</ul>"
  );
}

function projectsList() {
  Terminal.printHTML("<div class='section-title'># Проекты</div>");
  Terminal.print("total " + projects.length);
  let rows = "";
  projects.forEach(function (project) {
    rows +=
      "<div class='project-row' data-cmd='cat " +
      escapeHtml(project.id) +
      "/README.md'>" +
      "<span class='perms'>drwxr-xr-x</span>" +
      "<span class='name'>" + escapeHtml(project.id) + "/</span>" +
      "<span class='desc'>" + escapeHtml(project.title) + "</span>" +
      "</div>";
  });
  Terminal.appendHTML("<div class='project-list'>" + rows + "</div>");
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
  const { github, live, docs } = links || {};
  const featuresHtml = (features || [])
    .map(function (f) {
      return "<li>" + escapeHtml(f) + "</li>";
    })
    .join("");
  const linkTags = [];
  if (github) {
    linkTags.push(
      "<a href='" +
        escapeHtml(github) +
        "' target='_blank' rel='noopener'>GitHub</a>"
    );
  }
  if (live) {
    linkTags.push(
      "<a href='" + escapeHtml(live) + "' target='_blank' rel='noopener'>Live</a>"
    );
  }
  if (docs) {
    linkTags.push(
      "<a href='" + escapeHtml(docs) + "' target='_blank' rel='noopener'>Docs</a>"
    );
  }
  const linksHtml = linkTags.length
    ? "<div class='card-meta'>Ссылки: " + linkTags.join(" ") + "</div>"
    : "";
  const stackHtml =
    stack && stack.length
      ? "<div class='card-meta'>Стек: <span class='type'>" +
        escapeHtml(stack.join(", ")) +
        "</span></div>"
      : "";
  const roleHtml = role
    ? "<div class='card-meta'>Роль: " + escapeHtml(role) + "</div>"
    : "";
  const featuresBlock = featuresHtml
    ? "<div class='card-meta'>Особенности:</div><ul class='bullets'>" +
      featuresHtml +
      "</ul>"
    : "";

  Terminal.appendHTML(
    "<div class='card'>" +
    "<div class='card-header'>" + escapeHtml(id) + "/README.md</div>" +
    "<div class='card-body'>" +
    "<div class='card-title'>" + escapeHtml(title) + "</div>" +
    "<div>Описание: " + escapeHtml(description) + "</div>" +
    stackHtml +
    roleHtml +
    featuresBlock +
    linksHtml +
    "</div>" +
    "</div>"
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
  let html = "<div class='stack-yaml'>";
  Object.keys(Stack).forEach(function (key) {
    html += "<div><span class='yaml-key'>" + escapeHtml(key) + ":</span></div>";
    Stack[key].forEach(function (item) {
      html += "<div class='yaml-item'>" + escapeHtml(item) + "</div>";
    });
  });
  html += "</div>";
  Terminal.appendHTML(html);
}

function experienceSection() {
  Terminal.printHTML("<div class='section-title'># Опыт работы</div>");
  Experience.forEach(function (job) {
    const bullets = job.bullets
      .map(function (b) {
        return "<li>" + escapeHtml(b) + "</li>";
      })
      .join("");
    Terminal.appendHTML(
      "<div class='card'>" +
      "<div class='card-header'>" + escapeHtml(job.company) + "</div>" +
      "<div class='card-body'>" +
      "<div class='card-meta'>" +
      escapeHtml(job.role) +
      "  |  " +
      escapeHtml(job.period) +
      "</div>" +
      "<ul class='bullets'>" + bullets + "</ul>" +
      "<div class='card-meta'>Стек: " + escapeHtml(job.stack) + "</div>" +
      "</div>" +
      "</div>"
    );
  });
}

function contactSection() {
  Terminal.printHTML("<div class='section-title'># Контакты</div>");
  let rows = "";
  Profile.contacts.forEach(function (c) {
    rows +=
      "<div class='contact-row'>" +
      "<span class='contact-label'>" + escapeHtml(c.label) + "</span>" +
      "<a href='" +
      escapeHtml(c.url) +
      "' target='_blank' rel='noopener'>" +
      escapeHtml(c.display) +
      "</a>" +
      "</div>";
  });
  const statusClass = Profile.openToOffers ? "status-open" : "status-closed";
  const statusText = Profile.openToOffers
    ? "Статус: открыт к предложениям ●"
    : "Статус: закрыт ●";
  Terminal.appendHTML(
    "<div class='contact-list'>" + rows + "</div>" +
    "<div class='status " + statusClass + "'>" + statusText + "</div>"
  );
}

function helpSection() {
  Terminal.print("Доступные команды:");
  const entries = Object.values(Commands.registry).sort(function (a, b) {
    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
  });
  let rows = "";
  entries.forEach(function (entry) {
    const aliases = entry.aliases.length ? entry.aliases.join(", ") : "—";
    rows +=
      "<div class='help-row'>" +
      "<span class='help-cmd'>" + escapeHtml(entry.name) + "</span>" +
      "<span class='help-alias'>" + escapeHtml(aliases) + "</span>" +
      "<span class='help-desc'>" + escapeHtml(entry.description) + "</span>" +
      "</div>";
  });
  Terminal.appendHTML("<div class='help-list'>" + rows + "</div>");
}

Commands.register("whoami", function () {
  Terminal.printHTML(whoamiCard());
}, [], "краткая визитка");

Commands.register("about", aboutSection, ["a"], "обо мне");

Commands.register("projects", projectsList, ["p", "ls"], "проекты");

Commands.register("cat", catCommand, [], "детали проекта");

Commands.register("stack", stackSection, ["s"], "технологии");

Commands.register("experience", experienceSection, ["exp", "work"], "опыт работы");

Commands.register("contact", contactSection, ["c"], "контакты");

Commands.register("help", helpSection, ["h", "?"], "список команд");

Commands.register("clear", function () {
  Terminal.clear();
}, ["cls"], "очистить экран");

function commonPrefix(items) {
  if (items.length === 0) return "";
  let prefix = items[0];
  for (let i = 1; i < items.length; i += 1) {
    while (items[i].indexOf(prefix) !== 0) {
      prefix = prefix.slice(0, -1);
      if (prefix === "") return "";
    }
  }
  return prefix;
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

document.addEventListener("DOMContentLoaded", async () => {
  Terminal.init();
  await Terminal.boot();
});
