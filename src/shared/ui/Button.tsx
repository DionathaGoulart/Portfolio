import React from 'react'

import { ButtonProps } from '@types'
import '@styles/ui/button.scss'

// ================================
// BUTTON COMPONENT
// ================================

/**
 * Componente de botão versátil com múltiplas variantes, tamanhos e estados
 * Suporta loading, ícones, diferentes cores e alinhamentos
 *
 * @param {ButtonProps} props - Propriedades de configuração do botão
 * @returns {JSX.Element} Componente de botão renderizado
 *
 * @example
 * ```tsx
 * <Button size="medio" variant="solid" color="primary" onClick={handleClick}>
 *   Clique aqui
 * </Button>
 * ```
 */
export const Button: React.FC<ButtonProps> = ({
  // Propriedades de conteúdo
  children,

  // Propriedades de aparência
  size = 'medio',
  color = 'primary',
  variant = 'solid',

  // Propriedades de layout
  align = 'start',

  // Propriedades de funcionalidade
  onClick,
  type = 'button',
  disabled = false,
  loading = false,

  // Elementos adicionais
  icon,

  // Atributos HTML
  className = '',
  id
}) => {
  // ================================
  // VALORES DERIVADOS
  // ================================

  const isDisabled = disabled || loading
  const hasIcon = Boolean(icon)

  // ================================
  // HELPER FUNCTIONS
  // ================================

  /**
   * Gera classes CSS para o botão baseado nas propriedades
   * @returns {string} String de classes CSS
   */
  const getButtonClasses = (): string => {
    const classes = [
      'btn',
      `btn--${size}`,
      `btn--${variant}-${color}`,
      loading && 'btn--loading',
      hasIcon && 'btn--with-icon',
      className
    ]

    return classes.filter(Boolean).join(' ')
  }

  /**
   * Gera classes CSS para o container do botão
   * @returns {string} String de classes CSS
   */
  const getContainerClasses = (): string => {
    return ['btn-container', `btn-container--${align}`].join(' ')
  }

  /**
   * Manipula o clique do botão
   */
  const handleClick = (): void => {
    if (!isDisabled && onClick) {
      onClick()
    }
  }

  /**
   * Renderiza o conteúdo do botão (texto, ícone ou loading)
   * @returns {React.ReactNode} Conteúdo renderizado
   */
  const renderContent = (): React.ReactNode => {
    if (loading) {
      return (
        <>
          <div className="btn__spinner" />
          Carregando...
        </>
      )
    }

    return (
      <>
        {icon && <span className="btn__icon">{icon}</span>}
        {children}
      </>
    )
  }

  // ================================
  // RENDER
  // ================================

  return (
    <div className={getContainerClasses()}>
      <button
        type={type}
        onClick={handleClick}
        disabled={isDisabled}
        className={getButtonClasses()}
        id={id}
      >
        {renderContent()}
      </button>
    </div>
  )
}
