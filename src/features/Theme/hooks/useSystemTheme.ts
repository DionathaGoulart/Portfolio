import { useEffect } from 'react'
import { Theme } from '@features/Theme'

interface UseSystemThemeProps {
  isSystemTheme: boolean
  setTheme: (theme: Theme) => void
}

export function useSystemTheme({
  isSystemTheme,
  setTheme
}: UseSystemThemeProps) {
  useEffect(() => {
    if (!isSystemTheme) return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [isSystemTheme, setTheme])
}

// 📖 Exemplo de uso:
// function ThemeListener() {
//   const [theme, setTheme] = useState<Theme>('light')
//   const [isSystemTheme, setIsSystemTheme] = useState(true)
//
//   // Escuta mudanças automáticas do sistema operacional
//   useSystemTheme({
//     isSystemTheme,  // só escuta se estiver habilitado
//     setTheme        // função chamada quando sistema muda
//   })
//
//   // Quando usuário muda tema do SO de light para dark,
//   // o hook automaticamente chama setTheme('dark')
//
//   return (
//     <div>
//       <p>Tema: {theme}</p>
//       <p>Seguindo sistema: {isSystemTheme ? 'Sim' : 'Não'}</p>
//       {/* Mude o tema do seu sistema operacional e veja a magia acontecer! */}
//     </div>
//   )
// }
