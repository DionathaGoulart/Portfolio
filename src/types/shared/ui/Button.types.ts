import { ReactNode } from 'react'
import { Align, ColorVariant, Size } from '../global'

// ================================
// BUTTON SPECIFIC TYPES
// ================================

/**
 * Variantes de estilo de botão para diferentes aparências visuais
 */
export type ButtonVariant = 'solid' | 'outline' | 'ghost'

/**
 * Valores de atributo type do botão HTML
 */
export type ButtonType = 'button' | 'submit' | 'reset'

// ================================
// BUTTON PROPS INTERFACE
// ================================

/**
 * Interface de props para o componente Button
 *
 * @interface ButtonProps
 * @property {ReactNode} children - Conteúdo do botão
 * @property {Size} size - Variante de tamanho do botão (pequeno, medio, grande)
 * @property {ColorVariant} color - Tema de cor do botão
 * @property {ButtonVariant} variant - Variante de estilo do botão (solid, outline, ghost)
 * @property {Align} align - Alinhamento do container (start, center, end)
 * @property {() => void} onClick - Função manipuladora de clique
 * @property {ButtonType} type - Atributo type do botão HTML
 * @property {boolean} disabled - Desabilitar interação do botão
 * @property {boolean} loading - Mostrar estado de carregamento com spinner
 * @property {ReactNode} icon - Elemento de ícone opcional para exibir
 * @property {string} className - Classes CSS adicionais
 * @property {string} id - Atributo id HTML
 */
export interface ButtonProps {
  // Propriedades de conteúdo
  children: ReactNode

  // Propriedades de aparência
  size?: Size
  color?: ColorVariant
  variant?: ButtonVariant

  // Propriedades de layout
  align?: Align

  // Propriedades de funcionalidade
  onClick?: () => void
  type?: ButtonType
  disabled?: boolean
  loading?: boolean

  // Elementos adicionais
  icon?: ReactNode

  // Atributos HTML
  className?: string
  id?: string
}
