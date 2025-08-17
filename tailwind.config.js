export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Cores com suporte a alpha
        'theme-primary': 'rgb(var(--color-primary) / <alpha-value>)',
        'theme-secondary': 'rgb(var(--color-secondary) / <alpha-value>)',
        'theme-accent': 'rgb(var(--color-accent) / <alpha-value>)',
        'theme-background': 'rgb(var(--color-background) / <alpha-value>)',
        'theme-surface': 'rgb(var(--color-surface) / <alpha-value>)',
        'theme-text': 'rgb(var(--color-text) / <alpha-value>)',
        'theme-text-secondary': 'rgb(var(--color-textSecondary) / <alpha-value>)',
        'theme-border': 'rgb(var(--color-border) / <alpha-value>)',
        'theme-error': 'rgb(var(--color-error) / <alpha-value>)',
        'theme-success': 'rgb(var(--color-success) / <alpha-value>)',
        'theme-warning': 'rgb(var(--color-warning) / <alpha-value>)',
      },
      transitionProperty: {
        'theme': 'background-color, color, border-color',
      }
    },
  },
  plugins: [],
}
