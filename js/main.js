import { Terminal } from "./terminal.js";
import { renderLanding, wireLanding } from "./landing.js";
import { registerSections } from "./sections.js";
import { registerEggs } from "./eggs.js";

registerSections();
registerEggs();

let booted = false;

function openTerminal() {
  document.getElementById("view-landing").hidden = true;
  document.getElementById("terminal").hidden = false;
  document.getElementById("dock").hidden = false;
  if (!booted) {
    booted = true;
    Terminal.init();
    Terminal.boot().catch((error) => console.error(error));
  } else {
    Terminal.focus();
  }
}

function showLanding() {
  document.getElementById("terminal").hidden = true;
  document.getElementById("dock").hidden = true;
  document.getElementById("view-landing").hidden = false;
  if (window.scrollTo) window.scrollTo(0, 0);
}

document.addEventListener("DOMContentLoaded", () => {
  renderLanding();
  wireLanding(openTerminal, showLanding);
});

export { openTerminal, showLanding };
