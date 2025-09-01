import React from 'react'
import type {
  ImageProps,
  ImageResource,
  KeyboardEventHandler
} from '@shared/types'

import '@styles/ui/image.scss'

// ============================================================================
// IMAGE UTILITIES
// ============================================================================

/**
 * Resolves image source from string or resource object
 * @param imageSrc - Image source to resolve
 * @returns Resolved image URL string
 */
const resolveImageSrc = (imageSrc: ImageResource): string => {
  if (typeof imageSrc === 'string') {
    return imageSrc
  }

  // If object, get first string value found
  const firstValue = Object.values(imageSrc)[0]
  return typeof firstValue === 'string' ? firstValue : ''
}

/**
 * Generates CSS classes array for image component
 * @param props - Component props
 * @returns Array of CSS class names
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
    // Base class
    'image',

    // Size variant
    `image--${size}`,

    // Shape (not applied to sidebar as it has own styling)
    size !== 'sidebar' && `image--${shape}`,

    // Float positioning
    float !== 'none' && `image--float-${float}`,

    // Shadow effects (not applied to sidebar as it has shadow-xl)
    size !== 'sidebar' && shadow === true && 'image--shadow',
    size !== 'sidebar' && shadow === 'strong' && 'image--shadow-strong',

    // Hover effects
    hover && 'image--hover',

    // Neon fire effects
    neonFire === true && 'image--neon-fire',
    neonFire === 'primary' && 'image--neon-primary',

    // Interactive state
    onClick && 'image--interactive',

    // Responsive behavior
    responsive && 'image--responsive',

    // Custom classes
    className
  ].filter(Boolean) as string[]
}

// ============================================================================
// IMAGE COMPONENT
// ============================================================================

/**
 * Reusable Image component with various styling options and effects
 * Supports multiple sizes, shapes, effects, and interactive states
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
  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  const handleClick = (): void => {
    if (onClick) {
      onClick()
    }
  }

  const handleKeyDown: KeyboardEventHandler = (e) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      onClick()
    }
  }

  // ============================================================================
  // COMPUTED VALUES
  // ============================================================================

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

  // ============================================================================
  // RENDER
  // ============================================================================

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
