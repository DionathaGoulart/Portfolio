import React from 'react'

export const HomePage: React.FC = () => {
  return (
    <>
      <section className="theme-surface p-6 rounded-lg border theme-border mb-6">
        <h2 className="text-2xl font-semibold theme-text-primary">
          Bem-vindo à Home!
        </h2>
        <p className="theme-text-secondary">
          Esta é a primeira seção da sua página inicial.
        </p>
      </section>

      <section className="theme-surface p-6 rounded-lg border theme-border">
        <h2 className="text-2xl font-semibold theme-text-primary">
          Outra Seção Importante
        </h2>
        <p className="theme-text-secondary">
          Você pode adicionar quantas seções precisar aqui.
        </p>
      </section>
    </>
  )
}
