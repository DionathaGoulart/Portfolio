import { useState } from 'react'

import { Theme } from '../types'
import { UseThemeDetectionReturn } from '../types/ThemeHooks.types'

// ================================
// CONSTANTS
// ================================

/**
 * Chave para armazenamento do tema no localStorage
 */
const THEME_STORAGE_KEY = 'app-theme'

// ================================
// THEME DETECTION HOOK
// ================================

/**
 * Hook para detecção automática de tema com estratégia de fallback:
 * 1. Verifica localStorage para preferência salva
 * 2. Detecta preferência do sistema
 * 3. Usa tema padrão fornecido
 *
 * @param {Theme} defaultTheme - Tema padrão a usar se nenhuma preferência for encontrada
 * @returns {UseThemeDetectionReturn} Objeto com estado do tema e funções de controle
 */
export function useThemeDetection(defaultTheme: Theme = 'light'): UseThemeDetectionReturn {
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
