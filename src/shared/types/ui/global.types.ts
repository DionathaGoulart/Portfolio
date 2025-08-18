export type Size = 'pequeno' | 'medio' | 'grande'
export type Align = 'start' | 'center' | 'end'
export type Weight = 'normal' | 'medium' | 'semibold' | 'bold'
export type Style = 'italic' | 'underline' | 'line-through'
export type Shadow = boolean | 'strong'

type ThemeColor =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'text'
  | 'textSecondary'
  | 'error'
  | 'success'
  | 'warning'

export type ColorVariant = ThemeColor | 'default'
