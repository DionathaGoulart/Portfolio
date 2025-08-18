// HomeSection.tsx
import { Button } from '@/shared/ui/Button'
import { GDLogo } from '@/shared/ui/Logo'
import { Span, P } from '@/shared/ui/Text'
import { Title } from '@/shared/ui/Title'

// Adicionar a interface para as props
interface HomeSectionProps {
  id?: string // Tornamos o ID opcional, se precisar
}

// Atualizar o componente para receber a prop 'id'
const SobreSection: React.FC<HomeSectionProps> = ({ id = 'inicio' }) => {
  const handleVerTrabalhos = () => {
    console.log('Ver trabalhos clicado')
  }

  const handleContato = () => {
    console.log('Contato clicado')
  }

  return (
    // Usar o ID da prop aqui
    <section id={id} className="min-h-screen flex items-center py-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
        {/* Lado esquerdo - Textos */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Title variant="hero" level="h1" uppercase>
              dionatha <br />
              <Title variant="hero" level="h1" element="span" color="primary">
                goulart
              </Title>
            </Title>
          </div>
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

export default SobreSection
