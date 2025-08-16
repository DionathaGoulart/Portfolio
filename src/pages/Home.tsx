import { Card } from '@/shared/ui/Card'
import React from 'react'

const MyIcon = () => (
  <svg
    className="w-6 h-6 text-gray-500"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM5 9h10v2H5V9z" />
  </svg>
)

export const HomePage: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8 bg-gray-100 dark:bg-gray-900">
      <h1 className="col-span-full text-3xl font-bold mb-4 text-center theme-text-primary">
        Exemplos do Componente Card
      </h1>

      {/* Exemplo de Card com Layout "horizontal" */}
      <div className="col-span-full">
        <h2 className="text-xl font-semibold mb-2 theme-text-primary">
          Layout Horizontal
        </h2>
      </div>
      <Card
        layout="horizontal"
        title="Cartão Horizontal Pequeno"
        subtitle="Ideal para dashboards compactos."
        size="pequeno"
      />
      <Card
        layout="horizontal"
        title="Cartão Médio"
        subtitle="O layout padrão do card."
        align="center"
      />
      <Card
        layout="horizontal"
        title="Cartão Grande"
        subtitle="Use para um impacto visual maior."
        size="grande"
        align="end"
        onClick={() => alert('Card grande clicado!')}
      />

      {/* Exemplo de Card com Layout "with-icon" */}
      <div className="col-span-full mt-8">
        <h2 className="text-xl font-semibold mb-2 theme-text-primary">
          Layout com Ícone
        </h2>
      </div>
      <Card
        layout="with-icon"
        title="Configurações"
        subtitle="Acesse as configurações do seu perfil."
        icon={<MyIcon />}
      />
      <Card
        layout="with-icon"
        title="Notificações"
        subtitle="Verifique suas mensagens e alertas."
        icon={<MyIcon />}
      />
      <Card
        layout="with-icon"
        title="Ajuda"
        subtitle="Encontre suporte e respostas para suas perguntas."
        icon={<MyIcon />}
        onClick={() => alert('Ajuda clicado!')}
      />

      {/* Exemplo de Card com Layout "varied" */}
      <div className="col-span-full mt-8">
        <h2 className="text-xl font-semibold mb-2 theme-text-primary">
          Layout Variável
        </h2>
      </div>
      <Card
        layout="varied"
        title="Última Atualização"
        subtitle="Novos recursos e melhorias no sistema."
        date="16/08/2025"
        description="A nossa plataforma foi atualizada com melhorias de desempenho e novas funcionalidades de IA para otimizar seu trabalho."
        tags={['Atualização', 'Recursos', 'AI']}
      />
    </div>
  )
}
