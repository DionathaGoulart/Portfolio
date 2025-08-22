import { analytics } from '@/features/Analytics/utils/analytics'
import { Button } from '@/shared/ui/Button'
import { GDLogo } from '@/shared/ui/Logo'
import { P } from '@/shared/ui/Text'
import { Title } from '@/shared/ui/Title'

interface HomeSectionProps {
  id?: string
}

const HomeSection: React.FC<HomeSectionProps> = ({ id = 'inicio' }) => {
  const handleVerTrabalhos = () => {
    // TRACKING: Rastrear clique no botão "Ver Trabalhos"
    analytics.trackButtonClick('ver_trabalhos', 'home_section')

    // Rolar para a seção de projetos
    const projectsSection = document.getElementById('meus-projetos')
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' })
    }

    console.log('Ver trabalhos clicado')
  }

  const handleContato = () => {
    // TRACKING: Rastrear clique no botão "Contato"
    analytics.trackButtonClick('contato', 'home_section')

    // Rolar para a seção de contato
    const contactSection = document.getElementById('fale-comigo')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }

    console.log('Contato clicado')
  }

  return (
    <section id={id}>
      <div className="grid lg:grid-cols-2">
        {/* Lado esquerdo - Textos */}
        <div className="space-y-6">
          <Title variant="hero" level="h1" uppercase>
            dionatha <br />
            <Title variant="hero" level="h1" element="span" color="primary">
              goulart
            </Title>
          </Title>
          <Title level="h3" className="font-normal">
            desenvolvedor fullstack
          </Title>
          <P size="grande" className="max-w-lg leading-relaxed">
            Desenvolvedor apaixonado por criar soluções digitais inovadoras,
            combinando design elegante com código limpo e funcional.
          </P>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              variant="solid"
              size="grande"
              onClick={handleVerTrabalhos}
              className="w-full sm:w-auto"
            >
              ver trabalhos
            </Button>
            <Button
              variant="outline"
              size="grande"
              onClick={handleContato}
              className="w-full sm:w-auto"
            >
              contato
            </Button>
          </div>
        </div>
        {/* Lado direito - Logo GD - Oculto no mobile */}
        <div className="hidden lg:flex justify-end">
          <GDLogo />
        </div>
      </div>
    </section>
  )
}

export default HomeSection
