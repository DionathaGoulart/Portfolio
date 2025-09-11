// ================================
// Theme Types & Interfaces
// ================================

export type Theme = 'light' | 'dark'

/**
 * Theme color configuration interface
 * Colors are stored as RGB values without the 'rgb()' wrapper
 */
export interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  background: string
  surface: string
  text: string
  textSecondary: string
  border: string
  error: string
  success: string
  warning: string
}

/**
 * Complete theme configuration including name and colors
 */
export interface ThemeConfig {
  name: Theme
  colors: ThemeColors
}

/**
 * Theme context interface providing all theme-related functionality
 */
export interface ThemeContextType {
  theme: Theme
  colors: ThemeColors
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
  enableSystemTheme: () => void
  isSystemTheme: boolean
  isDarkMode: boolean
}
