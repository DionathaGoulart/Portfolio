import { useEffect } from 'react'
import { Theme, ThemeColors } from '@features/Theme'

interface UseThemePersistenceProps {
  theme: Theme
  colors: ThemeColors
  isSystemTheme: boolean
  storageKey: string
}

export function useThemePersistence({
  theme,
  colors,
  isSystemTheme,
  storageKey
}: UseThemePersistenceProps) {
  useEffect(() => {
    // Salva no localStorage apenas se não for tema do sistema
    if (!isSystemTheme) {
      localStorage.setItem(storageKey, theme)
    } else {
      localStorage.removeItem(storageKey)
    }

    // Aplica classe CSS no documentElement
    document.documentElement.className = theme

    // Aplica variáveis CSS customizadas
    const root = document.documentElement
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value)
    })
  }, [theme, colors, isSystemTheme, storageKey])
}

// 📖 Exemplo de uso:
// function App() {
//   const theme = 'dark'
//   const colors = { background: '#1a1a1a', text: '#fff', /* ... */ }
//   const isSystemTheme = false
//
//   // Automaticamente:
//   // 1. Salva 'dark' no localStorage (key: 'my-theme')
//   // 2. Adiciona classe 'dark' no <html>
//   // 3. Cria CSS vars: --color-background: #1a1a1a, --color-text: #fff
//   useThemePersistence({
//     theme,
//     colors,
//     isSystemTheme,     // false = salva no storage
//     storageKey: 'my-theme'
//   })
//
//   // Agora você pode usar no CSS:
//   // .my-div { background: var(--color-background); color: var(--color-text); }
//   // Ou classes: <div className={theme}> (será 'dark')
//
//   return <div>Theme persisted!</div>
// }
