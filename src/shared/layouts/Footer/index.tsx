import React from 'react'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="theme-surface border-t theme-border mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          {/* Links */}
          <div className="flex space-x-6 text-sm">
            <a
              href="/privacy"
              className="theme-text-secondary hover:theme-text-primary transition-colors"
            >
              Privacidade
            </a>
            <a
              href="/terms"
              className="theme-text-secondary hover:theme-text-primary transition-colors"
            >
              Termos
            </a>
            <a
              href="/contact"
              className="theme-text-secondary hover:theme-text-primary transition-colors"
            >
              Contato
            </a>
          </div>

          {/* Copyright */}
          <p className="theme-text-secondary text-sm">
            © {currentYear} GD. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
