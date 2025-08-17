import React from 'react'
import {
  Align,
  ButtonVariant,
  Size,
  ThemeColor,
  buttonSizeStyles,
  flexAlignClasses,
  buttonSolidColorClasses,
  buttonOutlineColorClasses,
  buttonGhostColorClasses,
  buttonFocusRingClasses
} from '../types/ui'

interface ButtonProps {
  size?: Size
  align?: Align
  color?: ThemeColor
  variant?: ButtonVariant
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  children: React.ReactNode
  className?: string
  id?: string
}

export const Button: React.FC<ButtonProps> = ({
  size = 'medio',
  align = 'start',
  color = 'primary',
  variant = 'solid',
  onClick,
  disabled = false,
  type = 'button',
  children,
  className = '',
  id
}) => {
  const getColorClasses = (): string => {
    switch (variant) {
      case 'outline':
        return buttonOutlineColorClasses[color]
      case 'ghost':
        return buttonGhostColorClasses[color]
      default:
        return buttonSolidColorClasses[color]
    }
  }

  const buttonClasses = [
    buttonSizeStyles[size],
    getColorClasses(),
    'rounded-md font-medium transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    buttonFocusRingClasses[color],
    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    className
  ]
    .filter(Boolean)
    .join(' ')

  const containerClasses = ['flex', flexAlignClasses[align]].join(' ')

  return (
    <div className={containerClasses}>
      <button
        type={type}
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        className={buttonClasses}
        id={id}
      >
        {children}
      </button>
    </div>
  )
}
