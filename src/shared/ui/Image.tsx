import React from 'react'

// ============================================================================
// TYPES
// ============================================================================

export type ImageResource = string | Record<string, string>

export interface ImageProps {
  src: ImageResource
  alt: string
  className?: string
  onClick?: () => void
  // Tamanhos predefinidos (agora inclui sidebar)
  size?: 'small' | 'medium' | 'large' | 'xlarge' | 'sidebar'
  // Formato
  shape?: 'square' | 'rectangle' | 'circle'
  // Efeitos visuais
  shadow?: boolean | 'strong'
  hover?: boolean
  // Novo: Efeito neon fire
  neonFire?: boolean | 'primary' // true para cores fire, 'primary' para cores do tema
  // Layout
  float?: 'left' | 'right' | 'none'
  // Responsivo
  responsive?: boolean
}

// ============================================================================
// COMPONENT
// ============================================================================

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  className = '',
  onClick,
  size = 'medium',
  shape = 'rectangle',
  shadow = false,
  hover = true,
  neonFire = false,
  float = 'none',
  responsive = true
}) => {
  // ============================================================================
  // UTILITÁRIO PARA RESOLVER IMAGEM
  // ============================================================================

  const resolveImageSrc = (imageSrc: ImageResource): string => {
    if (typeof imageSrc === 'string') {
      return imageSrc
    }
    // Se for um objeto, pega o primeiro valor string encontrado
    const firstValue = Object.values(imageSrc)[0]
    return typeof firstValue === 'string' ? firstValue : ''
  }

  // ============================================================================
  // HANDLERS PARA INTERATIVIDADE
  // ============================================================================

  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      onClick()
    }
  }

  // ============================================================================
  // CLASSES CSS
  // ============================================================================

  const classes = [
    // Classe base
    'image',

    // Tamanho
    `image--${size}`,

    // Formato (não aplicar para sidebar pois já tem estilo próprio)
    size !== 'sidebar' && `image--${shape}`,

    // Float
    float !== 'none' && `image--float-${float}`,

    // Efeitos (não aplicar sombra para sidebar pois já tem shadow-xl)
    size !== 'sidebar' && shadow === true && 'image--shadow',
    size !== 'sidebar' && shadow === 'strong' && 'image--shadow-strong',
    hover && 'image--hover',

    // Efeito neon fire
    neonFire === true && 'image--neon-fire',
    neonFire === 'primary' && 'image--neon-primary',

    // Interativo
    onClick && 'image--interactive',

    // Responsivo
    responsive && 'image--responsive',

    // Classes customizadas
    className
  ]
    .filter(Boolean)
    .join(' ')

  const resolvedSrc = resolveImageSrc(src)
  const isInteractive = Boolean(onClick)

  // ============================================================================
  // RENDER
  // ============================================================================

  if (isInteractive) {
    return (
      <div
        className={classes}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={alt}
      >
        <img src={resolvedSrc} alt={alt} className="image__element" />
      </div>
    )
  }

  return (
    <div className={classes}>
      <img src={resolvedSrc} alt={alt} className="image__element" />
    </div>
  )
}
