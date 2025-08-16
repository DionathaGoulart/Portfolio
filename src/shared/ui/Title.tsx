import React from 'react'

// Tipos para os elementos de título
type TitleLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5'

// Tipos para alinhamento
type TitleAlign = 'start' | 'center' | 'end'

// Tipos para as cores do tema
type ThemeColor =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'text'
  | 'text-secondary'
  | 'error'
  | 'success'
  | 'warning'

// Interface das props do componente
interface TitleProps {
  level?: TitleLevel
  align?: TitleAlign
  color?: ThemeColor
  children: React.ReactNode
  className?: string
  id?: string
}

// Mapeamento dos níveis para classes do Tailwind
const levelStyles: Record<TitleLevel, string> = {
  h1: 'text-8xl font-bold',
  h2: 'text-5xl font-semibold',
  h3: 'text-xl font-medium',
  h4: 'text-base font-medium',
  h5: 'text-sm font-normal'
}

// Mapeamento das cores do tema
const colorClasses: Record<ThemeColor, string> = {
  primary: 'theme-text-primary',
  secondary: 'theme-text-secondary',
  accent: 'theme-text-accent',
  text: 'theme-text-primary',
  'text-secondary': 'theme-text-secondary',
  error: 'theme-text-error',
  success: 'theme-text-success',
  warning: 'theme-text-warning'
}

// Mapeamento do alinhamento
const alignClasses: Record<TitleAlign, string> = {
  start: 'text-left',
  center: 'text-center',
  end: 'text-right'
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
