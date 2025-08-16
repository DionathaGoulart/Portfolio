import { P, Span } from '@/shared/ui/Text'
import { Title } from '@/shared/ui/Title'
import React from 'react'

export const HomePage: React.FC = () => {
  return (
    <div className="theme-container min-h-screen p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Título da página de teste */}
        <Title level="h1" align="center" color="primary" className="mb-8">
          📝 Teste Completo dos Text Components (P e Span)
        </Title>

        {/* 1. Testando todos os tamanhos */}
        <section className="theme-surface p-6 rounded-lg border theme-border">
          <Title level="h2" color="accent" className="mb-6">
            1. Todos os tamanhos (size)
          </Title>

          <div className="space-y-4">
            <div>
              <Title level="h4" className="mb-2">
                Parágrafo (P)
              </Title>
              <P size="pequeno">
                Texto pequeno (text-sm) - Lorem ipsum dolor sit amet consectetur
                adipisicing elit.
              </P>
              <P size="medio">
                Texto médio (text-lg) - PADRÃO - Lorem ipsum dolor sit amet
                consectetur adipisicing elit.
              </P>
              <P size="grande">
                Texto grande (text-xl) - Lorem ipsum dolor sit amet consectetur
                adipisicing elit.
              </P>
            </div>

            <div>
              <Title level="h4" className="mb-2">
                Span
              </Title>
              <div className="space-y-2">
                <div>
                  <Span size="pequeno">Span pequeno (text-sm)</Span>
                </div>
                <div>
                  <Span size="medio">Span médio (text-lg) - PADRÃO</Span>
                </div>
                <div>
                  <Span size="grande">Span grande (text-xl)</Span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Testando todos os alinhamentos */}
        <section className="theme-surface p-6 rounded-lg border theme-border">
          <Title level="h2" color="accent" className="mb-6">
            2. Todos os alinhamentos (align)
          </Title>

          <div className="space-y-4">
            <div>
              <Title level="h4" className="mb-2">
                Parágrafo (P)
              </Title>
              <P align="start" className="mb-2">
                Alinhamento START (text-left) - PADRÃO - Lorem ipsum dolor sit
                amet consectetur adipisicing elit. Soluta delectus deserunt ea
                possimus.
              </P>

              <P align="center" className="mb-2">
                Alinhamento CENTER (text-center) - Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Soluta delectus deserunt ea
                possimus.
              </P>

              <P align="end" className="mb-2">
                Alinhamento END (text-right) - Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Soluta delectus deserunt ea
                possimus.
              </P>
            </div>

            <div>
              <Title level="h4" className="mb-2">
                Span
              </Title>
              <div className="space-y-2">
                <div>
                  <Span align="start">Span alinhado à esquerda (start)</Span>
                </div>
                <div>
                  <Span align="center">Span centralizado (center)</Span>
                </div>
                <div>
                  <Span align="end">Span alinhado à direita (end)</Span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Testando todas as cores */}
        <section className="theme-surface p-6 rounded-lg border theme-border">
          <Title level="h2" color="accent" className="mb-6">
            3. Todas as cores (color)
          </Title>

          <div className="space-y-6">
            <div>
              <Title level="h4" className="mb-3">
                Parágrafo (P)
              </Title>
              <div className="space-y-2">
                <P color="primary">
                  🔵 Primary - Lorem ipsum dolor sit amet consectetur
                  adipisicing elit.
                </P>
                <P color="secondary">
                  ⚫ Secondary - Lorem ipsum dolor sit amet consectetur
                  adipisicing elit.
                </P>
                <P color="accent">
                  🟣 Accent - Lorem ipsum dolor sit amet consectetur adipisicing
                  elit.
                </P>
                <P color="text">
                  ⚪ Text - PADRÃO - Lorem ipsum dolor sit amet consectetur
                  adipisicing elit.
                </P>
                <P color="text-secondary">
                  🔘 Text Secondary - Lorem ipsum dolor sit amet consectetur
                  adipisicing elit.
                </P>
                <P color="error">
                  🔴 Error - Lorem ipsum dolor sit amet consectetur adipisicing
                  elit.
                </P>
                <P color="success">
                  🟢 Success - Lorem ipsum dolor sit amet consectetur
                  adipisicing elit.
                </P>
                <P color="warning">
                  🟡 Warning - Lorem ipsum dolor sit amet consectetur
                  adipisicing elit.
                </P>
              </div>
            </div>

            <div>
              <Title level="h4" className="mb-3">
                Span
              </Title>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Span color="primary">🔵 Primary Span</Span>
                </div>
                <div>
                  <Span color="secondary">⚫ Secondary Span</Span>
                </div>
                <div>
                  <Span color="accent">🟣 Accent Span</Span>
                </div>
                <div>
                  <Span color="text">⚪ Text Span (padrão)</Span>
                </div>
                <div>
                  <Span color="text-secondary">🔘 Text Secondary Span</Span>
                </div>
                <div>
                  <Span color="error">🔴 Error Span</Span>
                </div>
                <div>
                  <Span color="success">🟢 Success Span</Span>
                </div>
                <div>
                  <Span color="warning">🟡 Warning Span</Span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Testando combinações complexas */}
        <section className="theme-surface p-6 rounded-lg border theme-border">
          <Title level="h2" color="accent" className="mb-6">
            4. Combinações complexas
          </Title>

          <div className="space-y-6">
            {/* P + Grande + Center + Primary */}
            <P
              size="grande"
              align="center"
              color="primary"
              className="border-b border-theme-border pb-4 font-semibold"
            >
              P + Grande + Center + Primary + Classe Custom
            </P>

            {/* P + Pequeno + End + Accent */}
            <P
              size="pequeno"
              align="end"
              color="accent"
              id="paragrafo-especial"
              className="italic"
            >
              P + Pequeno + End + Accent + ID + Italic
            </P>

            {/* Span + Grande + Center + Success */}
            <div className="text-center">
              <Span
                size="grande"
                align="center"
                color="success"
                className="bg-theme-surface p-2 rounded font-bold"
              >
                Span + Grande + Center + Success + Background
              </Span>
            </div>

            {/* Texto misto com spans coloridos */}
            <P size="medio">
              Este é um parágrafo normal que contém{' '}
              <Span color="accent" className="font-semibold">
                spans coloridos
              </Span>{' '}
              e{' '}
              <Span color="success" size="grande">
                spans de tamanhos diferentes
              </Span>{' '}
              dentro dele para demonstrar o uso misto.
            </P>

            {/* P + Médio + Start + Warning */}
            <P
              size="medio"
              align="start"
              color="warning"
              className="uppercase tracking-wide font-mono bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded"
            >
              P + Médio + Start + Warning + Uppercase + Mono
            </P>
          </div>
        </section>

        {/* 5. Testando com padrões (sem props) */}
        <section className="theme-surface p-6 rounded-lg border theme-border">
          <Title level="h2" color="accent" className="mb-6">
            5. Usando padrões (sem props)
          </Title>

          <div className="space-y-4">
            <P>
              Este parágrafo usa TODOS os padrões: as="p", size="medio",
              align="start", color="text"
            </P>

            <div>
              Texto normal com <Span>span padrão</Span> no meio da frase.
            </div>

            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded text-sm theme-text-secondary">
              <strong>Códigos:</strong>
              <br />
              <code>&lt;P&gt;Parágrafo padrão&lt;/P&gt;</code>
              <br />
              <code>&lt;Span&gt;Span padrão&lt;/Span&gt;</code>
            </div>
          </div>
        </section>

        {/* 6. Testando casos especiais */}
        <section className="theme-surface p-6 rounded-lg border theme-border">
          <Title level="h2" color="accent" className="mb-6">
            6. Casos especiais e responsividade
          </Title>

          <div className="space-y-6">
            {/* Texto longo */}
            <P
              size="grande"
              align="center"
              color="primary"
              className="break-words leading-relaxed"
            >
              Este é um parágrafo muito longo para testar quebra de linha e
              responsividade em diferentes tamanhos de tela. Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Soluta delectus deserunt ea
              possimus cupiditate quasi laudantium molestiae eligendi
              voluptatibus minima asperiores.
            </P>

            {/* Com emojis */}
            <P size="medio" align="center" color="accent">
              🚀 Parágrafo com Emojis 🎉 e Símbolos ✨ para testar renderização
              especial
            </P>

            {/* Diferentes idiomas */}
            <div className="grid md:grid-cols-3 gap-4">
              <P size="pequeno" align="center" color="secondary">
                English paragraph with some text content for testing purposes.
              </P>

              <P size="pequeno" align="center" color="secondary">
                Parágrafo português com algum conteúdo de texto para fins de
                teste.
              </P>

              <P size="pequeno" align="center" color="secondary">
                Párrafo español con algún contenido de texto para propósitos de
                prueba.
              </P>
            </div>

            {/* Com números e caracteres especiais */}
            <P
              size="medio"
              align="center"
              color="warning"
              className="font-mono bg-gray-100 dark:bg-gray-800 p-3 rounded"
            >
              Versão 2.0.1 - Build #12345 [BETA] - Lançamento em 25/12/2024
            </P>

            {/* Spans inline com diferentes propriedades */}
            <P size="medio">
              Este parágrafo demonstra o uso de spans com diferentes
              propriedades:{' '}
              <Span color="error" size="pequeno">
                erro pequeno
              </Span>
              ,{' '}
              <Span color="success" size="grande">
                sucesso grande
              </Span>
              ,{' '}
              <Span color="accent" className="font-bold">
                accent em negrito
              </Span>
              , e{' '}
              <Span color="text-secondary" className="italic">
                texto secundário em itálico
              </Span>
              .
            </P>
          </div>
        </section>

        {/* 7. Demonstração em um layout real */}
        <section className="theme-surface p-8 rounded-lg border theme-border">
          <Title level="h2" color="accent" className="mb-8">
            7. Exemplo em layout real
          </Title>

          <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <Title level="h1" align="center" color="primary">
                Nossos Serviços
              </Title>

              <P
                size="grande"
                align="center"
                color="text-secondary"
                className="max-w-3xl mx-auto"
              >
                Oferecemos soluções completas e inovadoras para transformar seu
                negócio digital
              </P>
            </div>

            {/* Cards de serviços */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="theme-surface border theme-border rounded-lg p-6 space-y-4">
                <Title level="h3" color="accent">
                  Desenvolvimento Web
                </Title>

                <P size="medio" color="text-secondary">
                  Criamos aplicações web modernas e responsivas usando as
                  melhores tecnologias do mercado.
                </P>

                <div className="space-y-2">
                  <P size="pequeno" className="font-semibold">
                    Tecnologias:
                  </P>
                  <div className="flex flex-wrap gap-2">
                    <Span
                      size="pequeno"
                      color="accent"
                      className="bg-theme-accent text-white px-2 py-1 rounded"
                    >
                      React
                    </Span>
                    <Span
                      size="pequeno"
                      color="accent"
                      className="bg-theme-accent text-white px-2 py-1 rounded"
                    >
                      TypeScript
                    </Span>
                    <Span
                      size="pequeno"
                      color="accent"
                      className="bg-theme-accent text-white px-2 py-1 rounded"
                    >
                      Node.js
                    </Span>
                  </div>
                </div>

                <P size="pequeno" color="success" className="font-semibold">
                  A partir de R$ 5.000
                </P>
              </div>

              <div className="theme-surface border theme-border rounded-lg p-6 space-y-4">
                <Title level="h3" color="accent">
                  Design UI/UX
                </Title>

                <P size="medio" color="text-secondary">
                  Desenvolvemos interfaces intuitivas que proporcionam a melhor
                  experiência para seus usuários.
                </P>

                <div className="space-y-2">
                  <P size="pequeno" className="font-semibold">
                    Incluindo:
                  </P>
                  <div className="space-y-1">
                    <P size="pequeno" color="text-secondary">
                      • Prototipagem
                    </P>
                    <P size="pequeno" color="text-secondary">
                      • Design System
                    </P>
                    <P size="pequeno" color="text-secondary">
                      • Testes de Usabilidade
                    </P>
                  </div>
                </div>

                <P size="pequeno" color="success" className="font-semibold">
                  A partir de R$ 3.000
                </P>
              </div>

              <div className="theme-surface border theme-border rounded-lg p-6 space-y-4">
                <Title level="h3" color="accent">
                  Consultoria Tech
                </Title>

                <P size="medio" color="text-secondary">
                  Ajudamos sua empresa a tomar as melhores decisões tecnológicas
                  para o futuro.
                </P>

                <div className="space-y-2">
                  <P size="pequeno" className="font-semibold">
                    Serviços:
                  </P>
                  <div className="space-y-1">
                    <P size="pequeno" color="text-secondary">
                      • Arquitetura de Software
                    </P>
                    <P size="pequeno" color="text-secondary">
                      • Code Review
                    </P>
                    <P size="pequeno" color="text-secondary">
                      • Mentoria Técnica
                    </P>
                  </div>
                </div>

                <P size="pequeno" color="success" className="font-semibold">
                  R$ 200/hora
                </P>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center space-y-4 pt-8 border-t border-theme-border">
              <Title level="h3" color="primary">
                Interessado nos nossos serviços?
              </Title>

              <P size="medio" align="center" color="text-secondary">
                Entre em contato conosco e vamos conversar sobre como podemos
                ajudar seu projeto
              </P>

              <div className="flex justify-center gap-4">
                <Span
                  size="pequeno"
                  color="accent"
                  className="cursor-pointer hover:underline"
                >
                  contato@empresa.com
                </Span>
                <Span size="pequeno" color="text-secondary">
                  |
                </Span>
                <Span
                  size="pequeno"
                  color="accent"
                  className="cursor-pointer hover:underline"
                >
                  (11) 99999-9999
                </Span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
