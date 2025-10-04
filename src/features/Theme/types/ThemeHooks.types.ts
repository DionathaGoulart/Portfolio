// ================================
// THEME HOOKS TYPES
// ================================

import { Theme, ThemeColors } from './theme.types'

/**
 * Props para o hook useSystemTheme
 */
export interface UseSystemThemeProps {
  /** Se deve escutar mudanças do tema do sistema */
  isSystemTheme: boolean
  /** Função para atualizar o tema */
  setTheme: (theme: Theme) => void
}

/**
 * Props para o hook useThemePersistence
 */
export interface UseThemePersistenceProps {
  /** Tema atual */
  theme: Theme
  /** Configuração de cores do tema */
  colors: ThemeColors
  /** Se está usando tema do sistema */
  isSystemTheme: boolean
  /** Chave para armazenamento no localStorage */
  storageKey: string
}

/**
 * Retorno do hook useThemeDetection
 */
export interface UseThemeDetectionReturn {
  /** Tema atual */
  theme: Theme
  /** Função para definir tema */
  setTheme: (theme: Theme) => void
  /** Se está usando tema do sistema */
  isSystemTheme: boolean
  /** Função para definir uso do tema do sistema */
  setIsSystemTheme: (isSystem: boolean) => void
  /** Chave de armazenamento */
  THEME_STORAGE_KEY: string
}

/**
 * Props para o componente ThemeProvider
 */
export interface ThemeProviderProps {
  /** Componentes filhos para envolver com contexto de tema */
  children: React.ReactNode
  /** Tema padrão a usar se nenhuma preferência for encontrada */
  defaultTheme?: Theme
}
