import { createContext, ReactNode, useContext } from 'react'
import { themes } from '@features/Theme/config'
import {
  useThemeDetection,
  useSystemTheme,
  useThemePersistence
} from '@features/Theme/hooks'
import { Theme, ThemeContextType } from '@features/Theme/types'

// ================================
// Context Creation
// ================================

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// ================================
// Provider Interface
// ================================

interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: Theme
}

// ================================
// Theme Provider Component
// ================================

/**
 * ThemeProvider component that manages theme state and provides theme context
 *
 * @param children - React children to wrap with theme context
 * @param defaultTheme - Default theme to use if no preference is found
 */
export function ThemeProvider({
  children,
  defaultTheme = 'light'
}: ThemeProviderProps) {
  const {
    theme,
    setTheme: setThemeState,
    isSystemTheme,
    setIsSystemTheme,
    THEME_STORAGE_KEY
  } = useThemeDetection(defaultTheme)

  // Listen for system theme changes
  useSystemTheme({ isSystemTheme, setTheme: setThemeState })

  // Persist theme and apply CSS
  const colors = themes[theme].colors
  useThemePersistence({
    theme,
    colors,
    isSystemTheme,
    storageKey: THEME_STORAGE_KEY
  })

  // ================================
  // Theme Control Functions
  // ================================

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setThemeState(newTheme)
    setIsSystemTheme(false) // Disable automatic theme when toggling manually
  }

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    setIsSystemTheme(false) // Disable automatic theme when setting manually
  }

  const enableSystemTheme = () => {
    setIsSystemTheme(true)
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light'
    setThemeState(systemTheme)
  }

  // ================================
  // Context Value
  // ================================

  const value: ThemeContextType = {
    theme,
    colors,
    toggleTheme,
    setTheme,
    enableSystemTheme,
    isSystemTheme,
    isDarkMode: theme === 'dark'
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

// ================================
// Theme Hook
// ================================

/**
 * Hook to access theme context
 * @throws Error if used outside of ThemeProvider
 */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider')
  }
  return context
}
