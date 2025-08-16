import React from 'react'

type TagColor =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'text'
  | 'text-secondary'
  | 'error'
  | 'success'
  | 'warning'

interface TagProps {
  children: React.ReactNode
  color?: TagColor
  className?: string
}

const colorClasses: Record<TagColor, string> = {
  primary: 'theme-bg-primary-muted theme-text-primary',
  secondary: 'theme-bg-secondary-muted theme-text-secondary',
  accent: 'theme-bg-accent-muted theme-text-accent',
  text: 'theme-bg-text-muted theme-text-primary',
  'text-secondary': 'theme-bg-text-secondary-muted theme-text-secondary',
  error: 'theme-bg-error-muted theme-text-error',
  success: 'theme-bg-success-muted theme-text-success',
  warning: 'theme-bg-warning-muted theme-text-warning'
}

export const Tag: React.FC<TagProps> = ({
  children,
  color = 'primary',
  className = ''
}) => {
  const combinedClasses = [
    'text-sm font-medium px-3 py-1 rounded-full',
    colorClasses[color],
    className
  ].join(' ')

  return <span className={combinedClasses}>{children}</span>
}
