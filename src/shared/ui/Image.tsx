import React from 'react'
import { ImageProps, ImageResource, KeyboardEventHandler } from '@types'
import '@styles/ui/image.scss'

// ================================
// HELPER FUNCTIONS
// ================================

/**
 * Resolves image source from string or resource object
 */
const resolveImageSrc = (imageSrc: ImageResource): string => {
  if (!imageSrc) {
    console.warn('Image source is null or undefined')
    return ''
  }

  if (typeof imageSrc === 'string') {
    return imageSrc
  }

  if (typeof imageSrc === 'object' && imageSrc !== null) {
    const values = Object.values(imageSrc)
    const firstValue = values[0]
    return typeof firstValue === 'string' ? firstValue : ''
  }

  return ''
}

/**
 * Generates CSS classes array for image component
 */
const generateImageClasses = (
  props: Omit<ImageProps, 'src' | 'alt'>
): string[] => {
  const {
    size = 'medium',
    shape = 'rectangle',
    shadow = false,
    hover = true,
    neonFire = false,
    float = 'none',
    responsive = true,
    onClick,
    className = ''
  } = props

  return [
    'image',
    `image--${size}`,
    size !== 'sidebar' && `image--${shape}`,
    float !== 'none' && `image--float-${float}`,
    size !== 'sidebar' && shadow === true && 'image--shadow',
    size !== 'sidebar' && shadow === 'strong' && 'image--shadow-strong',
    hover && 'image--hover',
    neonFire === true && 'image--neon-fire',
    neonFire === 'primary' && 'image--neon-primary',
    onClick && 'image--interactive',
    responsive && 'image--responsive',
    className
  ].filter(Boolean) as string[]
}

// ================================
// IMAGE COMPONENT
// ================================

/**
 * Reusable Image component with various styling options and effects
 * Supports multiple sizes, shapes, effects, and interactive states
 *
 * @component Image
 * @param {ImageProps} props - Image configuration props
 * @returns {React.FC<ImageProps>} Rendered image component
 *
 * @example
 * <Image
 *   src="/path/to/image.jpg"
 *   alt="Description"
 *   size="large"
 *   shape="circle"
 *   shadow="strong"
 *   onClick={handleImageClick}
 * />
 */
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
  // ================================
  // DERIVED VALUES
  // ================================

  const resolvedSrc = resolveImageSrc(src)
  const isInteractive = Boolean(onClick)
  const cssClasses = generateImageClasses({
    size,
    shape,
    shadow,
    hover,
    neonFire,
    float,
    responsive,
    onClick,
    className
  }).join(' ')

  // ================================
  // EVENT HANDLERS
  // ================================

  const handleClick = (): void => {
    if (onClick) {
      onClick()
    }
  }

  const handleKeyDown: KeyboardEventHandler = (e): void => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      onClick()
    }
  }

  // ================================
  // EARLY RETURNS
  // ================================

  if (!resolvedSrc) {
    return null
  }

  // ================================
  // RENDER
  // ================================

  if (isInteractive) {
    return (
      <div
        className={cssClasses}
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
    <div className={cssClasses}>
      <img src={resolvedSrc} alt={alt} className="image__element" />
    </div>
  )
}
