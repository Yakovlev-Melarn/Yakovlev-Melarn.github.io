const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const config = require("../webpack.config.js");

const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");

function buildCss() {
  const order = ["base.css", "terminal.css", "cards.css", "dock.css", "landing.css", "responsive.css"];
  const css = order
    .map((file) => fs.readFileSync(path.join(root, "css", file), "utf8"))
    .join("\n");
  fs.mkdirSync(path.join(dist, "css"), { recursive: true });
  fs.writeFileSync(path.join(dist, "css", "style.css"), css);
}

function buildHtml() {
  const cssHref = ["css", "style.css"].join("/");
  const moduleSrc = ["js", "main.js"].join("/");
  const bundleSrc = ["js", "bundle.js"].join("/");
  let html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  html = html.replace(/\n[ \t]*<link rel="stylesheet" href="css\/[^"]+">/g, "");
  html = html.replace("</head>", '  <link rel="stylesheet" href="' + cssHref + '">\n</head>');
  html = html.replace(
    '<script type="module" src="' + moduleSrc + '"></script>',
    '<script src="' + bundleSrc + '"></script>'
  );
  fs.writeFileSync(path.join(dist, "index.html"), html);
}

function copyAssets() {
  const src = path.join(root, "assets");
  const out = path.join(dist, "assets");
  fs.mkdirSync(out, { recursive: true });
  for (const file of fs.readdirSync(src)) {
    fs.copyFileSync(path.join(src, file), path.join(out, file));
  }
  if (fs.existsSync(path.join(root, "CNAME"))) {
    fs.copyFileSync(path.join(root, "CNAME"), path.join(dist, "CNAME"));
  }
}

/**
 * @param {Error | null} err
 * @param {{ hasErrors: () => boolean; toString: (options?: object) => string }} stats
 */
function onBuilt(err, stats) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  if (stats.hasErrors()) {
    console.error(stats.toString({ colors: false }));
    process.exit(1);
  }
  buildCss();
  buildHtml();
  copyAssets();
  console.log(stats.toString({ colors: false, modules: false }));
  console.log("Готово: dist/");
}

webpack(config, onBuilt);
