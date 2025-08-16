import React from 'react'

// Tipos para alinhamento
type CardAlign = 'start' | 'center' | 'end'

// Tipos para tamanho
type CardSize = 'pequeno' | 'medio' | 'grande'

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
interface HorizontalCardProps {
  title: string
  subtitle: string
  align?: CardAlign
  size?: CardSize
  titleColor?: ThemeColor
  subtitleColor?: ThemeColor
  className?: string
  onClick?: () => void
}

// Mapeamento dos tamanhos para classes do Tailwind
const sizeStyles: Record<
  CardSize,
  {
    container: string
    title: string
    subtitle: string
    padding: string
  }
> = {
  pequeno: {
    container: 'min-h-16',
    title: 'text-sm font-medium',
    subtitle: 'text-xs font-normal',
    padding: 'p-3'
  },
  medio: {
    container: 'min-h-20',
    title: 'text-base font-medium', // 16px
    subtitle: 'text-sm font-normal', // 14px
    padding: 'p-4'
  },
  grande: {
    container: 'min-h-24',
    title: 'text-lg font-semibold',
    subtitle: 'text-base font-normal',
    padding: 'p-5'
  }
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
const alignClasses: Record<CardAlign, string> = {
  start: 'text-left items-start',
  center: 'text-center items-center',
  end: 'text-right items-end'
}

export const HorizontalCard: React.FC<HorizontalCardProps> = ({
  title,
  subtitle,
  align = 'start',
  size = 'medio',
  titleColor = 'text',
  subtitleColor = 'text-secondary',
  className = '',
  onClick
}) => {
  const sizeStyle = sizeStyles[size]

  const containerClasses = [
    'theme-bg-surface',
    'theme-border',
    'border',
    'rounded-lg',
    'flex',
    'flex-col',
    'justify-center',
    alignClasses[align],
    sizeStyle.container,
    sizeStyle.padding,
    'theme-transition',
    'hover:theme-bg-surface-hover',
    onClick ? 'cursor-pointer hover:shadow-md' : '',
    className
  ]
    .filter(Boolean)
    .join(' ')

  const titleClasses = [
    sizeStyle.title,
    colorClasses[titleColor],
    'theme-transition'
  ].join(' ')

  const subtitleClasses = [
    sizeStyle.subtitle,
    colorClasses[subtitleColor],
    'theme-transition',
    'mt-1'
  ].join(' ')

  return (
    <div className={containerClasses} onClick={onClick}>
      <h3 className={titleClasses}>{title}</h3>
      <p className={subtitleClasses}>{subtitle}</p>
    </div>
  )
}
