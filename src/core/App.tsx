import { useTheme } from '@/shared/contexts/ThemeContext'

function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="theme-container min-h-screen p-8">
      <header className="theme-surface p-6 rounded-lg border theme-border mb-8">
        <h1 className="text-3xl font-bold theme-text-primary mb-4">
          Meu Site React
        </h1>

        <button
          onClick={toggleTheme}
          className="bg-theme-primary text-white px-4 py-2 rounded hover:opacity-90 transition-all"
        >
          Tema atual: {theme} - Clique para trocar
        </button>
      </header>

      <main className="space-y-6">
        <section className="theme-surface p-6 rounded-lg border theme-border">
          <h2 className="text-xl font-semibold theme-text-primary mb-3">
            Seção Principal
          </h2>
          <p className="theme-text-secondary">
            Este é um exemplo de como usar o ThemeProvider com Tailwind CSS.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-theme-accent text-white p-4 rounded">
            <h3 className="font-semibold mb-2">Accent Color</h3>
            <p>Exemplo com cor de destaque</p>
          </div>

          <div className="bg-theme-success text-white p-4 rounded">
            <h3 className="font-semibold mb-2">Success</h3>
            <p>Mensagem de sucesso</p>
          </div>

          <div className="bg-theme-error text-white p-4 rounded">
            <h3 className="font-semibold mb-2">Error</h3>
            <p>Mensagem de erro</p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
