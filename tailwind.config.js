/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Cores dinâmicas usando CSS variables
        'theme-primary': 'var(--color-primary)',
        'theme-secondary': 'var(--color-secondary)',
        'theme-accent': 'var(--color-accent)',
        'theme-background': 'var(--color-background)',
        'theme-surface': 'var(--color-surface)',
        'theme-text': 'var(--color-text)',
        'theme-text-secondary': 'var(--color-textSecondary)',
        'theme-border': 'var(--color-border)',
        'theme-error': 'var(--color-error)',
        'theme-success': 'var(--color-success)',
        'theme-warning': 'var(--color-warning)',
      },
      transitionProperty: {
        'theme': 'background-color, color, border-color',
      }
    },
  },
  plugins: [],
}
