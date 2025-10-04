// ================================
// SECTIONS TYPES
// ================================

/**
 * Props para o componente HomeSection
 *
 * @interface HomeSectionProps
 * @property {string} id - ID único da seção para âncoras e navegação
 */
export interface HomeSectionProps {
  id?: string
}

/**
 * Props para o componente SobreSection
 *
 * @interface SobreSectionProps
 * @property {string} id - ID único da seção para navegação/âncoras
 */
export interface SobreSectionProps {
  id?: string
}

/**
 * Estrutura de tecnologia
 *
 * @interface Technology
 * @property {string} title - Nome da tecnologia
 * @property {string} subtitle - Subtítulo da tecnologia
 * @property {React.ReactNode} icon - Ícone da tecnologia
 */
export interface Technology {
  title: string
  subtitle: string
  icon: React.ReactNode
}

/**
 * Props para o componente ProjectsSection
 *
 * @interface ProjectsSectionProps
 * @property {string} id - ID único da seção para navegação/âncoras
 */
export interface ProjectsSectionProps {
  id?: string
}

/**
 * Props para o componente SkillsSection
 *
 * @interface SkillsSectionProps
 * @property {string} id - ID único da seção para navegação/âncoras
 */
export interface SkillsSectionProps {
  id?: string
}

// Importar tipos específicos de seções
export * from './sections/'

/**
 * Opção de filtro para seções
 *
 * @interface FilterOption
 * @property {string} value - Valor do filtro
 * @property {string} label - Label do filtro
 */
export interface FilterOption {
  value: string
  label: string
}

/**
 * Props para o componente ExperienceSection
 *
 * @interface ExperienceSectionProps
 * @property {string} id - ID único da seção para âncoras e navegação
 */
export interface ExperienceSectionProps {
  id?: string
}

/**
 * Props para o componente ContactSection
 *
 * @interface ContactSectionProps
 * @property {string} id - ID único da seção para navegação/âncoras
 */
export interface ContactSectionProps {
  id?: string
}

/**
 * Dados do formulário de contato
 *
 * @interface FormData
 * @property {string} nome - Nome do contato
 * @property {string} email - Email do contato
 * @property {string} assunto - Assunto da mensagem
 * @property {string} mensagem - Mensagem
 */
export interface FormData {
  nome: string
  email: string
  assunto: string
  mensagem: string
}

/**
 * Card de contato
 *
 * @interface ContactCard
 * @property {React.ReactNode} icon - Ícone do card
 * @property {string} title - Título do card
 * @property {string} subtitle - Subtítulo do card
 * @property {() => void} onClick - Função de clique opcional
 */
export interface ContactCard {
  icon: React.ReactNode
  title: string
  subtitle: string
  onClick?: () => void
}
