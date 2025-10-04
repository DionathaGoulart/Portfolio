import { ThemeConfig } from '../types'

// ================================
// Theme Configurations
// ================================

export const lightTheme: ThemeConfig = {
  name: 'light',
  colors: {
    primary: '247 150 102', // #F79666 -> rgb
    secondary: '118 102 96', // #766660 -> rgb
    accent: '124 77 255', // #7C4DFF -> rgb
    background: '255 251 245', // #FFFBF5 -> rgb
    surface: '249 243 234', // #F9F3EA -> rgb
    text: '38 29 23', // #261D17 -> rgb
    textSecondary: '255 251 245', // #FFFBF5 -> rgb
    border: '221 217 210', // #DDD9D2 -> rgb
    error: '239 68 68', // #EF4444 -> rgb
    success: '34 197 94', // #22C55E -> rgb
    warning: '255 193 7' // #FFC107 -> rgb
  }
}

export const darkTheme: ThemeConfig = {
  name: 'dark',
  colors: {
    primary: '137 180 250', // #89b4fa (blue) -> rgb
    secondary: '186 194 220', // #bac2de (subtext0) -> rgb
    accent: '245 194 231', // #f5c2e7 (pink) -> rgb
    background: '30 30 46', // #1e1e2e (base) -> rgb
    surface: '49 50 68', // #313244 (surface0) -> rgb
    text: '205 214 244', // #cdd6f4 (text) -> rgb
    textSecondary: '30 30 46', // #1e1e2e (base) -> rgb
    border: '69 71 90', // #45475a (surface1) -> rgb
    error: '243 139 168', // #f38ba8 (red) -> rgb
    success: '166 227 161', // #a6e3a1 (green) -> rgb
    warning: '255 128 64' // #fab387 (peach) -> rgb
  }
}

export const themes = {
  light: lightTheme,
  dark: darkTheme
} as const
