import { AuthProvider } from '@geom/components/AuthContext'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './router'
import { GroupProvider } from '@/components/GroupContext'

function App() {
  const router = createBrowserRouter(routes, {
    // eslint-disable-next-line no-underscore-dangle
    basename: window.__MICRO_APP_BASE_ROUTE__ ?? import.meta.env.GEOM_CONTEXT_PATH,
  })

  return (
    <>
      <AuthProvider>
        <GroupProvider>
          <RouterProvider router={router} />
        </GroupProvider>
      </AuthProvider>
    </>
  )
}

export default App
