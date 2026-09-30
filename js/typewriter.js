import {Terminal} from "./terminal.js";

const Typewriter = (() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const START_DELAY = 500;
    const LINE_PAUSE = 140;
    const MIN_SPEED = 30;
    const MAX_SPEED = 50;

    function wait(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    function charSpeed(speed) {
        if (speed) return speed;
        return MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED);
    }

    function createSegment(span, seg) {
        if (seg.class) span.className = seg.class;
        if (seg.cmd) span.dataset.cmd = seg.cmd;
    }

    function renderInstant(container, lines) {
        for (const line of lines) {
            const row = document.createElement("div");
            row.className = "line";
            if (line.length === 0) {
                row.textContent = "\u00A0";
            } else {
                for (const seg of line) {
                    const span = document.createElement("span");
                    createSegment(span, seg);
                    span.textContent = seg.text;
                    row.appendChild(span);
                }
            }
            container.appendChild(row);
        }
    }

    async function typeLine(container, line, speed) {
        const row = document.createElement("div");
        row.className = "line";
        if (line.length === 0) {
            row.textContent = "\u00A0";
            container.appendChild(row);
            return;
        }
        container.appendChild(row);
        for (const seg of line) {
            const span = document.createElement("span");
            createSegment(span, seg);
            row.appendChild(span);
            for (const ch of seg.text) {
                span.textContent += ch;
                Terminal.scrollToBottom();
                await wait(charSpeed(seg.speed || speed));
            }
        }
    }

    async function type(container, lines, options) {
        const opts = typeof options === "function" ? {onDone: options} : options || {};
        const {speed, onDone} = opts;

        if (reducedMotion.matches) {
            renderInstant(container, lines);
            if (onDone) onDone();
            return;
        }

        await wait(START_DELAY);
        for (const line of lines) {
            await typeLine(container, line, speed);
            if (line.length > 0) await wait(LINE_PAUSE);
            Terminal.scrollToBottom();
        }
        if (onDone) onDone();
    }

    return {type};
})();

export {Typewriter};
