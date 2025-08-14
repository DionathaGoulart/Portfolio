import { ThemeConfig } from '../../types/theme'

export const lightTheme: ThemeConfig = {
  name: 'light',
  colors: {
    primary: '#3b82f6', // blue-500
    secondary: '#64748b', // slate-500
    accent: '#8b5cf6', // violet-500
    background: '#ffffff', // white
    surface: '#f8fafc', // slate-50
    text: '#0f172a', // slate-900
    textSecondary: '#64748b', // slate-500
    border: '#e2e8f0', // slate-200
    error: '#ef4444', // red-500
    success: '#22c55e', // green-500
    warning: '#f59e0b' // amber-500
  }
}

export const darkTheme: ThemeConfig = {
  name: 'dark',
  colors: {
    primary: '#60a5fa', // blue-400
    secondary: '#94a3b8', // slate-400
    accent: '#a78bfa', // violet-400
    background: '#0f172a', // slate-900
    surface: '#1e293b', // slate-800
    text: '#f8fafc', // slate-50
    textSecondary: '#cbd5e1', // slate-300
    border: '#334155', // slate-700
    error: '#f87171', // red-400
    success: '#4ade80', // green-400
    warning: '#fbbf24' // amber-400
  }
}

export const themes = {
  light: lightTheme,
  dark: darkTheme
} as const
