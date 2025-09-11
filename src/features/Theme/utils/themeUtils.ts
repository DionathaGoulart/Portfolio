import { Theme } from '@features/Theme/types'

// ================================
// Color Conversion Types
// ================================

interface RgbColor {
  r: number
  g: number
  b: number
}

// ================================
// Theme Utilities
// ================================

export const themeUtils = {
  /**
   * Generates CSS classes with theme suffix
   */
  getThemeClass: (baseClass: string, theme: Theme) => `${baseClass} ${theme}`,

  /**
   * Adds opacity to a color using hex alpha notation
   */
  withOpacity: (color: string, opacity: number) =>
    `${color}${Math.round(opacity * 255)
      .toString(16)
      .padStart(2, '0')}`,

  /**
   * Converts theme to boolean for dark mode checks
   */
  isDark: (theme: Theme) => theme === 'dark',

  /**
   * Toggles between light and dark themes
   */
  toggle: (currentTheme: Theme): Theme =>
    currentTheme === 'light' ? 'dark' : 'light',

  /**
   * Detects system color scheme preference
   */
  getSystemPreference: (): Theme =>
    window.matchMedia?.('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light',

  // ================================
  // Color Manipulation Functions
  // ================================

  /**
   * Converts hex color to RGB object
   */
  hexToRgb: (hex: string): RgbColor | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : null
  },

  /**
   * Creates a lighter variation of a color
   */
  lighten: (color: string, amount: number) => {
    const rgb = themeUtils.hexToRgb(color)
    if (!rgb) return color

    const { r, g, b } = rgb
    const newR = Math.min(255, r + amount)
    const newG = Math.min(255, g + amount)
    const newB = Math.min(255, b + amount)

    return `rgb(${newR}, ${newG}, ${newB})`
  },

  /**
   * Creates a darker variation of a color
   */
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
