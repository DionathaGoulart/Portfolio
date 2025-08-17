import React from 'react'
import {
  TitleLevel,
  Align,
  ThemeColor,
  colorClasses,
  alignClasses
} from '@shared/types'

type FontWeight = 'bold' | 'semibold' | 'normal'
type ElementType = TitleLevel | 'span'

interface TitleProps {
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
const levelStyles: Record<TitleLevel, string> = {
  h1: 'text-8xl',
  h2: 'text-5xl',
  h3: 'text-3xl',
  h4: 'text-xl',
  h5: 'text-lg'
}

// Classes de peso da fonte
const fontWeightClasses: Record<FontWeight, string> = {
  bold: 'font-bold',
  semibold: 'font-semibold',
  normal: 'font-normal'
}

export const Title: React.FC<TitleProps> = ({
  level = 'h1',
  element,
  align = 'start',
  color = 'text',
  children,
  className = '',
  id,
  uppercase = false,
  weight = 'bold'
}) => {
  // Define o elemento HTML a ser usado
  const Element = element || level

  const combinedClasses = [
    levelStyles[level],
    fontWeightClasses[weight],
    colorClasses[color],
    alignClasses[align],
    uppercase ? 'uppercase' : '',
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
