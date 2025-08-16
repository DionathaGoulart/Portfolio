import { Button } from '@/shared/ui/Button'
import { P, Span } from '@/shared/ui/Text'
import { Title } from '@/shared/ui/Title'
import React from 'react'

export const HomePage: React.FC = () => {
  // Função de exemplo para teste
  const handleClick = () => {
    alert('Botão clicado!')
  }

  const handleSubmit = () => {
    alert('Formulário enviado!')
  }

  return (
    <div className="theme-container min-h-screen p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Título da página de teste */}
        <Title level="h1" align="center" color="primary" className="mb-8">
          🔘 Teste Completo do Button Component
        </Title>

        {/* 1. Testando todos os tamanhos */}
        <section className="theme-surface p-6 rounded-lg border theme-border">
          <Title level="h2" color="accent" className="mb-6">
            1. Todos os tamanhos (size)
          </Title>

          <div className="space-y-4">
            <div>
              <P size="pequeno" className="mb-2 font-semibold">
                Pequeno (text-sm):
              </P>
              <Button size="pequeno" onClick={handleClick}>
                Botão Pequeno
              </Button>
            </div>

            <div>
              <P size="pequeno" className="mb-2 font-semibold">
                Médio (text-lg) - PADRÃO:
              </P>
              <Button size="medio" onClick={handleClick}>
                Botão Médio
              </Button>
            </div>

            <div>
              <P size="pequeno" className="mb-2 font-semibold">
                Grande (text-xl):
              </P>
              <Button size="grande" onClick={handleClick}>
                Botão Grande
              </Button>
            </div>
          </div>
        </section>

        {/* 2. Testando todas as posições */}
        <section className="theme-surface p-6 rounded-lg border theme-border">
          <Title level="h2" color="accent" className="mb-6">
            2. Todas as posições (align)
          </Title>

          <div className="space-y-6">
            <div>
              <P size="pequeno" className="mb-2 font-semibold">
                Start (esquerda) - PADRÃO:
              </P>
              <Button align="start" onClick={handleClick}>
                Botão à Esquerda
              </Button>
            </div>

            <div>
              <P size="pequeno" className="mb-2 font-semibold">
                Center (centro):
              </P>
              <Button align="center" onClick={handleClick}>
                Botão Centralizado
              </Button>
            </div>

            <div>
              <P size="pequeno" className="mb-2 font-semibold">
                End (direita):
              </P>
              <Button align="end" onClick={handleClick}>
                Botão à Direita
              </Button>
            </div>
          </div>
        </section>

        {/* 3. Testando todas as cores - Solid */}
        <section className="theme-surface p-6 rounded-lg border theme-border">
          <Title level="h2" color="accent" className="mb-6">
            3. Todas as cores - Variante Solid (padrão)
          </Title>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button color="primary" onClick={handleClick}>
              🔵 Primary
            </Button>

            <Button color="secondary" onClick={handleClick}>
              ⚫ Secondary
            </Button>

            <Button color="accent" onClick={handleClick}>
              🟣 Accent
            </Button>

            <Button color="text" onClick={handleClick}>
              ⚪ Text
            </Button>

            <Button color="text-secondary" onClick={handleClick}>
              🔘 Text Secondary
            </Button>

            <Button color="error" onClick={handleClick}>
              🔴 Error
            </Button>

            <Button color="success" onClick={handleClick}>
              🟢 Success
            </Button>

            <Button color="warning" onClick={handleClick}>
              🟡 Warning
            </Button>
          </div>
        </section>

        {/* 4. Testando variante Outline */}
        <section className="theme-surface p-6 rounded-lg border theme-border">
          <Title level="h2" color="accent" className="mb-6">
            4. Variante Outline
          </Title>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button variant="outline" color="primary" onClick={handleClick}>
              🔵 Primary Outline
            </Button>

            <Button variant="outline" color="secondary" onClick={handleClick}>
              ⚫ Secondary Outline
            </Button>

            <Button variant="outline" color="accent" onClick={handleClick}>
              🟣 Accent Outline
            </Button>

            <Button variant="outline" color="error" onClick={handleClick}>
              🔴 Error Outline
            </Button>

            <Button variant="outline" color="success" onClick={handleClick}>
              🟢 Success Outline
            </Button>

            <Button variant="outline" color="warning" onClick={handleClick}>
              🟡 Warning Outline
            </Button>
          </div>
        </section>

        {/* 5. Testando variante Ghost */}
        <section className="theme-surface p-6 rounded-lg border theme-border">
          <Title level="h2" color="accent" className="mb-6">
            5. Variante Ghost
          </Title>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button variant="ghost" color="primary" onClick={handleClick}>
              🔵 Primary Ghost
            </Button>

            <Button variant="ghost" color="secondary" onClick={handleClick}>
              ⚫ Secondary Ghost
            </Button>

            <Button variant="ghost" color="accent" onClick={handleClick}>
              🟣 Accent Ghost
            </Button>

            <Button variant="ghost" color="error" onClick={handleClick}>
              🔴 Error Ghost
            </Button>

            <Button variant="ghost" color="success" onClick={handleClick}>
              🟢 Success Ghost
            </Button>

            <Button variant="ghost" color="warning" onClick={handleClick}>
              🟡 Warning Ghost
            </Button>
          </div>
        </section>

        {/* 6. Testando estados especiais */}
        <section className="theme-surface p-6 rounded-lg border theme-border">
          <Title level="h2" color="accent" className="mb-6">
            6. Estados especiais
          </Title>

          <div className="space-y-6">
            <div>
              <P size="pequeno" className="mb-3 font-semibold">
                Botões desabilitados:
              </P>
              <div className="flex gap-4 flex-wrap">
                <Button disabled onClick={handleClick}>
                  Solid Desabilitado
                </Button>

                <Button variant="outline" disabled onClick={handleClick}>
                  Outline Desabilitado
                </Button>

                <Button variant="ghost" disabled onClick={handleClick}>
                  Ghost Desabilitado
                </Button>
              </div>
            </div>

            <div>
              <P size="pequeno" className="mb-3 font-semibold">
                Tipos de botão:
              </P>
              <div className="flex gap-4 flex-wrap">
                <Button type="button" onClick={handleClick}>
                  Type Button (padrão)
                </Button>

                <Button type="submit" color="success" onClick={handleSubmit}>
                  Type Submit
                </Button>

                <Button
                  type="reset"
                  color="error"
                  onClick={() => alert('Reset!')}
                >
                  Type Reset
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Testando combinações complexas */}
        <section className="theme-surface p-6 rounded-lg border theme-border">
          <Title level="h2" color="accent" className="mb-6">
            7. Combinações complexas
          </Title>

          <div className="space-y-6">
            {/* Grande + Center + Success + Solid */}
            <Button
              size="grande"
              align="center"
              color="success"
              variant="solid"
              onClick={handleClick}
              className="shadow-lg"
            >
              ✅ Grande + Center + Success + Shadow
            </Button>

            {/* Pequeno + End + Error + Outline */}
            <Button
              size="pequeno"
              align="end"
              color="error"
              variant="outline"
              onClick={handleClick}
              id="botao-especial"
            >
              ❌ Pequeno + End + Error + ID
            </Button>

            {/* Médio + Center + Accent + Ghost */}
            <Button
              size="medio"
              align="center"
              color="accent"
              variant="ghost"
              onClick={handleClick}
              className="border border-dashed border-theme-accent"
            >
              ⭐ Médio + Center + Accent + Borda Tracejada
            </Button>
          </div>
        </section>

        {/* 8. Testando com padrões (sem props) */}
        <section className="theme-surface p-6 rounded-lg border theme-border">
          <Title level="h2" color="accent" className="mb-6">
            8. Usando padrões (sem props)
          </Title>

          <Button onClick={handleClick}>Botão com todos os padrões</Button>

          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded text-sm theme-text-secondary">
            <strong>Padrões:</strong>
            <br />
            • size="medio" (text-lg)
            <br />
            • align="start" (esquerda)
            <br />
            • color="primary" (azul)
            <br />
            • variant="solid" (fundo sólido)
            <br />
            • type="button"
            <br />• disabled=false
          </div>
        </section>

        {/* 9. Exemplo em layout real */}
        <section className="theme-surface p-8 rounded-lg border theme-border">
          <Title level="h2" color="accent" className="mb-8">
            9. Exemplo em layout real - Landing Page
          </Title>

          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-6">
              <Title level="h1" align="center" color="primary">
                Transforme seu Negócio
              </Title>

              <P
                size="grande"
                align="center"
                color="text-secondary"
                className="max-w-2xl mx-auto"
              >
                Soluções digitais que impulsionam o crescimento da sua empresa
              </P>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="grande"
                  color="primary"
                  onClick={() => alert('Começar agora!')}
                >
                  🚀 Começar Agora
                </Button>

                <Button
                  size="grande"
                  variant="outline"
                  color="primary"
                  onClick={() => alert('Saber mais!')}
                >
                  📖 Saber Mais
                </Button>
              </div>
            </div>

            {/* Features com botões */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-4 p-4 border border-theme-border rounded-lg">
                <Title level="h4" color="accent">
                  💼 Consultoria
                </Title>
                <P size="pequeno" color="text-secondary">
                  Estratégias personalizadas para seu negócio
                </P>
                <Button
                  size="pequeno"
                  align="center"
                  color="accent"
                  variant="outline"
                  onClick={() => alert('Consultoria!')}
                >
                  Saiba Mais
                </Button>
              </div>

              <div className="text-center space-y-4 p-4 border border-theme-border rounded-lg">
                <Title level="h4" color="success">
                  🎯 Marketing
                </Title>
                <P size="pequeno" color="text-secondary">
                  Campanhas que geram resultados reais
                </P>
                <Button
                  size="pequeno"
                  align="center"
                  color="success"
                  variant="outline"
                  onClick={() => alert('Marketing!')}
                >
                  Ver Planos
                </Button>
              </div>

              <div className="text-center space-y-4 p-4 border border-theme-border rounded-lg">
                <Title level="h4" color="warning">
                  ⚡ Tecnologia
                </Title>
                <P size="pequeno" color="text-secondary">
                  Soluções tecnológicas de ponta
                </P>
                <Button
                  size="pequeno"
                  align="center"
                  color="warning"
                  variant="outline"
                  onClick={() => alert('Tecnologia!')}
                >
                  Conhecer
                </Button>
              </div>
            </div>

            {/* CTA Final */}
            <div className="text-center space-y-4 pt-8 border-t border-theme-border">
              <Title level="h3" color="primary">
                Pronto para começar?
              </Title>

              <P align="center" color="text-secondary">
                Entre em contato conosco hoje mesmo
              </P>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  color="success"
                  onClick={() => alert('WhatsApp!')}
                  className="min-w-32"
                >
                  📱 WhatsApp
                </Button>

                <Button
                  variant="outline"
                  color="primary"
                  onClick={() => alert('Email!')}
                  className="min-w-32"
                >
                  ✉️ Email
                </Button>

                <Button
                  variant="ghost"
                  color="text-secondary"
                  onClick={() => alert('Telefone!')}
                  className="min-w-32"
                >
                  📞 Telefone
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
