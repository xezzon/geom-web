import { AuthProvider } from '@geom/components/AuthContext'
import { Outlet } from 'react-router-dom'
import { GeomRouter } from '@geom/components/GeomRouter'
import { RequireAuth } from '@geom/components/RequireAuth'
import Layout from './components/Layout'

function App() {
  const routes = [
    {
      path: '/sign-up',
      name: '注册',
      lazy: () => import('@/pages/sign-up'),
    },
    {
      path: '/sign-in',
      name: '登录',
      lazy: () => import('@/pages/sign-in'),
    },
  ]

  return (
    <>
      <AuthProvider>
        <GeomRouter staticRoutes={routes}>
          <RequireAuth>
            <Layout>
              <Outlet />
            </Layout>
          </RequireAuth>
        </GeomRouter>
      </AuthProvider>
    </>
  )
}

export default App
