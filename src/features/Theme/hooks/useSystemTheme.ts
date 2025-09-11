import { useEffect } from 'react'
import { Theme } from '@features/Theme/types'

// ================================
// Hook Interface
// ================================

interface UseSystemThemeProps {
  isSystemTheme: boolean
  setTheme: (theme: Theme) => void
}

// ================================
// System Theme Hook
// ================================

/**
 * Hook that listens to system theme changes and updates the theme accordingly
 * Only active when isSystemTheme is true
 *
 * @param isSystemTheme - Whether to listen for system theme changes
 * @param setTheme - Function to update the current theme
 */
export function useSystemTheme({
  isSystemTheme,
  setTheme
}: UseSystemThemeProps) {
  useEffect(() => {
    if (!isSystemTheme) return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [isSystemTheme, setTheme])
}
