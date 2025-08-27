import React, { useState } from 'react'
import { analytics } from '@/features/Analytics/utils/analytics'
import { P } from '@/shared/ui/Text'
import { Title } from '@/shared/ui/Title'
import {
  Skill,
  SkillsSectionProps,
  SkillCategory
} from '@/shared/types/ui/Skill.types'
import { SkillGrid } from '@/shared/ui/Skill'
import { NavFilter } from '@/shared/ui/NavFilter'

// ============================================================================
// DADOS DAS HABILIDADES
// ============================================================================

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

// Categorias e suas configurações
const skillCategories = [
  {
    key: 'frontend',
    skills: skillsData.filter((s) => s.category === 'frontend'),
    delay: 100
  },
  {
    key: 'backend',
    skills: skillsData.filter((s) => s.category === 'backend'),
    delay: 150
  },
  {
    key: 'database',
    skills: skillsData.filter((s) => s.category === 'database'),
    delay: 200
  },
  {
    key: 'tools',
    skills: skillsData.filter((s) => s.category === 'tools'),
    delay: 250
  },
  {
    key: 'mobile',
    skills: skillsData.filter((s) => s.category === 'mobile'),
    delay: 300
  }
]

// Opções para o filtro
const filterOptions = [
  { value: 'all', label: 'Todas' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'database', label: 'Database' },
  { value: 'tools', label: 'Ferramentas' },
  { value: 'mobile', label: 'Mobile' }
]

// ============================================================================
// SKILLS SECTION COMPONENT
// ============================================================================

const SkillsSection: React.FC<SkillsSectionProps> = ({
  id = 'habilidades-tecnicas'
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all')

  const trackSkillInteraction = (skillName: string) => {
    analytics.trackButtonClick(`skill_viewed_${skillName.toLowerCase()}`)
  }

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter)
    analytics.trackButtonClick(`skills_filter_${filter}`)
  }

  // Filtra as categorias baseado no filtro ativo
  const getFilteredCategories = () => {
    if (activeFilter === 'all') {
      return skillCategories
    }
    return skillCategories.filter((category) => category.key === activeFilter)
  }

  return (
    <section id={id}>
      {/* Header */}
      <div className="space-y-6">
        <Title level="h2" border="bottom-start">
          habilidades técnicas
        </Title>
        <P size="grande" className="max-w-2xl leading-relaxed">
          Domínio em tecnologias modernas para desenvolvimento de aplicações
          robustas e escaláveis em todo o stack.
        </P>
      </div>

      {/* Filtros */}
      <NavFilter
        options={filterOptions}
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
        size="medium"
        layout="horizontal"
        align="center"
        ariaLabel="Filtrar habilidades por categoria"
      />

      {/* Skills Grid */}
      {getFilteredCategories().map(({ key, skills, delay }) => (
        <SkillGrid
          key={key}
          skills={skills}
          columns="responsive"
          gap="medium"
          animationDelay={delay}
          showCategories={activeFilter === 'all'} // Só mostra títulos quando "Todas" está ativo
        />
      ))}
    </section>
  )
}

export default SkillsSection
