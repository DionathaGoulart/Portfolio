import React from 'react'

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-96">
      <section
        id="home"
        className="theme-surface p-6 rounded-lg border theme-border mb-6 scroll-mt-20"
      >
        <h2 className="text-2xl font-semibold theme-text-primary">
          Bem-vindo à Home!
        </h2>
        <p className="theme-text-secondary">
          Esta é a primeira seção da sua página inicial. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Soluta delectus deserunt ea,
          possimus cupiditate quasi laudantium molestiae eligendi voluptatibus
          minima asperiores. Laudantium incidunt rem iusto iste facilis, hic
          facere cupiditate.
        </p>
      </section>

      <section
        id="about"
        className="theme-surface p-6 rounded-lg border theme-border mb-6"
      >
        <h2 className="text-2xl font-semibold theme-text-primary">Sobre nós</h2>
        <p className="theme-text-secondary">Esta é a seção sobre a empresa.</p>
      </section>

      <section
        id="projects"
        className="theme-surface p-6 rounded-lg border theme-border mb-6"
      >
        <h2 className="text-2xl font-semibold theme-text-primary">
          Nossos Projetos
        </h2>
        <p className="theme-text-secondary">
          Aqui estão alguns dos nossos trabalhos.
        </p>
      </section>

      <section
        id="contact"
        className="theme-surface p-6 rounded-lg border theme-border"
      >
        <h2 className="text-2xl font-semibold theme-text-primary">
          Entre em Contato
        </h2>
        <p className="theme-text-secondary">Envie-nos uma mensagem.</p>
      </section>
    </div>
  )
}
