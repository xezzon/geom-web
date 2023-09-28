import { AuthProvider, RequireAuth } from '@geom/components/AuthContext'
import GeomRouter from '@geom/components/GeomRouter'
import { MenuProvider } from '@geom/components/MenuContext'
import { Outlet } from 'react-router-dom'
import { adminClient } from './api'
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

  const getMe = () => adminClient
    .getMe()
    .then(({ data }) => data)
  const getMenuTree = () => adminClient
    .menuTree()
    .then(({ data }) => data)

  return (
    <>
      <AuthProvider getMe={getMe}>
        <MenuProvider getMenuTree={getMenuTree}>
          <GeomRouter staticRoutes={routes}>
            <RequireAuth>
              <Layout>
                <Outlet />
              </Layout>
            </RequireAuth>
          </GeomRouter>
        </MenuProvider>
      </AuthProvider>
    </>
  )
}

export default App
