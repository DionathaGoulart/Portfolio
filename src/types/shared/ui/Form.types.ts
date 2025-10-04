import { ReactNode, ChangeEvent, FocusEvent } from 'react'
import { Size } from '../global'

// ================================
// FORM SPECIFIC TYPES
// ================================

/**
 * Variantes de tamanho de input e textarea
 * Reutiliza o tipo Size global para consistência
 */
export type InputSize = Size

/**
 * Variantes visuais de input e textarea
 */
export type InputVariant = 'outline' | 'filled' | 'ghost'

/**
 * Opções de comportamento de redimensionamento de textarea
 */
export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both'

/**
 * Variantes de exibição de card de contato
 */
export type ContactCardVariant = 'default' | 'social'

// ================================
// INPUT INTERFACE
// ================================

/**
 * Interface de props para o componente Input
 *
 * @interface InputProps
 * @property {string} value - Valor atual do input
 * @property {string} placeholder - Texto do placeholder
 * @property {'text' | 'email' | 'password' | 'tel' | 'url' | 'search' | 'number'} type - Tipo de input HTML
 * @property {string} name - Atributo name HTML
 * @property {InputSize} size - Variante de tamanho do input
 * @property {InputVariant} variant - Variante visual do input
 * @property {boolean} disabled - Desabilitar interação do input
 * @property {boolean} required - Marcar input como obrigatório
 * @property {boolean} error - Mostrar estilo de estado de erro
 * @property {(e: ChangeEvent<HTMLInputElement>) => void} onChange - Manipulador de mudança de valor
 * @property {(e: FocusEvent<HTMLInputElement>) => void} onFocus - Manipulador de evento de foco
 * @property {(e: FocusEvent<HTMLInputElement>) => void} onBlur - Manipulador de evento de blur
 * @property {string} className - Classes CSS adicionais
 * @property {string} id - Atributo id HTML
 */
export interface InputProps {
  // Conteúdo
  value?: string
  placeholder?: string

  // Estrutura
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'search' | 'number'
  name?: string

  // Aparência
  size?: InputSize
  variant?: InputVariant

  // Estados
  disabled?: boolean
  required?: boolean
  error?: boolean

  // Funcionalidade
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void

  // Atributos HTML
  className?: string
  id?: string
}

// ================================
// TEXTAREA INTERFACE
// ================================

/**
 * Interface de props para o componente Textarea
 *
 * @interface TextareaProps
 * @property {string} value - Valor atual do textarea
 * @property {string} placeholder - Texto do placeholder
 * @property {string} name - Atributo name HTML
 * @property {number} rows - Número de linhas de texto visíveis
 * @property {InputSize} size - Variante de tamanho do textarea
 * @property {InputVariant} variant - Variante visual do textarea
 * @property {boolean} disabled - Desabilitar interação do textarea
 * @property {boolean} required - Marcar textarea como obrigatório
 * @property {boolean} error - Mostrar estilo de estado de erro
 * @property {TextareaResize} resize - Comportamento de redimensionamento do textarea
 * @property {(e: ChangeEvent<HTMLTextAreaElement>) => void} onChange - Manipulador de mudança de valor
 * @property {(e: FocusEvent<HTMLTextAreaElement>) => void} onFocus - Manipulador de evento de foco
 * @property {(e: FocusEvent<HTMLTextAreaElement>) => void} onBlur - Manipulador de evento de blur
 * @property {string} className - Classes CSS adicionais
 * @property {string} id - Atributo id HTML
 */
export interface TextareaProps {
  // Conteúdo
  value?: string
  placeholder?: string

  // Estrutura
  name?: string
  rows?: number

  // Aparência
  size?: InputSize
  variant?: InputVariant

  // Estados
  disabled?: boolean
  required?: boolean
  error?: boolean
  resize?: TextareaResize

  // Funcionalidade
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
  onFocus?: (e: FocusEvent<HTMLTextAreaElement>) => void
  onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void

  // Atributos HTML
  className?: string
  id?: string
}

// ================================
// FORM FIELD INTERFACE
// ================================

/**
 * Interface de props para o componente FormField
 *
 * @interface FormFieldProps
 * @property {ReactNode} children - Elemento de input do formulário para ser envolvido
 * @property {string} label - Texto do label para o campo do formulário
 * @property {string} error - Mensagem de erro para exibir
 * @property {boolean} required - Marcar campo como obrigatório com asterisco
 * @property {string} className - Classes CSS adicionais
 */
export interface FormFieldProps {
  // Conteúdo
  children: ReactNode
  label?: string
  error?: string

  // Configuração
  required?: boolean

  // Atributos HTML
  className?: string
}

// ================================
// CONTACT CARD INTERFACE
// ================================

/**
 * Interface de props para o componente ContactCard
 *
 * @interface ContactCardFormProps
 * @property {ReactNode} icon - Elemento de ícone para exibir
 * @property {string} title - Título do método de contato
 * @property {string} value - Valor do contato (email, telefone, etc.)
 * @property {string} href - href opcional para contato clicável
 * @property {() => void} onClick - Função manipuladora de clique
 * @property {ContactCardVariant} variant - Variante visual do card de contato
 * @property {string} className - Classes CSS adicionais
 */
export interface ContactCardFormProps {
  // Conteúdo
  icon: ReactNode
  title: string
  value: string

  // Funcionalidade
  href?: string
  onClick?: () => void

  // Aparência
  variant?: ContactCardVariant

  // Atributos HTML
  className?: string
}
