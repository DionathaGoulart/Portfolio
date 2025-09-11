import { useTheme } from '@features/Theme/contexts'

// ================================
// Theme Utils Hook
// ================================

/**
 * Hook that provides theme utilities for advanced styling operations
 * Includes gradient generation, shadow creation, opacity handling, and conditional borders
 */
export function useThemeUtils() {
  const { colors, theme, isDarkMode } = useTheme()

  // ================================
  // Utility Functions
  // ================================

  const utils = {
    // Para gradientes dinâmicos
    gradient: (color1: string, color2: string, direction = '45deg') =>
      `linear-gradient(${direction}, ${color1}, ${color2})`,

    // Para sombras baseadas no tema
    shadow: (intensity: 'sm' | 'md' | 'lg' = 'md') => {
      const shadows = {
        sm: isDarkMode
          ? '0 2px 4px rgba(0,0,0,0.3)'
          : '0 2px 4px rgba(0,0,0,0.1)',
        md: isDarkMode
          ? '0 4px 8px rgba(0,0,0,0.3)'
          : '0 4px 8px rgba(0,0,0,0.1)',
        lg: isDarkMode
          ? '0 8px 16px rgba(0,0,0,0.4)'
          : '0 8px 16px rgba(0,0,0,0.15)'
      }
      return shadows[intensity]
    },

    // Para cores com opacidade
    withOpacity: (color: string, opacity: number) =>
      `${color}${Math.round(opacity * 255)
        .toString(16)
        .padStart(2, '0')}`,

    // Para bordas condicionais
    border: (condition: boolean, color = colors.primary) =>
      condition ? `2px solid ${color}` : `1px solid ${colors.border}`
  }

  return {
    colors,
    theme,
    isDarkMode,
    utils
  }
}
