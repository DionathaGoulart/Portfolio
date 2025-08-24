import React from 'react'
import { TextProps, ImageResource } from '../types'

export const Text: React.FC<TextProps> = ({
  // Conteúdo
  children,
  // Estrutura
  as = 'p',
  // Aparência
  size = 'medio',
  align = 'start',
  color = 'text',
  weight,
  // Modificadores de estilo
  style,
  leading,
  // Comportamentos
  truncate = false,
  breakWords = false,
  // Modificadores visuais
  highlight = false,
  code = false,
  gradient = false,
  shadow,
  border = 'none',
  // Responsividade
  responsive,
  // Layout de colunas
  columnLayout,
  // HTML attributes
  className = '',
  id
}) => {
  // ============================================================================
  // CONFIGURAÇÃO
  // ============================================================================
  const Element = as
  const hasColumnLayout = columnLayout?.enabled

  // ============================================================================
  // UTILITÁRIO PARA RESOLVER IMAGEM
  // ============================================================================
  const resolveImageSrc = (src: ImageResource): string => {
    if (typeof src === 'string') {
      return src
    }
    // Se for um objeto, pega o primeiro valor string encontrado
    const firstValue = Object.values(src)[0]
    return typeof firstValue === 'string' ? firstValue : ''
  }

  // ============================================================================
  // CLASSES CSS
  // ============================================================================
  const classes = [
    // Classe base
    'text',
    // Elemento e aparência básica
    `text--${as}`,
    `text--${size}`,
    `text--${color}`,
    `text--${align}`,
    // Modificadores de aparência
    weight && `text--${weight}`,
    style && `text--${style}`,
    leading && `text--leading-${leading}`,
    // Comportamentos de texto
    truncate && 'text--truncate',
    breakWords && 'text--break-words',
    // Modificadores visuais
    highlight && 'text--highlight',
    code && 'text--code',
    gradient && 'text--gradient',
    shadow === true && 'text--shadow',
    shadow === 'strong' && 'text--shadow-strong',
    // Border decorativa
    border !== 'none' && `text--border-${border}`,
    // Responsividade
    responsive && `text--responsive-${responsive}`,
    // Layout de colunas
    hasColumnLayout && 'text--column-layout',
    hasColumnLayout && `text--columns-${columnLayout.columns || 2}`,
    hasColumnLayout && `text--image-${columnLayout.imagePosition || 'center'}`,
    hasColumnLayout && `text--gap-${columnLayout.gap || 'medium'}`,
    // Classes customizadas
    className
  ]
    .filter(Boolean)
    .join(' ')

  // ============================================================================
  // HANDLER PARA IMAGEM INTERATIVA
  // ============================================================================
  const handleImageClick = () => {
    if (columnLayout?.image?.onClick) {
      columnLayout.image.onClick()
    }
  }

  const handleImageKeyDown = (e: React.KeyboardEvent) => {
    if (columnLayout?.image?.onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      columnLayout.image.onClick()
    }
  }

  // ============================================================================
  // UTILITÁRIOS PARA DIVIDIR CONTEÚDO (SIMPLIFICADOS)
  // ============================================================================
  const splitTextIntoColumns = (
    content: React.ReactNode,
    numColumns: number
  ) => {
    if (typeof content !== 'string') {
      return Array(numColumns).fill(content)
    }

    // Divide por parágrafos primeiro, depois por sentenças se necessário
    let sections = content.split(/\n\s*\n/)

    if (sections.length === 1) {
      // Se não há parágrafos, divide por sentenças
      sections = content.split(/(?<=[.!?])\s+/)
    }

    const sectionsPerColumn = Math.ceil(sections.length / numColumns)
    const columns = []

    for (let i = 0; i < numColumns; i++) {
      const start = i * sectionsPerColumn
      const end = start + sectionsPerColumn
      const columnText = sections.slice(start, end).join(' ')
      if (columnText.trim()) {
        columns.push(columnText)
      }
    }

    return columns
  }

  // ============================================================================
  // COMPONENTE DE IMAGEM
  // ============================================================================
  const renderImage = (position: string) => {
    const { image } = columnLayout || {}
    if (!image) return null

    const isInteractive = Boolean(image.onClick)
    const resolvedSrc = resolveImageSrc(image.src)

    const imageElement = (
      <img
        src={resolvedSrc}
        alt={image.alt}
        className={`text__image-element ${image.className || ''}`}
      />
    )

    return (
      <div className={`text__image text__image--${position}`}>
        {isInteractive ? (
          <div
            className="text__image-interactive"
            onClick={handleImageClick}
            onKeyDown={handleImageKeyDown}
            tabIndex={0}
            role="button"
            aria-label={image.alt}
          >
            {imageElement}
          </div>
        ) : (
          imageElement
        )}
      </div>
    )
  }

  // ============================================================================
  // RENDER COM LAYOUTS ESPECIAIS
  // ============================================================================
  if (hasColumnLayout) {
    const { layoutType = 'columns', imagePosition = 'center' } = columnLayout

    const columns = splitTextIntoColumns(children, columnLayout.columns || 2)

    // Layout especiais simplificados
    if (layoutType !== 'columns') {
      return (
        <div
          className={`${classes} text--layout-${layoutType} ${layoutType === 'sidebar' && columnLayout.sidebarColumns ? `text--sidebar-columns-${columnLayout.sidebarColumns}` : ''}`}
        >
          <div className="text__special-container">
            {imagePosition === 'top' && renderImage('top')}

            <div className="text__special-layout">
              {/* Imagem central */}
              {(imagePosition === 'center' || !imagePosition) &&
                renderImage('center')}

              {/* Conteúdo com layout especial */}
              <div className={`text__content text__content--${layoutType}`}>
                <Element className="text__main-content">{children}</Element>
              </div>
            </div>

            {imagePosition === 'bottom' && renderImage('bottom')}
          </div>
        </div>
      )
    }

    // Layout tradicional em colunas
    return (
      <div className={classes}>
        {imagePosition === 'top' && renderImage('top')}

        <div className="text__columns">
          {imagePosition === 'center' && columns.length > 1 ? (
            <>
              <div className="text__column">
                <Element className="text__column-content">{columns[0]}</Element>
              </div>

              {renderImage('center')}

              <div className="text__column">
                <Element className="text__column-content">
                  {columns.slice(1).join(' ')}
                </Element>
              </div>
            </>
          ) : (
            columns.map((column, index) => (
              <div key={index} className="text__column">
                <Element className="text__column-content">{column}</Element>
              </div>
            ))
          )}
        </div>

        {imagePosition === 'bottom' && renderImage('bottom')}
      </div>
    )
  }

  // ============================================================================
  // RENDER PADRÃO
  // ============================================================================
  return (
    <Element className={classes} id={id}>
      {children}
    </Element>
  )
}

// ============================================================================
// COMPONENTES ESPECÍFICOS
// ============================================================================
export const P: React.FC<Omit<TextProps, 'as'>> = (props) => (
  <Text as="p" {...props} />
)

export const Span: React.FC<Omit<TextProps, 'as'>> = (props) => (
  <Text as="span" {...props} />
)
