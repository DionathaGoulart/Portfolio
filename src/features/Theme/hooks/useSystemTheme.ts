import { useEffect } from 'react'
import { UseSystemThemeProps } from '../types/ThemeHooks.types'

// ================================
// System Theme Hook
// ================================

/**
 * Hook que escuta mudanças no tema do sistema e atualiza o tema correspondente
 * Só é ativo quando isSystemTheme é true
 *
 * @param {UseSystemThemeProps} props - Propriedades do hook
 * @param {boolean} props.isSystemTheme - Se deve escutar mudanças no tema do sistema
 * @param {function} props.setTheme - Função para atualizar o tema atual
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
