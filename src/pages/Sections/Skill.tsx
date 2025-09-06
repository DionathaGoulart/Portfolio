import React, { useState } from 'react'
import { analytics } from '@features/Analytics/utils'
import { AnimatedContainer, Title, P, NavFilter, SkillGrid } from '@shared/ui'
import { Skill } from '@shared/types'

// ================================
// INTERFACES E TIPOS
// ================================

/**
 * Props do componente SkillsSection
 */
interface SkillsSectionProps {
  /** ID único da seção para âncoras e navegação */
  id?: string
}

/**
 * Configuração de categoria de habilidades
 */
interface SkillCategory {
  key: string
  skills: Skill[]
  delay: number
}

/**
 * Opção de filtro para navegação
 */
interface FilterOption {
  value: string
  label: string
}

// ================================
// DADOS E CONFIGURAÇÕES
// ================================

/**
 * Dados das habilidades técnicas organizadas por categoria
 */
const skillsData: Skill[] = [
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
 * Configuração das categorias de habilidades com delays para animação
 */
const skillCategories: SkillCategory[] = [
  {
    key: 'frontend',
    skills: skillsData.filter((skill) => skill.category === 'frontend'),
    delay: 100
  },
  {
    key: 'backend',
    skills: skillsData.filter((skill) => skill.category === 'backend'),
    delay: 150
  },
  {
    key: 'database',
    skills: skillsData.filter((skill) => skill.category === 'database'),
    delay: 200
  },
  {
    key: 'tools',
    skills: skillsData.filter((skill) => skill.category === 'tools'),
    delay: 250
  },
  {
    key: 'mobile',
    skills: skillsData.filter((skill) => skill.category === 'mobile'),
    delay: 300
  }
]

/**
 * Opções de filtro para navegação entre categorias
 */
const filterOptions: FilterOption[] = [
  { value: 'all', label: 'Todas' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'database', label: 'Database' },
  { value: 'tools', label: 'Ferramentas' },
  { value: 'mobile', label: 'Mobile' }
]

// ================================
// HOOKS E FUNÇÕES AUXILIARES
// ================================

/**
 * Hook customizado para gerenciar filtros e analytics das habilidades
 */
const useSkillsFiltering = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all')

  const trackSkillInteraction = (skillName: string): void => {
    analytics.trackButtonClick(`skill_viewed_${skillName.toLowerCase()}`)
  }

  const handleFilterChange = (filter: string): void => {
    setActiveFilter(filter)
    analytics.trackButtonClick(`skills_filter_${filter}`)
  }

  const getFilteredCategories = (): SkillCategory[] => {
    if (activeFilter === 'all') {
      return skillCategories
    }
    return skillCategories.filter((category) => category.key === activeFilter)
  }

  return {
    activeFilter,
    trackSkillInteraction,
    handleFilterChange,
    getFilteredCategories
  }
}

// ================================
// COMPONENTES
// ================================

/**
 * Cabeçalho da seção de habilidades com título e descrição
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
 * Grade de habilidades filtradas com animações
 */
interface SkillsGridSectionProps {
  categories: SkillCategory[]
  showCategories: boolean
}

const SkillsGridSection: React.FC<SkillsGridSectionProps> = ({
  categories,
  showCategories
}) => (
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
// COMPONENTE PRINCIPAL
// ================================

/**
 * Seção de habilidades técnicas com filtros interativos
 *
 * Apresenta as competências técnicas organizadas por categoria,
 * com sistema de filtros para melhor navegação e experiência do usuário.
 * Inclui analytics para rastreamento de interações.
 *
 * @param props - Propriedades do componente
 * @returns JSX.Element
 */
const SkillsSection: React.FC<SkillsSectionProps> = ({
  id = 'habilidades-tecnicas'
}) => {
  const { activeFilter, handleFilterChange, getFilteredCategories } =
    useSkillsFiltering()

  const filteredCategories = getFilteredCategories()
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
        {/* Navegação de filtros */}
        <AnimatedContainer animationType="fade-up">
          <NavFilter
            className="mt-12"
            options={filterOptions}
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
            size="medium"
            layout="horizontal"
            align="center"
            ariaLabel="Filtrar habilidades por categoria"
          />
        </AnimatedContainer>

        {/* Grade de habilidades */}
        <SkillsGridSection
          categories={filteredCategories}
          showCategories={showCategories}
        />
      </div>
    </section>
  )
}

export default SkillsSection
