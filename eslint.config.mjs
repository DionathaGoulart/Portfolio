import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/**
 * Skin isolation (plan-components.md §5): retro and terminal React components must never
 * import each other, and shared/ must know nothing about either skin. Themes and daisyUI
 * classes are shared by design — the boundary lives only at the component layer.
 */
const skinBoundaries = [
  {
    files: ["src/components/retro/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["**/terminal/**"],
              message: "Skin isolation: retro components must not import terminal components.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/components/terminal/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["**/retro/**"],
              message: "Skin isolation: terminal components must not import retro components.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/components/shared/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["**/retro/**", "**/terminal/**"],
              message:
                "shared/ components are skin-agnostic: move this file into a skin folder instead.",
            },
          ],
        },
      ],
    },
  },
];

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  ...skinBoundaries,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
