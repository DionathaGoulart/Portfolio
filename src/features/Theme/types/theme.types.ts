// ================================
// THEME TYPES & INTERFACES
// ================================

/**
 * Tipos de tema disponíveis
 */
export type Theme = 'light' | 'dark'

/**
 * Interface de configuração de cores do tema
 * Cores são armazenadas como valores RGB sem o wrapper 'rgb()'
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
 * Configuração completa do tema incluindo nome e cores
 */
export interface ThemeConfig {
  name: Theme
  colors: ThemeColors
}

/**
 * Interface do contexto de tema fornecendo toda funcionalidade relacionada ao tema
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

/**
 * Interface para cores RGB
 */
export interface RgbColor {
  r: number
  g: number
  b: number
}
