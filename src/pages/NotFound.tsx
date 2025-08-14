import React from 'react'
import { Link } from 'react-router-dom'

export const NotFoundPage: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
        padding: '2rem'
      }}
    >
      <h1 style={{ fontSize: '4rem', margin: '0', color: '#666' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', margin: '1rem 0', color: '#888' }}>
        Página não encontrada
      </h2>
      <p style={{ fontSize: '1rem', margin: '1rem 0', color: '#999' }}>
        A página que você está procurando não existe ou foi removida.
      </p>
      <Link
        to="/"
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#007bff',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
          fontSize: '1rem',
          marginTop: '1rem'
        }}
      >
        Voltar para a Home
      </Link>
    </div>
  )
}
