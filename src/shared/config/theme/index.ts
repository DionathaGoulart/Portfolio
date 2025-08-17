import { ThemeConfig } from '../../types/theme.types'

export const lightTheme: ThemeConfig = {
  name: 'light',
  colors: {
    primary: '59 130 246', // #3b82f6 -> rgb
    secondary: '100 116 139', // #64748b -> rgb
    accent: '139 92 246', // #8b5cf6 -> rgb
    background: '255 255 255', // #ffffff -> rgb
    surface: '248 250 252', // #f8fafc -> rgb
    text: '15 23 42', // #0f172a -> rgb
    textSecondary: '248 250 252', // #f8fafc -> rgb
    border: '226 232 240', // #e2e8f0 -> rgb
    error: '239 68 68', // #ef4444 -> rgb
    success: '34 197 94', // #22c55e -> rgb
    warning: '245 158 11' // #f59e0b -> rgb
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
