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
    if (e.key !== "Enter") return;
    const cmd = this.input.value;
    this.input.value = "";
    if (cmd.trim() === "") return;
    this.history.push(cmd);
    this.historyIndex = this.history.length;
    this.execute(cmd);
  },

  execute(cmd) {
    this.printHTML(
      "<span class=\"prompt\">" + this.prompt + "</span>" + escapeHtml(cmd)
    );
    this.print("command not found: " + cmd.trim(), "error");
    this.input.focus();
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
