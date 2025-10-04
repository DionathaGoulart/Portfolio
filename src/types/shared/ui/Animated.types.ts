// ================================
// ANIMATED COMPONENT TYPES
// ================================

import { ReactNode } from 'react'
import { easingOptions } from 'aos'

/**
 * Tipos de animação disponíveis no AOS (Animate On Scroll)
 */
export type AosAnimationTypes =
  | 'fade'
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'fade-up-right'
  | 'fade-up-left'
  | 'fade-down-right'
  | 'fade-down-left'
  | 'flip-up'
  | 'flip-down'
  | 'flip-left'
  | 'flip-right'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'zoom-in'
  | 'zoom-in-up'
  | 'zoom-in-down'
  | 'zoom-in-left'
  | 'zoom-in-right'
  | 'zoom-out'
  | 'zoom-out-up'
  | 'zoom-out-down'
  | 'zoom-out-left'
  | 'zoom-out-right'

/**
 * Props para o componente AnimatedContainer
 */
export interface AnimatedContainerProps {
  /** Conteúdo a ser renderizado */
  children: ReactNode
  /** Tipo de animação AOS */
  animationType?: AosAnimationTypes
  /** Duração da animação em milissegundos */
  duration?: number
  /** Delay antes da animação começar */
  delay?: number
  /** Função de easing da animação */
  easing?: easingOptions
  /** Offset para trigger da animação */
  offset?: number
  /** Classes CSS adicionais */
  className?: string
}
