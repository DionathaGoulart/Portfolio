import React from 'react'
import {
  alignClasses,
  colorClasses,
  sizeStyles,
  TextProps
} from '@shared/types'

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

// Componentes específicos
export const P: React.FC<Omit<TextProps, 'as'>> = (props) => (
  <Text as="p" {...props} />
)

export const Span: React.FC<Omit<TextProps, 'as'>> = (props) => (
  <Text as="span" {...props} />
)
