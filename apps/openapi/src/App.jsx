import { AuthProvider } from '@geom/components/AuthContext'
import GeomRouter from "@geom/components/GeomRouter"
import { MenuProvider } from "@geom/components/MenuContext"
import { Outlet } from 'react-router-dom'
import menus from '@/config/menu'
import { GroupProvider } from '@/components/GroupContext'
import Layout from '@/components/Layout'
import { adminClient } from './api'

function App() {
  const getMe = () => adminClient
    .getMe()
    .then(({ data }) => data)
  const getMenuTree = () => Promise.resolve(menus)

  return (
    <>
      <AuthProvider getMe={getMe}>
        <MenuProvider getMenuTree={getMenuTree}>
          <GeomRouter>
            <GroupProvider>
              <Layout>
                <Outlet />
              </Layout>
            </GroupProvider>
          </GeomRouter>
        </MenuProvider>
      </AuthProvider>
    </>
  )
}

export default App
