// ============================================================================
// TYPES DE COMPONENTES - Typography (Title)
// ============================================================================

import { Align, ThemeColor, TitleLevel } from './global.types'

export type FontWeight = 'normal' | 'semibold' | 'bold'
export type ElementType = TitleLevel | 'span'

// ============================================================================
// CONSTANTES DE ESTILOS - PADRONIZADAS para Títulos
// ============================================================================

// Classes de peso da fonte
export const fontWeightClasses: Record<FontWeight, string> = {
  normal: 'font-normal',
  semibold: 'font-semibold',
  bold: 'font-bold'
}

export interface TitleProps {
  level?: TitleLevel
  element?: ElementType
  align?: Align
  color?: ThemeColor
  children: React.ReactNode
  className?: string
  id?: string
  uppercase?: boolean
  weight?: FontWeight
}

// Escala tipográfica
export const levelStyles: Record<TitleLevel, string> = {
  h1: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl',
  h2: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl',
  h3: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl',
  h4: 'text-lg sm:text-xl md:text-2xl',
  h5: 'text-base sm:text-lg'
}
