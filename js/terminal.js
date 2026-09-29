const Commands = {
  registry: {},

  register(name, run, aliases) {
    this.registry[name] = { name: name, run: run, aliases: aliases || [] };
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
      const hint = e.target.closest(".cmd-hint");
      if (hint && hint.dataset.cmd) this.execute(hint.dataset.cmd);
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
      [{ text: "[Имя Фамилия] — Backend Developer" }],
      [],
      [
        { text: "Специализация: ", class: "muted" },
        { text: "PHP / Laravel / API / PostgreSQL" },
      ],
      [{ text: "Локация: ", class: "muted" }, { text: "Россия, удалённо" }],
      [{ text: "Опыт: ", class: "muted" }, { text: "5+ лет" }],
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

Commands.register("clear", function () {
  Terminal.clear();
}, ["cls"]);

document.addEventListener("DOMContentLoaded", async () => {
  Terminal.init();
  await Terminal.boot();
});
