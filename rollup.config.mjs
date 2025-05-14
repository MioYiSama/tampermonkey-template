import nodeResolve from "@rollup/plugin-node-resolve";
import { readFileSync } from "node:fs";
import path from "node:path";

const metadata = JSON.parse(
  readFileSync(path.resolve("./src/manifest.json"), "utf-8")
);

let banner = "// ==UserScript==\n";
for (const key in metadata) {
  let value = metadata[key];

  if (typeof value === "string") {
    value = [value];
  }

  for (const element of value) {
    banner += `// @${key.padEnd(12)} ${element}\n`;
  }
}
banner += "// ==/UserScript==\n";

/**
 * @type { import("rollup").RollupOptions }
 */
export default {
  plugins: [nodeResolve()],
  input: "./src/index.ts",
  output: {
    file: "./dist/bundle.js",
    format: "module",
    banner,
  },
};
