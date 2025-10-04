import React, { createContext, useContext } from 'react'

import { themes } from '@features/Theme/config'
import {
  useThemeDetection,
  useSystemTheme,
  useThemePersistence
} from '@features/Theme/hooks'
import { Theme, ThemeContextType, ThemeProviderProps } from '../types'

// ================================
// CONTEXT CREATION
// ================================

/**
 * Contexto de tema para gerenciamento global de temas
 * Fornece estado do tema e funções de controle para toda a aplicação
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// ================================
// THEME PROVIDER COMPONENT
// ================================

/**
 * Componente ThemeProvider que gerencia estado do tema e fornece contexto de tema
 * Integra detecção automática, persistência e sincronização com tema do sistema
 *
 * @param {ThemeProviderProps} props - Propriedades do provider
 * @returns {JSX.Element} Provider de tema renderizado
 */
export function ThemeProvider({
  children,
  defaultTheme = 'light'
}: ThemeProviderProps) {
  // ================================
  // HOOKS
  // ================================

  const {
    theme,
    setTheme: setThemeState,
    isSystemTheme,
    setIsSystemTheme,
    THEME_STORAGE_KEY
  } = useThemeDetection(defaultTheme)

  // Escuta mudanças no tema do sistema
  useSystemTheme({ isSystemTheme, setTheme: setThemeState })

  // Persiste tema e aplica CSS
  const colors = themes[theme as keyof typeof themes].colors
  useThemePersistence({
    theme,
    colors,
    isSystemTheme,
    storageKey: THEME_STORAGE_KEY
  })

  // ================================
  // FUNÇÕES DE CONTROLE DO TEMA
  // ================================

  /**
   * Alterna entre tema claro e escuro
   */
  const toggleTheme = (): void => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setThemeState(newTheme)
    setIsSystemTheme(false) // Desabilita tema automático ao alternar manualmente
  }

  /**
   * Define um tema específico
   * @param {Theme} newTheme - Novo tema a ser definido
   */
  const setTheme = (newTheme: Theme): void => {
    setThemeState(newTheme)
    setIsSystemTheme(false) // Desabilita tema automático ao definir manualmente
  }

  /**
   * Habilita sincronização com tema do sistema
   */
  const enableSystemTheme = (): void => {
    setIsSystemTheme(true)
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light'
    setThemeState(systemTheme)
  }

  // ================================
  // VALOR DO CONTEXTO
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
// THEME HOOK
// ================================

/**
 * Hook para acessar contexto de tema
 * @returns {ThemeContextType} Contexto de tema
 * @throws {Error} Se usado fora de um ThemeProvider
 */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider')
  }
  return context
}
