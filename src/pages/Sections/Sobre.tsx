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

const SobreSection: React.FC<SobreProps> = ({ id = 'sobre' }) => {
  return (
    <section id={id}>
      <div className="grid lg:grid-cols-2 gap-16">
        {/* Coluna esquerda - Texto */}
        <div className="flex flex-col justify-center space-y-6">
          <Title level="h2">Sobre Mim</Title>
          <div className="space-y-4">
            <Text size="medio">
              Desenvolvedor fullstack apaixonado por tecnologia e inovação, com
              mais de 5 anos de experiência criando soluções digitais que fazem
              a diferença.
            </Text>
            <Text size="medio">
              Especializado em arquiteturas modernas, sempre buscando as
              melhores práticas para entregar produtos de alta qualidade.
              Acredito que o código deve ser elegante, performático e
              sustentável.
            </Text>
            <Text size="medio">
              Quando não estou codando, gosto de contribuir com projetos open
              source, estudar novas tecnologias e compartilhar conhecimento com
              a comunidade.
            </Text>
          </div>
        </div>

        {/* Coluna direita - Foto e tecnologias */}
        <div className="space-y-8">
          {/* Foto */}
          <div className="flex justify-center">
            <img
              src="/path/to/your/photo.jpg"
              alt="Foto do desenvolvedor"
              className="w-64 h-64 rounded-xl border-4 border-primary object-cover cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => {
                // TRACKING: Rastrear clique na foto
                analytics.trackButtonClick('profile_photo', 'sobre_section')
                console.log('Foto do perfil clicada')
              }}
            />
          </div>

          {/* Tecnologias */}
          <div className="space-y-4">
            <Title level="h3">Principais Tecnologias</Title>
            <CardsContainer type="grid" columns={2} compact={true}>
              {tecnologias.map((tech, index) => (
                <Card
                  key={index}
                  layout="horizontal"
                  title={tech.title}
                  subtitle={tech.subtitle}
                  size="pequeno"
                  className="cursor-pointer hover:scale-105 transition-transform"
                />
              ))}
            </CardsContainer>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SobreSection
