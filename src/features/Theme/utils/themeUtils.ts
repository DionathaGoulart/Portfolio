import { Theme, RgbColor } from '../types'

// ================================
// Theme Utilities
// ================================

export const themeUtils = {
  /**
   * Gera classes CSS com sufixo de tema
   * @param {string} baseClass - Classe CSS base
   * @param {Theme} theme - Tema atual
   * @returns {string} Classe CSS com tema aplicado
   */
  getThemeClass: (baseClass: string, theme: Theme) => `${baseClass} ${theme}`,

  /**
   * Adiciona opacidade a uma cor usando notação hex com alpha
   * @param {string} color - Cor em formato hex
   * @param {number} opacity - Opacidade entre 0 e 1
   * @returns {string} Cor com opacidade aplicada
   */
  withOpacity: (color: string, opacity: number) =>
    `${color}${Math.round(opacity * 255)
      .toString(16)
      .padStart(2, '0')}`,

  /**
   * Converte tema para boolean para verificações de modo escuro
   * @param {Theme} theme - Tema a verificar
   * @returns {boolean} True se for tema escuro
   */
  isDark: (theme: Theme) => theme === 'dark',

  /**
   * Alterna entre temas claro e escuro
   * @param {Theme} currentTheme - Tema atual
   * @returns {Theme} Tema alternado
   */
  toggle: (currentTheme: Theme): Theme =>
    currentTheme === 'light' ? 'dark' : 'light',

  /**
   * Detecta preferência de esquema de cores do sistema
   * @returns {Theme} Preferência do sistema
   */
  getSystemPreference: (): Theme =>
    window.matchMedia?.('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light',

  // ================================
  // Color Manipulation Functions
  // ================================

  /**
   * Converte cor hex para objeto RGB
   * @param {string} hex - Cor em formato hex (#RRGGBB ou RRGGBB)
   * @returns {RgbColor | null} Objeto RGB ou null se formato inválido
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
   * Cria uma variação mais clara de uma cor
   * @param {string} color - Cor em formato hex
   * @param {number} amount - Quantidade para clarear (0-255)
   * @returns {string} Cor clareada em formato RGB
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
   * Cria uma variação mais escura de uma cor
   * @param {string} color - Cor em formato hex
   * @param {number} amount - Quantidade para escurecer (0-255)
   * @returns {string} Cor escurecida em formato RGB
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
