function hAppend(node, child) {
    if (child === null || child === undefined) return;
    node.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
}

/**
 * @param {string} tag
 * @param {Record<string, string> | null} [attrs]
 * @param {...(string | object | Array<string | object>)} children
 * @returns {object}
 */
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

export {h, anchor};
