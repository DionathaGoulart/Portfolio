import React from 'react'
import { analytics } from '@features/Analytics'
import { SobreSectionProps, Technology } from '@types'
import {
  AnimatedContainer,
  Title,
  Text,
  Image,
  Card,
  CardsContainer
} from '@shared/ui'
import MeRaw from '@assets/images/me.jpg'
import {
  Code2,
  Server,
  Type,
  Database,
  Container,
  GitBranch,
  FileCode,
  Palette,
  Layers
} from 'lucide-react'

// ================================
// Constants
// ================================

/**
 * Optimized profile image
 * Converted to WebP with optimized width for performance
 */
const PROFILE_IMAGE = `${MeRaw}?as=webp&width=400`

// ================================
// Icon Components
// ================================

/**
 * React icon component
 */
const ReactIcon: React.FC = () => (
  <Code2 className="w-6 h-6" />
)

/**
 * Node.js icon component
 */
const NodeIcon: React.FC = () => (
  <Server className="w-6 h-6" />
)

/**
 * TypeScript icon component
 */
const TypeScriptIcon: React.FC = () => (
  <Type className="w-6 h-6" />
)

/**
 * MongoDB icon component
 */
const MongoDBIcon: React.FC = () => (
  <Database className="w-6 h-6" />
)

/**
 * PostgreSQL icon component
 */
const PostgreSQLIcon: React.FC = () => (
  <Database className="w-6 h-6" />
)

/**
 * Docker icon component
 */
const DockerIcon: React.FC = () => (
  <Container className="w-6 h-6" />
)

/**
 * Git icon component
 */
const GitIcon: React.FC = () => (
  <GitBranch className="w-6 h-6" />
)

/**
 * Python icon component
 */
const PythonIcon: React.FC = () => (
  <FileCode className="w-6 h-6" />
)

/**
 * Tailwind CSS icon component
 */
const TailwindIcon: React.FC = () => (
  <Palette className="w-6 h-6" />
)

/**
 * Django icon component
 */
const DjangoIcon: React.FC = () => (
  <Layers className="w-6 h-6" />
)



/**
 * Main technologies array with information
 * Based on technologies used in real projects
 */
const TECHNOLOGIES: Technology[] = [
  {
    title: 'React',
    subtitle: 'Library',
    icon: <ReactIcon />
  },
  {
    title: 'Node.js',
    subtitle: 'Runtime',
    icon: <NodeIcon />
  },
  {
    title: 'TypeScript',
    subtitle: 'Language',
    icon: <TypeScriptIcon />
  },
  {
    title: 'MongoDB',
    subtitle: 'NoSQL',
    icon: <MongoDBIcon />
  },
  {
    title: 'PostgreSQL',
    subtitle: 'SQL',
    icon: <PostgreSQLIcon />
  },
  {
    title: 'Docker',
    subtitle: 'Containers',
    icon: <DockerIcon />
  },
  {
    title: 'Git',
    subtitle: 'Version Control',
    icon: <GitIcon />
  },
  {
    title: 'Python',
    subtitle: 'Language',
    icon: <PythonIcon />
  },
  {
    title: 'Tailwind',
    subtitle: 'CSS',
    icon: <TailwindIcon />
  },
  {
    title: 'Django',
    subtitle: 'Framework',
    icon: <DjangoIcon />
  }
]

// ================================
// Helper Functions
// ================================

/**
 * Handles profile photo click with analytics
 */
const handleProfilePhotoClick = (): void => {
  analytics.trackButtonClick('profile_photo')
}

// ================================
// Helper Components
// ================================

/**
 * Section header
 */
const SobreHeader: React.FC = () => (
  <header>
    <Title id="sobre-título" level="h2" align="end" border="bottom-end">
      Sobre{' '}
      <Title level="h2" element="span" color="primary">
        Mim
      </Title>
    </Title>
  </header>
)

/**
 * Profile and biography section
 */
const ProfileSection: React.FC = () => (
  <AnimatedContainer>
    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
      <div
        role="img"
        aria-label="Foto de perfil do desenvolvedor"
        className="flex justify-center"
      >
        <Image
          src={PROFILE_IMAGE}
          alt="Foto do desenvolvedor"
          size="sidebar"
          shape="rectangle"
          shadow="strong"
          neonFire="primary"
          onClick={handleProfilePhotoClick}
        />
      </div>

      <div className="flex-1" role="main">
        <Text
          size="grande"
          columns={3}
          className="flex-1"
          aria-label="Biografia profissional"
        >
          Busco minha primeira oportunidade profissional para evoluir tecnicamente, trabalhar com profissionais experientes e contribuir com código de qualidade. Encaro desafios complexos como minha principal motivação para crescer e aprimorar minhas habilidades.

Me defino pela curiosidade técnica insaciável, rapidez no aprendizado e comprometimento em transformar problemas em soluções funcionais. Apesar de não ter experiência formal, tenho mais de 2 anos de prática em freelances e projetos pessoais, além de contribuir com projetos open source e aplicar sempre as melhores práticas do mercado.
        </Text>
      </div>
    </div>
  </AnimatedContainer>
)

/**
 * Technologies showcase section
 */
const TechnologiesSection: React.FC = () => (
  <section aria-labelledby="principais-tecnologias" role="complementary">
    <div className="space-y-6">
      <AnimatedContainer animationType="zoom-out-up">
        <Title id="tech-título" level="h3" align="center" color="primary">
          Principais Tecnologias
        </Title>
      </AnimatedContainer>

      <AnimatedContainer>
        <div role="list" aria-label="Lista de tecnologias dominadas">
          <CardsContainer type="grid" columns={5}>
            {TECHNOLOGIES.map((tech, index) => (
              <div
                key={`tech-${index}`}
                role="listitem"
                aria-label={`${tech.title} - ${tech.subtitle}`}
              >
                <Card
                  title={tech.title}
                  subtitle={tech.subtitle}
                  icon={tech.icon}
                  size="pequeno"
                  color="primary"
                />
              </div>
            ))}
          </CardsContainer>
        </div>
      </AnimatedContainer>
    </div>
  </section>
)

// ================================
// Main Component
// ================================

/**
 * "About Me" section with personal information and technologies
 * Includes profile photo, biography and technology stack
 */
const SobreSection: React.FC<SobreSectionProps> = ({ id = 'sobre-mim' }) => {
  return (
    <section id={id} aria-labelledby="sobre-min" role="region">
      <div className="space-y-12">
        <SobreHeader />
        <ProfileSection />
        <TechnologiesSection />
      </div>
    </section>
  )
}

// ================================
// Exports
// ================================

export default SobreSection
