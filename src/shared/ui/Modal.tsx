import React, { useEffect } from 'react'
import { X } from 'lucide-react'
import { Button, Title, P, Tag } from '@shared'
import { Project } from '@types'
import '@styles/ui/modal.scss'

// ================================
// TYPES
// ================================

export interface ModalProps {
  /** Se o modal está aberto */
  isOpen: boolean
  /** Função para fechar o modal */
  onClose: () => void
  /** Projeto a ser exibido */
  project: Project | null
}

// ================================
// MODAL COMPONENT
// ================================

/**
 * Modal para exibir detalhes completos de um projeto
 */
export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, project }) => {
  // ================================
  // EFFECTS
  // ================================

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent): void => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // ================================
  // EARLY RETURNS
  // ================================

  if (!isOpen || !project) {
    return null
  }

  // ================================
  // RENDER
  // ================================

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        role="document"
      >
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-container">
            <Title level="h2" id="modal-title" className="modal-title">
              {project.title}
            </Title>
            <P size="pequeno" className="modal-subtitle">
              {project.subtitle}
            </P>
          </div>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Fechar modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Image */}
        {project.image && (
          <div className="modal-image-container">
            <img
              src={project.image}
              alt={project.title}
              className="modal-image"
            />
          </div>
        )}

        {/* Content */}
        <div className="modal-body">
          {/* Description */}
          <div className="modal-section">
            <P size="medio" className="modal-description">
              {project.description}
            </P>
          </div>

          {/* Details */}
          {project.details && (
            <div className="modal-details">
              {project.details.purpose && (
                <div className="modal-detail-item">
                  <Title level="h4" className="modal-detail-title">
                    Propósito
                  </Title>
                  <P size="pequeno" className="modal-detail-text">
                    {project.details.purpose}
                  </P>
                </div>
              )}

              {project.details.why && (
                <div className="modal-detail-item">
                  <Title level="h4" className="modal-detail-title">
                    Por que foi criado?
                  </Title>
                  <P size="pequeno" className="modal-detail-text">
                    {project.details.why}
                  </P>
                </div>
              )}

              {project.details.challenges && (
                <div className="modal-detail-item">
                  <Title level="h4" className="modal-detail-title">
                    Desafios
                  </Title>
                  <P size="pequeno" className="modal-detail-text">
                    {project.details.challenges}
                  </P>
                </div>
              )}

              {project.details.results && (
                <div className="modal-detail-item">
                  <Title level="h4" className="modal-detail-title">
                    Resultados
                  </Title>
                  <P size="pequeno" className="modal-detail-text">
                    {project.details.results}
                  </P>
                </div>
              )}
            </div>
          )}

          {/* Tags */}
          <div className="modal-section">
            <Title level="h4" className="modal-section-title">
              Tecnologias
            </Title>
            <div className="modal-tags">
              {project.tags.map((tag) => (
                <Tag key={tag} size="pequeno">
                  {tag}
                </Tag>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="modal-actions">
            {project.githubUrl && (
              <Button
                variant="outline"
                size="medio"
                onClick={() => {
                  window.open(project.githubUrl, '_blank', 'noopener,noreferrer')
                }}
              >
                {project.private ? 'Repositório Privado' : 'Ver no GitHub'}
              </Button>
            )}
            {project.demoUrl && (
              <Button
                size="medio"
                onClick={() => {
                  window.open(project.demoUrl, '_blank', 'noopener,noreferrer')
                }}
              >
                Ver Demo
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

