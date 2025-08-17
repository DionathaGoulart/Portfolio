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
        'theme-textSecondary': 'rgb(var(--color-textSecondary) / <alpha-value>)', // Adicionado para compatibilidade
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
  // Adiciona safelist para garantir que as classes sejam incluídas
  safelist: [
    // Cores de fundo
    'bg-theme-primary',
    'bg-theme-secondary',
    'bg-theme-accent',
    'bg-theme-text',
    'bg-theme-textSecondary',
    'bg-theme-error',
    'bg-theme-success',
    'bg-theme-warning',
    // Cores de texto
    'text-theme-primary',
    'text-theme-secondary',
    'text-theme-accent',
    'text-theme-text',
    'text-theme-textSecondary',
    'text-theme-error',
    'text-theme-success',
    'text-theme-warning',
    // Borders
    'border-theme-primary',
    'border-theme-secondary',
    'border-theme-accent',
    'border-theme-text',
    'border-theme-textSecondary',
    'border-theme-error',
    'border-theme-success',
    'border-theme-warning',
    // Background opacity variants
    'bg-opacity-10',
    // Border variants
    'border-2',
    // Classes utilitárias que podem ser necessárias
    'transform',
    'transition-all',
    'duration-200',
    'ease-in-out',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2'
  ]
}
