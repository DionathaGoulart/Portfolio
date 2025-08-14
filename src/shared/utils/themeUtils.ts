import { Theme } from '@shared'

export const themeUtils = {
  // Gera classes CSS dinâmicas
  getThemeClass: (baseClass: string, theme: Theme) => `${baseClass} ${theme}`,

  // Interpola cores com opacidade
  withOpacity: (color: string, opacity: number) =>
    `${color}${Math.round(opacity * 255)
      .toString(16)
      .padStart(2, '0')}`,

  // Converte tema para booleano
  isDark: (theme: Theme) => theme === 'dark',

  // Toggle tema
  toggle: (currentTheme: Theme): Theme =>
    currentTheme === 'light' ? 'dark' : 'light',

  // Detecta preferência do sistema
  getSystemPreference: (): Theme =>
    window.matchMedia?.('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light',

  // Converte hex para RGB
  hexToRgb: (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : null
  },

  // Gera variação de cor mais clara
  lighten: (color: string, amount: number) => {
    const rgb = themeUtils.hexToRgb(color)
    if (!rgb) return color

    const { r, g, b } = rgb
    const newR = Math.min(255, r + amount)
    const newG = Math.min(255, g + amount)
    const newB = Math.min(255, b + amount)

    return `rgb(${newR}, ${newG}, ${newB})`
  },

  // Gera variação de cor mais escura
  darken: (color: string, amount: number) => {
    const rgb = themeUtils.hexToRgb(color)
    if (!rgb) return color

    const { r, g, b } = rgb
    const newR = Math.max(0, r - amount)
    const newG = Math.max(0, g - amount)
    const newB = Math.max(0, b - amount)

    return `rgb(${newR}, ${newG}, ${newB})`
  }
}
