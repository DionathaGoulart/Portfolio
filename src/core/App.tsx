import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router'
import { appRoutes } from '@/core/router/routes'

function App() {
  return (
    <BrowserRouter>
      <AppRouter routes={appRoutes} />
    </BrowserRouter>
  )
}

export default App
