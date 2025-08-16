import React from 'react'
import {
  TitleLevel,
  Align,
  ThemeColor,
  colorClasses,
  alignClasses
} from '../types/ui'

// ============================================================================
// TITLE COMPONENT - Otimizado com escalas mais harmoniosas
// ============================================================================

interface TitleProps {
  level?: TitleLevel
  align?: Align
  color?: ThemeColor
  children: React.ReactNode
  className?: string
  id?: string
}

// Escala tipográfica mais harmoniosa e consistente
const levelStyles: Record<TitleLevel, string> = {
  h1: 'text-4xl font-bold', // Reduzido de text-8xl (muito grande)
  h2: 'text-3xl font-semibold', // Reduzido de text-5xl
  h3: 'text-2xl font-semibold', // Aumentado de text-xl
  h4: 'text-xl font-medium', // Aumentado de text-base
  h5: 'text-lg font-medium' // Aumentado de text-sm
}

export const Title: React.FC<TitleProps> = ({
  level = 'h1',
  align = 'start',
  color = 'text',
  children,
  className = '',
  id
}) => {
  const Element = level

  const combinedClasses = [
    levelStyles[level],
    colorClasses[color],
    alignClasses[align],
    'theme-transition',
    className
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Element className={combinedClasses} id={id}>
      {children}
    </Element>
  )
}
