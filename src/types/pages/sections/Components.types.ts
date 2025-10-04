// ================================
// SECTIONS COMPONENTS TYPES
// ================================

import { SkillCategory } from './Skill.types'
import { Project } from '../../shared/ui/ProjectCard.types'

/**
 * Props para o componente SkillsFilter
 */
export interface SkillsFilterProps {
  /** Filtro ativo atual */
  activeFilter: string
  /** Função para mudar o filtro */
  onFilterChange: (filter: string) => void
}

/**
 * Props para o componente SkillsGridSection
 */
export interface SkillsGridSectionProps {
  /** Categorias de habilidades filtradas */
  categories: SkillCategory[]
  /** Se deve mostrar as categorias */
  showCategories: boolean
}

/**
 * Props para o componente ProjectsFilter
 */
export interface ProjectsFilterProps {
  /** Filtro ativo atual */
  activeFilter: string
  /** Função para mudar o filtro */
  onFilterChange: (filter: string) => void
}

/**
 * Props para o componente ProjectsGrid
 */
export interface ProjectsGridProps {
  /** Array de projetos filtrados */
  projects: Project[]
  /** Chave para animação */
  animationKey: number
  /** Se é o carregamento inicial */
  isInitialLoad: boolean
  /** Função para clique no GitHub */
  onGithubClick: (projectId: string) => void
  /** Função para clique no demo */
  onDemoClick: (projectId: string) => void
  /** Filtro ativo atual */
  activeFilter: string
}
