import { useState } from 'react'
import { Theme } from '@/shared'

const THEME_STORAGE_KEY = 'app-theme'

export function useThemeDetection(defaultTheme: Theme = 'light') {
  const [theme, setTheme] = useState<Theme>(() => {
    // 1. Verifica localStorage primeiro
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      return savedTheme
    }

    // 2. Detecção automática do tema do sistema
    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }

    // 3. Fallback para tema padrão
    return defaultTheme
  })

  const [isSystemTheme, setIsSystemTheme] = useState(() => {
    return !localStorage.getItem(THEME_STORAGE_KEY)
  })

  return {
    theme,
    setTheme,
    isSystemTheme,
    setIsSystemTheme,
    THEME_STORAGE_KEY
  }
}

// 📖 Exemplo de uso:
// function MyComponent() {
//   // Detecta tema automaticamente com fallback para 'light'
//   const {
//     theme,           // 'light' | 'dark' - tema atual
//     setTheme,        // função para alterar o tema
//     isSystemTheme,   // true se está seguindo o sistema
//     setIsSystemTheme // função para habilitar/desabilitar tema do sistema
//   } = useThemeDetection('light')
//
//   return (
//     <div>
//       <p>Tema atual: {theme}</p>
//       <button onClick={() => setTheme('dark')}>
//         {/* Muda para dark e desabilita tema automático */}
//         Mudar para Dark
//       </button>
//       <button onClick={() => setIsSystemTheme(true)}>
//         {/* Habilita detecção automática do sistema */}
//         Seguir Sistema
//       </button>
//     </div>
//   )
// }
