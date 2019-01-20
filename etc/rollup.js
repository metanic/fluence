import path from "path";

import babel from "rollup-plugin-babel";
import builtins from "rollup-plugin-node-builtins";
import commonjs from "rollup-plugin-commonjs";
import json from "rollup-plugin-json";
import replace from "rollup-plugin-replace";
import resolve from "rollup-plugin-node-resolve";

import { eslint } from "rollup-plugin-eslint";
import { terser } from "rollup-plugin-terser";

const environment = process.env.NODE_ENV || "production";
const isProduction = !environment || environment === "production";

const MINIFIED_EXTENSIONS = new Set([".js"]);

const local = (...pathSegments) => {
  if (pathSegments.length === 0) return "";

  let finalSegment = pathSegments.pop();

  if (finalSegment) {
    const extension = path.extname(finalSegment);

    if (MINIFIED_EXTENSIONS.has(extension)) {
      finalSegment = finalSegment.slice(0, -1 * extension.length);
      finalSegment = `${finalSegment}.min${extension}`;
    }

    pathSegments.push(finalSegment);
  }

  return path.join(...pathSegments);
};

export default {
  input: path.join("src", "index.js"),
  output: {
    file: local("lib", "index.js"),
    format: "iife",
    name: "fluence",
    sourcemap: !isProduction
  },
  plugins: [
    builtins(),
    replace({
      "process.env.NODE_ENV": JSON.stringify(isProduction)
    }),
    resolve({
      browser: true,
      extensions: [".mjs", ".js", ".jsx", ".json"],
      jsnext: true,
      main: true
    }),
    json(),
    commonjs({
      include: [path.join("node_modules", "**")]
    }),
    eslint(),
    babel({
      exclude: path.join("node_modules", "**")
    }),
    terser()
  ]
};
