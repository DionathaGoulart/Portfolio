export type Theme = 'light' | 'dark'

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

export interface ThemeConfig {
  name: Theme
  colors: ThemeColors
}

export interface ThemeContextType {
  theme: Theme
  colors: ThemeColors
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
  enableSystemTheme: () => void
  isSystemTheme: boolean
  isDarkMode: boolean
}
