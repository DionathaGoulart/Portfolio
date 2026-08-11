# 🚀 Personal Portfolio Hub

[![Next.js](https://img.shields.io/badge/Next.js-16.x-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT%20w%2F%20Attribution-green?style=for-the-badge)](LICENSE)

A high-performance, dual-track portfolio designed to showcase expertise in both **Software Engineering** and **IT Operations**. Built with a focus on immersive UX, fluid animations, and a modern "retro-tech" aesthetic.

---

## 📖 Overview

This project is a unique "Hub" that splits the professional persona into two distinct paths:

- **Dev Portfolio:** Focused on Fullstack development, SaaS, and premium UX. Features an integrated **Interactive Terminal Mode** simulating a real command-line environment.
- **Ops/TI Portfolio:** Focused on Infrastructure, Networking, and Automation.

It features a daisyUI theme system that switches styles based on the active route, providing a tailored experience for different professional audiences. Thirteen themes cover two skins — `retro` for the hub and Ops track, `terminal` for the Dev track, where visitors pick their own light and dark palette.

## 🛠️ Tech Stack

- **Framework:** [Next.js 16+](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) + [daisyUI 5](https://daisyui.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **State Management:** React Context API for the skin and terminal state.

## ✨ Key Features

- 💻 **Interactive Terminal Mode:** A fully functional mock terminal interface for the Developer portfolio. Users can interact via commands like `ls`, `cat`, and `theme`. Includes autocomplete (`Tab`) and history (`↑`/`↓`).
- 🎨 **Terminal Theme Customizer:** An interactive CLI wizard that allows users to change light and dark color palettes dynamically. Preferences are persisted in `localStorage`.
- 🌓 **Dynamic Theming:** Route-based theme switching (Hub, Dev, TI).
- 📱 **Fully Responsive:** Optimized for all screen sizes with a mobile-first approach. Custom UI handling for touch devices.
- 🎭 **Immersive Animations:** Framer Motion for high-end interactions.
- ⚙️ **Data-Driven Configuration:** Content is strictly separated from presentation through strongly typed configuration files (`dev-config.ts`, `ti-config.ts`), making content updates trivial.
- 🔍 **SEO Optimized:** Metadata and Schema.org JSON-LD structured data included.

## 🧩 Developer Guide

### How to Add New Color Palettes

Colors live in exactly one place: the `@plugin "daisyui/theme"` blocks in `src/app/globals.css`. Nothing in TypeScript holds a color that paints the page.

The interactive terminal features a built-in theme wizard. Adding a palette to it takes two steps:

1. Add a theme block to `src/app/globals.css`. Copy an existing `terminal-*` block and change the values — every listed variable is required by daisyUI:

   ```css
   @plugin "daisyui/theme" {
     name: "terminal-matrix";
     color-scheme: dark;

     --color-base-100: #000000; /* page background */
     --color-base-200: #111111; /* card / elevated surface */
     --color-base-300: #00ff00; /* border color, used by .retro-border */
     --color-base-content: #ffffff; /* body text */
     --color-accent: #00ff00;
     --color-accent-content: #000000; /* text sitting on top of accent */
     /* ...remaining daisyUI tokens, see the neighboring blocks... */

     --shadow: #00ff00; /* offset shadow of .retro-shadow */
     --scanline-color: rgba(0, 0, 0, 0.2); /* CRT overlay */
   }
   ```

2. Register it in `src/data/theme-config.ts` by appending to `TERMINAL_DARK_THEMES` (or `TERMINAL_LIGHT_THEMES`):

   ```typescript
   {
     palette: "d6",              // id persisted in localStorage
     theme: "terminal-matrix",   // must match the CSS block name
     name: "Neon Matrix",        // label shown by the `theme` command
     bg: "#000000", acc: "#00ff00", fg: "#ffffff",  // swatch preview only
   }
   ```

The wizard's numbering, its `[1–N]` prompts and the blocking theme script all derive from these arrays, so there is nothing else to update.

Routes map to skins in the same file: `/dev*` renders the `terminal` skin, everything else renders `retro`. The theme is stamped onto `<html>` before first paint by `THEME_INIT_SCRIPT`, which is why switching modes or routes never flashes.

### How to Modify Content

All textual content, projects, and experiences are strictly separated from UI components.

- **Developer Persona:** Edit `src/data/dev-config.ts`.
- **Ops/TI Persona:** Edit `src/data/ti-config.ts`.
- **Global Hub/SEO:** Edit `src/data/seo-config.ts`.

Types live in `src/types/content.ts`. `PortfolioContent` holds what both personas render; `DevContent` adds the fields only the terminal skin has a surface for (system metadata, env variables, the extended hero). Each persona declares its own UI strings interface — `DevUiStrings` and `TiUiStrings` — so a typo in a key is a compile error rather than a silently missing label.

To add a field, put it on the shared type only if both personas render it; otherwise extend the persona-specific one.

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm / yarn / pnpm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/DionathaGoulart/portfolio.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Run the checks (the same ones CI runs):

   ```bash
   npm run format:check && npm run lint && npm run typecheck && npm run build
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## 🚀 Deployment

The easiest way to deploy this portfolio is using the **Vercel Platform**.

1. **Push your code** to GitHub, GitLab, or Bitbucket.
2. **Import project** in [Vercel](https://vercel.com/new).
3. Vercel will auto-detect Next.js and apply the settings from `vercel.json`.
4. Your site is live! Every push to `main` will trigger a new deployment.

---

## 📜 License & Attribution

This project is licensed under the **MIT License with a Mandatory Attribution Clause**.

**Condition of Use:**
You are free to use, copy, and modify this software for personal or commercial use, provided that you **keep a visible credit link** in the footer of your website.

**Required Attribution:**

> "Feito por [Dionatha Goulart](https://github.com/DionathaGoulart)" (or equivalent visual credit).

See the [LICENSE](LICENSE) file for the full legal text.

---

## 👤 Contact

**Dionatha Goulart**

- 📧 [dionatha.work@gmail.com](mailto:dionatha.work@gmail.com)
- 🔗 [LinkedIn](https://linkedin.com/in/dionathagoulart)
- 🐙 [GitHub](https://github.com/DionathaGoulart)

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/DionathaGoulart">Dionatha Goulart</a>
</p>
