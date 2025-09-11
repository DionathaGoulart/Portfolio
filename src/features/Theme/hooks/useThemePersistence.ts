import { useEffect } from 'react'
import { Theme, ThemeColors } from '@features/Theme/types'

// ================================
// Hook Interface
// ================================

interface UseThemePersistenceProps {
  theme: Theme
  colors: ThemeColors
  isSystemTheme: boolean
  storageKey: string
}

// ================================
// Theme Persistence Hook
// ================================

/**
 * Hook that handles theme persistence and CSS application
 * - Saves theme to localStorage when not using system theme
 * - Applies CSS classes and custom properties to document
 *
 * @param theme - Current theme
 * @param colors - Theme color configuration
 * @param isSystemTheme - Whether using system theme preference
 * @param storageKey - localStorage key for theme persistence
 */
export function useThemePersistence({
  theme,
  colors,
  isSystemTheme,
  storageKey
}: UseThemePersistenceProps) {
  useEffect(() => {
    // Salva no localStorage apenas se não for tema do sistema
    if (!isSystemTheme) {
      localStorage.setItem(storageKey, theme)
    } else {
      localStorage.removeItem(storageKey)
    }

    // Aplica classe CSS no documentElement
    document.documentElement.className = theme

    // Aplica variáveis CSS customizadas
    const root = document.documentElement
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value)
    })
  }, [theme, colors, isSystemTheme, storageKey])
}
