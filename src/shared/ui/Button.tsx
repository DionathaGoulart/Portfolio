import React from 'react'
import { Align, ButtonVariant, Size, ThemeColor } from '../types/ui'

// ============================================================================
// BUTTON COMPONENT - Otimizado
// ============================================================================

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

// Padding específico para botões (mais generoso que texto)
const buttonSizeStyles: Record<Size, string> = {
  pequeno: 'text-sm px-3 py-1.5',
  medio: 'text-base px-4 py-2', // Harmonizado com text-base
  grande: 'text-xl px-6 py-3'
}

const buttonAlignClasses: Record<Align, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end'
}

const solidColorClasses: Record<ThemeColor, string> = {
  primary: 'bg-theme-primary hover:opacity-90 text-white',
  secondary: 'bg-theme-secondary hover:opacity-90 text-white',
  accent: 'bg-theme-accent hover:opacity-90 text-white',
  text: 'bg-theme-text hover:opacity-90 text-theme-background',
  'text-secondary': 'bg-theme-text-secondary hover:opacity-90 text-white',
  error: 'bg-theme-error hover:opacity-90 text-white',
  success: 'bg-theme-success hover:opacity-90 text-white',
  warning: 'bg-theme-warning hover:opacity-90 text-white'
}

const outlineColorClasses: Record<ThemeColor, string> = {
  primary:
    'border-2 border-theme-primary theme-text-primary hover:bg-theme-primary hover:text-white',
  secondary:
    'border-2 border-theme-secondary theme-text-secondary hover:bg-theme-secondary hover:text-white',
  accent:
    'border-2 border-theme-accent theme-text-accent hover:bg-theme-accent hover:text-white',
  text: 'border-2 border-theme-text theme-text-primary hover:bg-theme-text hover:text-theme-background',
  'text-secondary':
    'border-2 border-theme-text-secondary theme-text-secondary hover:bg-theme-text-secondary hover:text-white',
  error:
    'border-2 border-theme-error theme-text-error hover:bg-theme-error hover:text-white',
  success:
    'border-2 border-theme-success theme-text-success hover:bg-theme-success hover:text-white',
  warning:
    'border-2 border-theme-warning theme-text-warning hover:bg-theme-warning hover:text-white'
}

const ghostColorClasses: Record<ThemeColor, string> = {
  primary: 'theme-text-primary hover:bg-theme-primary hover:bg-opacity-10',
  secondary:
    'theme-text-secondary hover:bg-theme-secondary hover:bg-opacity-10',
  accent: 'theme-text-accent hover:bg-theme-accent hover:bg-opacity-10',
  text: 'theme-text-primary hover:bg-theme-text hover:bg-opacity-10',
  'text-secondary':
    'theme-text-secondary hover:bg-theme-text-secondary hover:bg-opacity-10',
  error: 'theme-text-error hover:bg-theme-error hover:bg-opacity-10',
  success: 'theme-text-success hover:bg-theme-success hover:bg-opacity-10',
  warning: 'theme-text-warning hover:bg-theme-warning hover:bg-opacity-10'
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
        return outlineColorClasses[color]
      case 'ghost':
        return ghostColorClasses[color]
      default:
        return solidColorClasses[color]
    }
  }

  const buttonClasses = [
    buttonSizeStyles[size],
    getColorClasses(),
    'rounded-md font-medium transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-primary',
    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    className
  ]
    .filter(Boolean)
    .join(' ')

  const containerClasses = ['flex', buttonAlignClasses[align]].join(' ')

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
