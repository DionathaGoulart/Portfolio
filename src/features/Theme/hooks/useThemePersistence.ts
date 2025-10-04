import { useEffect } from 'react'
import { Theme, ThemeColors } from '../types'
import { UseThemePersistenceProps } from '../types/ThemeHooks.types'

// ================================
// Theme Persistence Hook
// ================================

/**
 * Hook que gerencia persistência do tema e aplicação de CSS
 * - Salva tema no localStorage quando não está usando tema do sistema
 * - Aplica classes CSS e propriedades customizadas ao documento
 *
 * @param {UseThemePersistenceProps} props - Propriedades do hook
 * @param {Theme} props.theme - Tema atual
 * @param {ThemeColors} props.colors - Configuração de cores do tema
 * @param {boolean} props.isSystemTheme - Se está usando preferência de tema do sistema
 * @param {string} props.storageKey - Chave do localStorage para persistência do tema
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
      root.style.setProperty(`--color-${key}`, value as string)
    })
  }, [theme, colors, isSystemTheme, storageKey])
}
