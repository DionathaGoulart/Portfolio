import React from 'react'
import { analytics } from '@/features/Analytics/utils/analytics'
import { Title } from '@/shared/ui/Title'
import { Text } from '@/shared/ui/Text'
import { Card, CardsContainer } from '@/shared/ui/Card'

interface SobreProps {
  id?: string
}

const tecnologias = [
  { title: 'React', subtitle: 'Frontend' },
  { title: 'Node.js', subtitle: 'Backend' },
  { title: 'TypeScript', subtitle: 'Language' },
  { title: 'Next.js', subtitle: 'Framework' },
  { title: 'PostgreSQL', subtitle: 'Database' },
  { title: 'Docker', subtitle: 'DevOps' }
]

const SobreSection: React.FC<SobreProps> = ({ id = 'sobre-mim' }) => {
  return (
    <section id={id}>
      <div className="space-y-12">
        {/* Título centralizado */}
        <div className="text-center">
          <Title level="h2" border="bottom-start">
            Sobre {''}
            <Title level="h2" element="span" color="primary">
              Mim
            </Title>
          </Title>
        </div>

        {/* Texto em duas colunas */}
        <div className="grid md:grid-cols-1 gap-8">
          <div className="space-y-4">
            <Text
              size="grande"
              columnLayout={{
                enabled: true,
                layoutType: 'sidebar',
                sidebarColumns: 3,
                imagePosition: 'center',
                gap: 'large',
                image: {
                  src: '/me.jpg',
                  alt: 'Foto do desenvolvedor',
                  onClick: () => {
                    // TRACKING: Rastrear clique na foto
                    analytics.trackButtonClick('profile_photo')
                  }
                }
              }}
            >
              Desenvolvedor fullstack apaixonado por tecnologia e inovação, com
              mais de 5 anos de experiência criando soluções digitais que fazem
              a diferença. Especializado em arquiteturas modernas, sempre
              buscando as melhores práticas para entregar produtos de alta
              qualidade. Acredito que o código deve ser elegante, performático e
              sustentável. Quando não estou codando, gosto de contribuir com
              projetos open source, estudar novas tecnologias e compartilhar
              conhecimento com a comunidade.
            </Text>
          </div>
        </div>

        {/* Tecnologias */}
        <div className="space-y-6">
          <div className="text-center">
            <Title level="h3">Principais Tecnologias</Title>
          </div>
          <CardsContainer type="grid" columns={3} compact={true}>
            {tecnologias.map((tech, index) => (
              <Card
                key={index}
                layout="horizontal"
                title={tech.title}
                subtitle={tech.subtitle}
                size="pequeno"
                className="cursor-pointer hover:scale-105 transition-transform duration-300"
              />
            ))}
          </CardsContainer>
        </div>
      </div>
    </section>
  )
}

export default SobreSection
