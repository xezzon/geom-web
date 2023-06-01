import { AuthProvider } from '@geom/components/AuthContext'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './router'

function App() {
  const router = createBrowserRouter(routes, {
    // eslint-disable-next-line no-underscore-dangle
    basename: window.__MICRO_APP_BASE_ROUTE__ ?? import.meta.env.GEOM_ADMIN_PATH,
  })

  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  )
}

export default App
