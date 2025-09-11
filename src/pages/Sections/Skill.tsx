import React, { useState } from 'react'
import { analytics } from '@features/Analytics/utils'
import { AnimatedContainer, Title, P, NavFilter, SkillGrid } from '@shared/ui'
import { Skill } from '@shared/types'

// ================================
// Types & Interfaces
// ================================

/**
 * Props for the SkillsSection component
 */
interface SkillsSectionProps {
  /** Unique section ID for anchors and navigation */
  id?: string
}

/**
 * Skill category configuration
 */
interface SkillCategory {
  key: string
  skills: Skill[]
  delay: number
}

/**
 * Filter option for navigation
 */
interface FilterOption {
  value: string
  label: string
}

// ================================
// Constants
// ================================

/**
 * Technical skills data organized by category
 */
const SKILLS_DATA: Skill[] = [
  // Frontend
  { id: '1', name: 'React', percentage: 95, category: 'frontend' },
  { id: '2', name: 'TypeScript', percentage: 90, category: 'frontend' },
  { id: '3', name: 'Next.js', percentage: 88, category: 'frontend' },
  { id: '4', name: 'JavaScript', percentage: 95, category: 'frontend' },
  { id: '5', name: 'CSS/SCSS', percentage: 92, category: 'frontend' },
  { id: '6', name: 'Tailwind CSS', percentage: 90, category: 'frontend' },

  // Backend
  { id: '7', name: 'Node.js', percentage: 85, category: 'backend' },
  { id: '8', name: 'Express.js', percentage: 83, category: 'backend' },
  { id: '9', name: 'Python', percentage: 78, category: 'backend' },
  { id: '10', name: 'REST APIs', percentage: 90, category: 'backend' },
  { id: '11', name: 'GraphQL', percentage: 75, category: 'backend' },

  // Database
  { id: '12', name: 'MongoDB', percentage: 82, category: 'database' },
  { id: '13', name: 'PostgreSQL', percentage: 80, category: 'database' },
  { id: '14', name: 'MySQL', percentage: 85, category: 'database' },
  { id: '15', name: 'Prisma', percentage: 78, category: 'database' },

  // Tools
  { id: '16', name: 'Git', percentage: 92, category: 'tools' },
  { id: '17', name: 'Docker', percentage: 75, category: 'tools' },
  { id: '18', name: 'AWS', percentage: 70, category: 'tools' },
  { id: '19', name: 'Figma', percentage: 88, category: 'tools' },

  // Mobile
  { id: '20', name: 'React Native', percentage: 82, category: 'mobile' },
  { id: '21', name: 'Expo', percentage: 85, category: 'mobile' }
]

/**
 * Skill categories configuration with animation delays
 */
const SKILL_CATEGORIES: SkillCategory[] = [
  {
    key: 'frontend',
    skills: SKILLS_DATA.filter((skill) => skill.category === 'frontend'),
    delay: 100
  },
  {
    key: 'backend',
    skills: SKILLS_DATA.filter((skill) => skill.category === 'backend'),
    delay: 150
  },
  {
    key: 'database',
    skills: SKILLS_DATA.filter((skill) => skill.category === 'database'),
    delay: 200
  },
  {
    key: 'tools',
    skills: SKILLS_DATA.filter((skill) => skill.category === 'tools'),
    delay: 250
  },
  {
    key: 'mobile',
    skills: SKILLS_DATA.filter((skill) => skill.category === 'mobile'),
    delay: 300
  }
]

/**
 * Filter options for category navigation
 */
const FILTER_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'Todas' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'database', label: 'Database' },
  { value: 'tools', label: 'Ferramentas' },
  { value: 'mobile', label: 'Mobile' }
]

// ================================
// Helper Functions
// ================================

/**
 * Filters skill categories based on active filter
 */
const getFilteredCategories = (activeFilter: string): SkillCategory[] => {
  if (activeFilter === 'all') {
    return SKILL_CATEGORIES
  }
  return SKILL_CATEGORIES.filter((category) => category.key === activeFilter)
}

/**
 * Tracks skill interaction for analytics
 */
const trackSkillInteraction = (skillName: string): void => {
  analytics.trackButtonClick(`skill_viewed_${skillName.toLowerCase()}`)
}

// ================================
// Custom Hooks
// ================================

/**
 * Custom hook for managing skills filtering and analytics
 */
const useSkillsFiltering = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all')

  const handleFilterChange = (filter: string): void => {
    setActiveFilter(filter)
    analytics.trackButtonClick(`skills_filter_${filter}`)
  }

  const filteredCategories = getFilteredCategories(activeFilter)

  return {
    activeFilter,
    handleFilterChange,
    filteredCategories,
    trackSkillInteraction
  }
}

// ================================
// Helper Components
// ================================

/**
 * Skills section header with title and description
 */
const SkillsHeader: React.FC = () => (
  <header className="space-y-6">
    <AnimatedContainer animationType="fade-left">
      <Title level="h2" align="end" border="bottom-end">
        Habilidades{' '}
        <Title level="h2" element="span" color="primary">
          Técnicas
        </Title>
      </Title>
    </AnimatedContainer>
    <AnimatedContainer animationType="zoom-out-up">
      <P
        size="grande"
        align="end"
        className="leading-relaxed md:max-w-md lg:max-w-2xl"
        anchor="right"
      >
        Domínio em tecnologias modernas para desenvolvimento de aplicações
        robustas e escaláveis em todo o stack.
      </P>
    </AnimatedContainer>
  </header>
)

/**
 * Skills filter navigation
 */
const SkillsFilter: React.FC<{
  activeFilter: string
  onFilterChange: (filter: string) => void
}> = ({ activeFilter, onFilterChange }) => (
  <AnimatedContainer animationType="fade-up">
    <NavFilter
      className="mt-12"
      options={FILTER_OPTIONS}
      activeFilter={activeFilter}
      onFilterChange={onFilterChange}
      size="medium"
      layout="horizontal"
      align="center"
      ariaLabel="Filtrar habilidades por categoria"
    />
  </AnimatedContainer>
)

/**
 * Filtered skills grid with animations
 */
const SkillsGridSection: React.FC<{
  categories: SkillCategory[]
  showCategories: boolean
}> = ({ categories, showCategories }) => (
  <div className="space-y-12">
    {categories.map(({ key, skills, delay }) => (
      <AnimatedContainer key={key}>
        <SkillGrid
          skills={skills}
          columns="responsive"
          gap="medium"
          animationDelay={delay}
          showCategories={showCategories}
        />
      </AnimatedContainer>
    ))}
  </div>
)

// ================================
// Main Component
// ================================

/**
 * Technical skills section with interactive filters
 *
 * Presents technical competencies organized by category,
 * with filter system for better navigation and user experience.
 * Includes analytics for interaction tracking.
 */
const SkillsSection: React.FC<SkillsSectionProps> = ({
  id = 'habilidades-tecnicas'
}) => {
  const { activeFilter, handleFilterChange, filteredCategories } =
    useSkillsFiltering()
  const showCategories = activeFilter === 'all'

  return (
    <section
      id={id}
      aria-labelledby={`${id}-cabeçalho`}
      role="region"
      aria-label="Seção de habilidades técnicas"
    >
      <SkillsHeader />

      <div className="space-y-12">
        <SkillsFilter
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />

        <SkillsGridSection
          categories={filteredCategories}
          showCategories={showCategories}
        />
      </div>
    </section>
  )
}

// ================================
// Exports
// ================================

export default SkillsSection
