import { Commands } from "./commands.js";
import { Typewriter } from "./typewriter.js";
import { Profile } from "./data.js";

const Terminal = {
  ready: false,
  history: [],
  historyIndex: -1,
  output: null,
  input: null,
  prompt: "$ ",

  init() {
    this.output = document.getElementById("terminal-output");
    this.input = document.getElementById("terminal-input");

    this.input.disabled = true;
    this.input.addEventListener("keydown", (e) => this.handleKey(e));
    this.output.addEventListener("click", (e) => {
      if (!this.ready) return;
      const clickable = e.target.closest("[data-cmd]");
      if (clickable && clickable.dataset.cmd) this.execute(clickable.dataset.cmd);
    });
    const dock = document.getElementById("dock");
    if (dock) {
      dock.addEventListener("click", (e) => {
        if (!this.ready) return;
        const btn = e.target.closest("[data-cmd]");
        if (btn && btn.dataset.cmd) this.execute(btn.dataset.cmd);
      });
    }
    this.setupViewport();
  },

  setupViewport() {
    if (!window.visualViewport) return;
    const onResize = () => {
      const offset = Math.max(0, window.innerHeight - window.visualViewport.height);
      const root = document.documentElement;
      if (root && root.style) {
        root.style.setProperty("--app-height", window.visualViewport.height + "px");
        root.style.setProperty("--keyboard-offset", offset + "px");
      }
    };
    window.visualViewport.addEventListener("resize", onResize);
    onResize();
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
      this.ready = true;
      this.input.disabled = false;
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
    if (!this.ready) return;
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
    const row = document.createElement("div");
    row.className = "line";
    const prompt = document.createElement("span");
    prompt.className = "prompt";
    prompt.textContent = this.prompt;
    row.appendChild(prompt);
    row.appendChild(document.createTextNode(cmd));
    this.output.appendChild(row);
    this.scrollToBottom();

    const trimmed = cmd.trim();
    if (trimmed === "") return;

    const parsed = this.parseCommand(trimmed);
    const entry = Commands.resolve(parsed.name);
    if (entry) {
      this.setActive(entry.name);
      entry.run(parsed.args);
    } else {
      this.print("command not found: " + parsed.name, "error");
    }
    this.input.focus();
  },

  setActive(name) {
    const dock = document.getElementById("dock");
    if (!dock || !dock.children) return;
    const children = Array.from(dock.children);
    if (!children.some((b) => b.dataset && b.dataset.cmd === name)) return;
    for (const btn of children) {
      if (!btn.dataset || !btn.dataset.cmd) continue;
      btn.className = btn.dataset.cmd === name ? "dock-btn active" : "dock-btn";
    }
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

  append(node) {
    this.output.appendChild(node);
    this.scrollToBottom();
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
    this.append(row);
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

export { Terminal };
