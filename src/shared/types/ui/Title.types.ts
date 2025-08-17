// ============================================================================
// TYPES DE COMPONENTES - Typography (Title)
// ============================================================================

import { TitleLevel } from './global.types'

export type FontWeight = 'normal' | 'semibold' | 'bold'
export type ElementType = TitleLevel | 'span'

// ============================================================================
// CONSTANTES DE ESTILOS - PADRONIZADAS para Títulos
// ============================================================================

// Escala tipográfica para títulos
export const titleLevelStyles: Record<TitleLevel, string> = {
  h1: 'text-8xl',
  h2: 'text-5xl',
  h3: 'text-3xl',
  h4: 'text-xl',
  h5: 'text-lg'
}

// Classes de peso da fonte
export const fontWeightClasses: Record<FontWeight, string> = {
  normal: 'font-normal',
  semibold: 'font-semibold',
  bold: 'font-bold'
}
