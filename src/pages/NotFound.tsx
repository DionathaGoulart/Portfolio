import React from 'react'
import { Link } from 'react-router-dom'

// ================================
// Styles
// ================================

const containerStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '60vh',
  textAlign: 'center',
  padding: '2rem'
}

const headingStyles: React.CSSProperties = {
  fontSize: '4rem',
  margin: '0',
  color: '#666'
}

const subHeadingStyles: React.CSSProperties = {
  fontSize: '1.5rem',
  margin: '1rem 0',
  color: '#888'
}

const descriptionStyles: React.CSSProperties = {
  fontSize: '1rem',
  margin: '1rem 0',
  color: '#999'
}

const linkStyles: React.CSSProperties = {
  padding: '0.75rem 1.5rem',
  backgroundColor: '#007bff',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '4px',
  fontSize: '1rem',
  marginTop: '1rem'
}

// ================================
// Main Component
// ================================

/**
 * NotFoundPage component - 404 error page
 * Displays a user-friendly message when a route is not found
 */
export const NotFoundPage: React.FC = () => {
  return (
    <div style={containerStyles}>
      <h1 style={headingStyles}>404</h1>
      <h2 style={subHeadingStyles}>Página não encontrada</h2>
      <p style={descriptionStyles}>
        A página que você está procurando não existe ou foi removida.
      </p>
      <Link to="/" style={linkStyles}>
        Voltar para a Home
      </Link>
    </div>
  )
}
