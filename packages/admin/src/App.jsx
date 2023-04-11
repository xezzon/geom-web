import { AuthProvider } from '@/context/AuthContext'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './router'

function App() {
  const router = createBrowserRouter(routes, {
    basename: window.__MICRO_APP_BASE_ROUTE__ ?? import.meta.env.GEOM_BASE_URL,
  })

  return <>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </>
}

export default App
