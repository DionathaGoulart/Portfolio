import { Button } from '@/shared/ui/Button'
import { GDLogo } from '@/shared/ui/Logo'
import { Span, P } from '@/shared/ui/Text'
import { Title } from '@/shared/ui/Title'

const HomeSection: React.FC = () => {
  const handleVerTrabalhos = () => {
    console.log('Ver trabalhos clicado')
  }

  const handleContato = () => {
    console.log('Contato clicado')
  }

  return (
    <div className="min-h-screen  flex items-center">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
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
      </div>
    </div>
  )
}

export default HomeSection
