import React from 'react'
import { getImage } from '@core/utils/getImage'
import { analytics } from '@features/Analytics/utils'
import {
  AnimatedContainer,
  Title,
  Text,
  Image,
  Card,
  CardsContainer
} from '@shared/ui'
import MeRaw from '@assets/images/me.jpg'

// ================================
// Types & Interfaces
// ================================

/**
 * Props for the SobreSection component
 */
interface SobreSectionProps {
  /** Unique section ID for navigation/anchors */
  id?: string
}

/**
 * Technology structure interface
 */
interface Technology {
  /** Technology name */
  title: string
  /** Category or application area */
  subtitle: string
  /** Technology SVG icon */
  icon: React.ReactNode
}

// ================================
// Constants
// ================================

/**
 * Optimized profile image
 * Converted to WebP with optimized width for performance
 */
const PROFILE_IMAGE = getImage(`${MeRaw}?as=webp&width=400`)

// ================================
// Icon Components
// ================================

/**
 * React SVG icon
 * Used to represent frontend development expertise
 */
const ReactIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278h-.029zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.36-.034-.47 0-.92.014-1.36.034.44-.572.895-1.096 1.36-1.564zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.866.728-.064 1.466-.098 2.21-.098z" />
  </svg>
)

/**
 * Node.js SVG icon
 * Represents backend development expertise
 */
const NodeIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0 l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L2.46,6.68C2.376,6.729,2.324,6.825,2.324,6.921v10.15c0,0.097,0.053,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.570,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z" />
  </svg>
)

/**
 * TypeScript SVG icon
 * Represents static typing for JavaScript
 */
const TypeScriptIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" />
  </svg>
)

/**
 * Next.js SVG icon
 * React framework for full-stack applications
 */
const NextJSIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M11.5725 0c-.1763 0-.3098.0013-.3584.0067-.0516.0053-.2159.021-.3636.0328-3.4088.3073-6.6017 2.1463-8.624 4.9728C1.1004 6.584.3802 8.3666.1082 10.255c-.0962.659-.108.8537-.108 1.7474s.012 1.0884.108 1.7476c.652 4.506 3.8591 8.2919 8.2087 9.6945.7789.2511 1.6.4223 2.5337.5255.3636.04 1.9354.04 2.299 0 1.6117-.1783 2.9772-.577 4.3237-1.2643.2065-.1056.2464-.1337.2183-.1573-.0188-.0139-.8987-1.1938-1.9543-2.62l-1.919-2.592-2.4047-3.5583c-1.3231-1.9564-2.4117-3.556-2.4211-3.556-.0094-.0026-.0187 1.5787-.0235 3.509-.0067 3.3802-.0093 3.5162-.0516 3.596-.061.115-.108.1618-.2064.2134-.075.0374-.1408.0445-.5429.0445h-.4721l-.0967-.0594c-.0188-.012-.0335-.0335-.0454-.0609-.0067-.0335-.0106-.1573-.0106-3.5494-.0013-3.9651-.0013-3.5208.0094-3.5494.0093-.0334.0185-.0619.0334-.0848.0188-.0334.0334-.0454.0708-.0594.0334-.0106.1066-.0106.9112-.0106h.8674l.1055.0187c.0516.0106.1055.0334.1573.0721.0516.0374.1013.0844.1427.1361l7.1535 10.6616 2.5893-3.8804.0093-.0139c.0054-.008.0107-.0159.0161-.0238.0054-.008.0107-.0159.0161-.0237l2.5893-3.8804z" />
  </svg>
)

/**
 * PostgreSQL SVG icon
 * Relational database management system
 */
const PostgreSQLIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.128 0C15.821 0 14.941.36 14.22 1.116c-.721.756-.954 1.616-1.1 2.563-.073.474-.073 1.058-.073 1.836v15.55c0 1.25 0 2.25.366 2.948.366.696.878 1.077 1.463 1.231 1.17.307 2.56.307 3.756 0 .585-.154 1.097-.535 1.463-1.231.366-.697.366-1.697.366-2.948V5.515c0-.778 0-1.362-.073-1.836-.146-.947-.379-1.807-1.1-2.563C19.668.36 18.789 0 17.481 0c-.234 0-.353 0-.353 0zM12 7c-1.65 0-3 1.35-3 3v8c0 1.65 1.35 3 3 3s3-1.35 3-3v-8c0-1.65-1.35-3-3-3zm-8.872 0C1.821 7 .941 7.36.22 8.116c-.721.756-.954 1.616-1.1 2.563C-.953 11.153-.953 11.737-.953 12.515v8.55c0 1.25 0 2.25.366 2.948.366.696.878 1.077 1.463 1.231 1.17.307 2.56.307 3.756 0 .585-.154 1.097-.535 1.463-1.231.366-.697.366-1.697.366-2.948v-8.55c0-.778 0-1.362-.073-1.836-.146-.947-.379-1.807-1.1-2.563C4.668 7.36 3.789 7 2.481 7c-.234 0-.353 0-.353 0z" />
  </svg>
)

/**
 * Docker SVG icon
 * Containerization platform for DevOps
 */
const DockerIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.186m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338 0-.676.033-1.01.099-.663-2.976-2.23-4.497-4.676-4.497l-.253.005-.15.233C15.353 5.77 15.244 6.35 15.244 7.026v.244H4.682l-.084.381c-.19.85-.302 1.729-.335 2.615-.027.671.164 1.342.565 1.918.562 1.058 1.145 1.82 1.735 2.272 1.181.937 2.718 1.425 4.571 1.425.876 0 1.729-.08 2.529-.238 1.707-.345 3.18-.919 4.37-1.709 1.808-1.2 2.91-2.71 3.25-4.46.797.48 1.528.511 1.848.511.297 0 .462-.047.462-.047l.244-.678c-.057-.204-.253-.406-.675-.599z" />
  </svg>
)

/**
 * Main technologies array with information
 * Organized by category for easy maintenance
 */
const TECHNOLOGIES: Technology[] = [
  {
    title: 'React',
    subtitle: 'Frontend',
    icon: <ReactIcon />
  },
  {
    title: 'Node.js',
    subtitle: 'Backend',
    icon: <NodeIcon />
  },
  {
    title: 'TypeScript',
    subtitle: 'Language',
    icon: <TypeScriptIcon />
  },
  {
    title: 'Next.js',
    subtitle: 'Framework',
    icon: <NextJSIcon />
  },
  {
    title: 'PostgreSQL',
    subtitle: 'Database',
    icon: <PostgreSQLIcon />
  },
  {
    title: 'Docker',
    subtitle: 'DevOps',
    icon: <DockerIcon />
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
          Desenvolvedor fullstack apaixonado por tecnologia e inovação, com mais
          de 5 anos de experiência criando soluções digitais que fazem a
          diferença. Especializado em arquiteturas modernas, sempre buscando as
          melhores práticas para entregar produtos de alta qualidade. Acredito
          que o código deve ser elegante, performático e sustentável. Quando não
          estou codando, gosto de contribuir com projetos open source, estudar
          novas tecnologias e compartilhar conhecimento com a comunidade.
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
