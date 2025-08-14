import { createContext, ReactNode, useContext } from 'react'
import { Theme, ThemeContextType } from '@shared'
import { themes } from '@shared'
import { useSystemTheme, useThemeDetection, useThemePersistence } from '@shared'

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: Theme
}

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

  // Escuta mudanças do sistema
  useSystemTheme({ isSystemTheme, setTheme: setThemeState })

  // Persiste tema e aplica CSS
  const colors = themes[theme].colors
  useThemePersistence({
    theme,
    colors,
    isSystemTheme,
    storageKey: THEME_STORAGE_KEY
  })

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setThemeState(newTheme)
    setIsSystemTheme(false) // Desabilita tema automático ao fazer toggle manual
  }

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    setIsSystemTheme(false) // Desabilita tema automático ao definir manualmente
  }

  const enableSystemTheme = () => {
    setIsSystemTheme(true)
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light'
    setThemeState(systemTheme)
  }

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

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider')
  }
  return context
}
