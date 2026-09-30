const path = require("path");
const WebpackObfuscator = require("webpack-obfuscator");

module.exports = {
  mode: "production",
  entry: "./js/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/bundle.js",
  },
  plugins: [
    new WebpackObfuscator({
      options: {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.4,
        stringArray: true,
        stringArrayThreshold: 0.75,
        stringArrayEncoding: ["base64"],
        transformObjectKeys: true,
        deadCodeInjection: false,
        selfDefending: false,
        debugProtection: false,
        renameProperties: false,
      },
    }),
  ],
};
