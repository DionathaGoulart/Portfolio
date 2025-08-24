import { ThemeConfig } from '../../types/theme.types'

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
    primary: '96 165 250', // #60a5fa -> rgb
    secondary: '148 163 184', // #94a3b8 -> rgb
    accent: '167 139 250', // #a78bfa -> rgb
    background: '15 23 42', // #0f172a -> rgb
    surface: '30 41 59', // #1e293b -> rgb
    text: '248 250 252', // #f8fafc -> rgb
    textSecondary: '15 23 42', // #0f172a -> rgb
    border: '51 65 85', // #334155 -> rgb
    error: '248 113 113', // #f87171 -> rgb
    success: '74 222 128', // #4ade80 -> rgb
    warning: '251 191 36' // #fbbf24 -> rgb
  }
}

export const themes = {
  light: lightTheme,
  dark: darkTheme
} as const
