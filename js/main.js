import { Terminal } from "./terminal.js";
import { registerSections } from "./sections.js";
import { registerEggs } from "./eggs.js";

registerSections();
registerEggs();

document.addEventListener("DOMContentLoaded", async () => {
  Terminal.init();
  await Terminal.boot();
});
