# 🚀 Personal Portfolio Hub

[![Next.js](https://img.shields.io/badge/Next.js-15.x-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT%20w%2F%20Attribution-green?style=for-the-badge)](LICENSE)

A high-performance, dual-track portfolio designed to showcase expertise in both **Software Engineering** and **IT Operations**. Built with a focus on immersive UX, fluid animations, and a modern "retro-tech" aesthetic.

---

## 📖 Overview

This project is a unique "Hub" that splits the professional persona into two distinct paths:
- **Dev Portfolio:** Focused on Fullstack development, SaaS, and premium UX. Features an integrated **Interactive Terminal Mode** simulating a real command-line environment.
- **Ops/TI Portfolio:** Focused on Infrastructure, Networking, and Automation.

It features a custom-built theme system that switches styles dynamically based on the active route, providing a tailored experience for different professional audiences.

## 🛠️ Tech Stack

- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [GSAP](https://greensock.com/gsap/) & [Framer Motion](https://www.framer.com/motion/)
- **State Management:** React Context API for themes and terminal state.

## ✨ Key Features

- 💻 **Interactive Terminal Mode:** A fully functional mock terminal interface for the Developer portfolio. Users can interact via commands like `ls`, `cat`, and `theme`. Includes autocomplete (`Tab`) and history (`↑`/`↓`).
- 🎨 **Terminal Theme Customizer:** An interactive CLI wizard that allows users to change light and dark color palettes dynamically. Preferences are persisted in `localStorage`.
- 🌓 **Dynamic Theming:** Route-based theme switching (Hub, Dev, TI).
- 📱 **Fully Responsive:** Optimized for all screen sizes with a mobile-first approach. Custom UI handling for touch devices.
- 🎭 **Immersive Animations:** GSAP ScrollTrigger and Framer Motion for high-end interactions.
- ⚙️ **Data-Driven Configuration:** Content is strictly separated from presentation through strongly typed configuration files (`dev-config.ts`, `ti-config.ts`), making content updates trivial.
- 🔍 **SEO Optimized:** Metadata and Schema.org JSON-LD structured data included.

## 🧩 Developer Guide

### How to Add New Color Palettes
The interactive terminal features a built-in theme wizard. To add a new palette (e.g., a new Dark Theme), follow these steps:

1. Open `src/context/ThemeCustomContext.tsx`.
2. Add your new palette to the `DARK_PALETTES` (or `LIGHT_PALETTES`) array:
   ```typescript
   export const DARK_PALETTES = [
     // ... existing palettes
     { id: "d6", name: "Neon Matrix", bg: "#000000", acc: "#00ff00", fg: "#ffffff" },
   ];
   ```
3. Update the `PALETTE_VARS` dictionary with your specific CSS variable mappings:
   ```typescript
   const PALETTE_VARS = {
     // ... existing variables
     d6: { bg: "#000000", fg: "#ffffff", acc: "#00ff00", card: "#111111", border: "#00ff00", shadow: "#00ff00" },
   };
   ```
4. Add your new `id` (`"d6"`) to the `PaletteId` type definition at the top of the file so TypeScript allows it.

### How to Modify Content
All textual content, projects, and experiences are strictly separated from UI components.
- **Developer Persona:** Edit `src/data/dev-config.ts`.
- **Ops/TI Persona:** Edit `src/data/ti-config.ts`.
- **Global Hub/SEO:** Edit `src/data/seo-config.ts`.

Both configuration files satisfy the `PortfolioContent` type (`src/types/content.ts`). If you want to add new fields (like a new social link or metadata), add the type to `PortfolioContent` first, then update both configs.

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

4. Build for production:
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
