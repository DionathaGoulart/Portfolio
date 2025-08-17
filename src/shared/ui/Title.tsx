import React from 'react'
import {
  TitleProps,
  levelStyles,
  fontWeightClasses,
  colorClasses,
  alignClasses
} from '@shared/types'

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
