import React from 'react'
import {
  Align,
  alignClasses,
  colorClasses,
  Size,
  sizeStyles,
  TextElement,
  ThemeColor
} from '../types/ui'

// ============================================================================
// TEXT COMPONENT - Harmonizado
// ============================================================================

interface TextProps {
  as?: TextElement
  size?: Size
  align?: Align
  color?: ThemeColor
  children: React.ReactNode
  className?: string
  id?: string
}

export const Text: React.FC<TextProps> = ({
  as = 'p',
  size = 'medio',
  align = 'start',
  color = 'text',
  children,
  className = '',
  id
}) => {
  const Element = as

  const combinedClasses = [
    sizeStyles[size],
    colorClasses[color],
    alignClasses[align],
    as === 'span' ? 'inline-block w-full' : '',
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

// Componentes específicos para facilitar o uso
export const P: React.FC<Omit<TextProps, 'as'>> = (props) => (
  <Text as="p" {...props} />
)

export const Span: React.FC<Omit<TextProps, 'as'>> = (props) => (
  <Text as="span" {...props} />
)
