/**
 * Guards the daisyUI `exclude` list in src/app/globals.css: a component listed there has
 * its CSS stripped from the build, so rendering its class fails silently — the markup
 * ships unstyled. This script fails CI when an excluded component's class shows up in a
 * className, forcing the exclude list and the markup to move together.
 *
 * Heuristic, not a parser: it scans lines that mention className/cn( for the excluded
 * name as a standalone class token, after dropping text-bearing attributes (aria-label,
 * title, ...) that legally contain words like "menu".
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const css = readFileSync("src/app/globals.css", "utf8");
const pluginBlock = css.match(/@plugin "daisyui"\s*\{([^}]*)\}/);
const excludeLine = pluginBlock?.[1].match(/exclude:\s*([^;]+);/);
if (!excludeLine) {
  console.log("check-excluded: no daisyUI exclude list in globals.css - nothing to check.");
  process.exit(0);
}
const excluded = excludeLine[1]
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const files = [];
(function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) walk(path);
    else if (/\.(tsx|jsx)$/.test(entry)) files.push(path);
  }
})("src");

const TEXT_ATTRS =
  /\b(?:aria-[\w-]+|title|alt|id|key|htmlFor|placeholder|label)\s*=\s*(?:"[^"]*"|\{[^}]*\})/g;

const offenders = [];
for (const file of files) {
  readFileSync(file, "utf8")
    .split("\n")
    .forEach((raw, i) => {
      if (!/className|\bcn\(/.test(raw)) return;
      const line = raw.replace(TEXT_ATTRS, "");
      for (const name of excluded) {
        const asClassToken = new RegExp(`["'\`\\s]${name}(?=[\\s"'\`]|-[a-z])`);
        if (asClassToken.test(line)) {
          offenders.push(`${file}:${i + 1}  uses excluded daisyUI class "${name}"`);
        }
      }
    });
}

if (offenders.length > 0) {
  console.error(
    "daisyUI classes excluded in globals.css but referenced in markup (they render unstyled):"
  );
  for (const offender of offenders) console.error("  " + offender);
  console.error(
    "Either remove the class from the markup or remove the component from the exclude list."
  );
  process.exit(1);
}
console.log(`check-excluded: OK - none of [${excluded.join(", ")}] referenced as a class in src.`);
