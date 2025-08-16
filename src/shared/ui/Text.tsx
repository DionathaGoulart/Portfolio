import React from 'react'

// Tipos para os elementos de texto
type TextElement = 'p' | 'span'

// Tipos para tamanhos
type TextSize = 'pequeno' | 'medio' | 'grande'

// Tipos para alinhamento
type TextAlign = 'start' | 'center' | 'end'

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
interface TextProps {
  as?: TextElement
  size?: TextSize
  align?: TextAlign
  color?: ThemeColor
  children: React.ReactNode
  className?: string
  id?: string
}

// Mapeamento dos tamanhos para classes do Tailwind
const sizeStyles: Record<TextSize, string> = {
  pequeno: 'text-sm', // Pequeno
  medio: 'text-lg', // Médio (base conforme solicitado)
  grande: 'text-xl' // Grande
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
const alignClasses: Record<TextAlign, string> = {
  start: 'text-left',
  center: 'text-center',
  end: 'text-right'
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
    // inline-block e width full para spans para que o alinhamento funcione
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
