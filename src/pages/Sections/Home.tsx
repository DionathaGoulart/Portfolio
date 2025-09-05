import { getImage } from '@core/utils/getImage'
import { analytics } from '@features/Analytics/utils'
import { AnimatedContainer, Button, P, Title } from '@shared/ui'
import Light from '@assets/images/light.png'
import Dark from '@assets/images/dark.png'

interface HomeSectionProps {
  id?: string
}

// URLs das imagens já processadas pelo getImage
const lightImgUrl = getImage(`${Light}?as=webp&width=400`)
const darkImgUrl = getImage(`${Dark}?as=webp&width=400`)

const HomeSection: React.FC<HomeSectionProps> = ({ id = '' }) => {
  const handleVerTrabalhos = () => {
    analytics.trackButtonClick('ver_trabalhos')
    const projectsSection = document.getElementById('meus-projetos')
    if (projectsSection) projectsSection.scrollIntoView({ behavior: 'smooth' })
  }

  const handleContato = () => {
    analytics.trackButtonClick('contato')
    const contactSection = document.getElementById('contato')
    if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id={id}>
      <div className="grid lg:grid-cols-2">
        {/* Lado esquerdo - Textos */}
        <div className="space-y-6">
          <AnimatedContainer animationType="fade-right">
            <Title variant="hero" level="h1" uppercase>
              dionatha <br />
              <Title variant="hero" level="h1" element="span" color="primary">
                goulart
              </Title>
            </Title>
          </AnimatedContainer>

          <AnimatedContainer animationType="fade-up-right">
            <Title level="h3" className="font-normal">
              desenvolvedor fullstack
            </Title>
          </AnimatedContainer>

          <AnimatedContainer animationType="zoom-out-up">
            <P
              size="grande"
              className="leading-relaxed md:max-w-md lg:max-w-none"
            >
              Desenvolvedor apaixonado por criar soluções digitais inovadoras,
              combinando design elegante com código limpo e funcional.
            </P>
          </AnimatedContainer>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 sm:justify-center md:justify-start">
            <AnimatedContainer animationType="fade-up-right">
              <Button
                variant="solid"
                size="grande"
                onClick={handleVerTrabalhos}
                className="w-full sm:w-auto"
              >
                ver trabalhos
              </Button>
            </AnimatedContainer>
            <AnimatedContainer animationType="fade-up-left">
              <Button
                variant="outline"
                size="grande"
                onClick={handleContato}
                className="w-full sm:w-auto"
              >
                contato
              </Button>
            </AnimatedContainer>
          </div>
        </div>

        {/* Lado direito - Logo GD */}
        <AnimatedContainer animationType="zoom-in-left">
          <div className="hidden lg:flex justify-end">
            <img
              src={lightImgUrl}
              alt="Logo GD"
              className="block dark:hidden w-96 h-96"
              loading="lazy"
            />
            <img
              src={darkImgUrl}
              alt="Logo GD"
              className="hidden dark:block w-96 h-96"
              loading="lazy"
            />
          </div>
        </AnimatedContainer>
      </div>
    </section>
  )
}

export default HomeSection
