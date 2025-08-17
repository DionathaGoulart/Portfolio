import React from 'react'
import { TagProps, tagSizeStyles, tagColorClasses } from '@shared/types'

export const Tag: React.FC<TagProps> = ({
  children,
  color = 'primary',
  size = 'medio',
  className = ''
}) => {
  const combinedClasses = [
    'font-medium rounded-full',
    tagSizeStyles[size],
    tagColorClasses[color],
    className
  ].join(' ')

  return <span className={combinedClasses}>{children}</span>
}
