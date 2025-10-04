import React from 'react'

// ================================
// IMAGE SPECIFIC TYPES
// ================================

/**
 * Tipo de recurso de imagem - pode ser uma string URL direta ou um objeto com valores string
 */
export type ImageResource = string | Record<string, string>

/**
 * Variantes de tamanho de imagem predefinidas incluindo sidebar
 */
export type ImageSize = 'small' | 'medium' | 'large' | 'xlarge' | 'sidebar'

/**
 * Opções de formato de forma da imagem
 */
export type ImageShape = 'square' | 'rectangle' | 'circle'

/**
 * Opções de intensidade de efeito de sombra
 */
export type ImageShadow = boolean | 'strong'

/**
 * Variantes de efeito de fogo neon
 */
export type ImageNeonFire = boolean | 'primary'

/**
 * Opções de posicionamento flutuante
 */
export type ImageFloat = 'left' | 'right' | 'none'

/**
 * Tipo de manipulador de evento de teclado
 */
export type KeyboardEventHandler = (e: React.KeyboardEvent) => void

// ================================
// UTILITY TYPES
// ================================

/**
 * Tipo interno para geração de classes CSS
 */
export type ImageClassNames = string[]

// ================================
// MAIN INTERFACE
// ================================

/**
 * Interface de props para o componente Image
 *
 * @interface ImageProps
 * @property {ImageResource} src - Fonte da imagem - string URL ou objeto de recurso
 * @property {string} alt - Texto alt para acessibilidade
 * @property {string} className - Classes CSS adicionais
 * @property {() => void} onClick - Manipulador de clique para imagens interativas
 * @property {ImageSize} size - Variantes de tamanho predefinidas incluindo sidebar
 * @property {ImageShape} shape - Formato de forma da imagem
 * @property {ImageShadow} shadow - Efeito de sombra - boolean para sombra normal, 'strong' para sombra pesada
 * @property {boolean} hover - Habilitar efeitos de hover
 * @property {ImageNeonFire} neonFire - Efeito de fogo neon - true para cores de fogo, 'primary' para cores do tema
 * @property {ImageFloat} float - Posicionamento flutuante
 * @property {boolean} responsive - Habilitar dimensionamento responsivo
 */
export interface ImageProps {
  // Conteúdo
  src: ImageResource
  alt: string

  // Aparência
  size?: ImageSize
  shape?: ImageShape
  shadow?: ImageShadow
  hover?: boolean
  neonFire?: ImageNeonFire

  // Layout
  float?: ImageFloat
  responsive?: boolean

  // Funcionalidade
  onClick?: () => void

  // Atributos HTML
  className?: string
}
