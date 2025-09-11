import { useState } from 'react'
import { Theme } from '@features/Theme/types'

// ================================
// Constants
// ================================

const THEME_STORAGE_KEY = 'app-theme'

// ================================
// Theme Detection Hook
// ================================

/**
 * Hook for automatic theme detection with fallback strategy:
 * 1. Check localStorage for saved preference
 * 2. Detect system preference
 * 3. Use provided default theme
 *
 * @param defaultTheme - Default theme to use if no preference is found
 * @returns Object with theme state and control functions
 */
export function useThemeDetection(defaultTheme: Theme = 'light') {
  const [theme, setTheme] = useState<Theme>(() => {
    // 1. Verifica localStorage primeiro
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      return savedTheme
    }

    // 2. Detecção automática do tema do sistema
    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }

    // 3. Fallback para tema padrão
    return defaultTheme
  })

  const [isSystemTheme, setIsSystemTheme] = useState(() => {
    return !localStorage.getItem(THEME_STORAGE_KEY)
  })

  return {
    theme,
    setTheme,
    isSystemTheme,
    setIsSystemTheme,
    THEME_STORAGE_KEY
  }
}
